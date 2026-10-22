/* Functional UI regression. All model requests are intercepted or disabled. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const JSZip = require('jszip');
const base = process.env.BASE_URL || 'http://127.0.0.1:4186';
const project = path.resolve(__dirname, '..');
let checks = 0;
const check = (condition, label) => { assert.ok(condition, label); checks++; };
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH || '/snap/bin/chromium',args:['--no-sandbox']});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}}), errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/config.json',route=>route.fulfill({json:{api_configs:{gpt:{api_key:'',base_url:'',model:['local']}}}}));
    await page.goto(base);
    const login=async(email)=>{await page.evaluate(()=>navigate('login'));await page.fill('#authEmail',email);await page.fill('#authPassword','111111');await page.click('#authForm button[type="submit"]');await page.waitForSelector('.home-guide');};
    const go=async(route)=>page.evaluate(route=>navigate(route),route);
    await login('buyer@almanar.sa');
    check(await page.locator('.workspace-select').count()===0,'Sidebar duplicate brand removed');
    check((await page.getAttribute('.brand-logo','src'))==='logo.png','Full marketplace logo retained');
    await go('orders'); check(await page.locator('[data-order-id]').count()===5,'Buyer sees own purchase orders');
    await go('sales-orders'); check(await page.locator('[data-order-id]').count()===0,'Buyer has no unrelated sales');
    for(const language of ['EN','ZH','SA']){
      await page.click(`[data-lang="${language}"]`);
      for(const route of ['overview','buyer-agent','seller-agent','catalog','orders','sales-orders','warehouse','revenue']){
        await go(route);
        check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${language} ${route} no page overflow`);
      }
      const nav=await page.locator('.nav-icon').evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().width));
      check(nav.every(width=>width===20),`${language} fixed icon widths`);
      await go('buyer-agent');
      const greeting=await page.locator('.agent-bubble').first().boundingBox(), prompt=await page.locator('.agent-empty-prompts').boundingBox();
      check(greeting.y+greeting.height<=prompt.y,`${language} greeting and prompts do not overlap`);
    }
    await page.click('[data-lang="ZH"]');await go('buyer-agent');
    await page.fill('#workspaceAgentInput','哪些购买订单需要跟进？');await page.click('#workspaceAgentForm button');
    await page.waitForSelector('.agent-tool-trace');
    check((await page.locator('.agent-conversation').innerText()).includes('ORD-002'),'Agent uses scoped order records');
    await page.locator('[data-record-type="order"][data-record-id="ORD-002"]').click();
    check(await page.locator('[data-order-id="ORD-002"].focused-order').count()===1,'Order link opens and highlights record');
    await go('buyer-agent'); check(await page.locator('.agent-bubble.user').count()===1,'Conversation preserved across navigation');
    await page.click('[data-action="new-agent-chat"]');check(await page.locator('.agent-bubble.user').count()===0,'New conversation clears only current thread');
    await page.fill('#workspaceAgentInput','你好');await page.click('#workspaceAgentForm button');await page.waitForSelector('.agent-tool-trace');
    check(await page.locator('.agent-link').count()===0,'Greeting does not force unrelated links');
    await login('seller@nura.sa');await go('sales-orders');check(await page.locator('[data-order-id]').count()===2,'Seller sees own two sales orders');
    await go('orders');check(await page.locator('[data-order-id]').count()===0,'Sales excluded from purchases');
    await go('revenue');check(await page.locator('#sellerAgentForm').count()===0,'Analytics has data only');
    check((await page.locator('.seller-metrics').innerText()).includes('3,200'),'Analytics sums actual seller orders');
    await go('catalog');await page.locator('[data-product="prd-nura-knowledge"]').first().click();
    check(await page.locator('.product-info-section').count()===15,'Detailed product information rendered');
    check((await page.locator('.product-introduction').innerText()).length>500,'Detailed introduction rendered');
    await page.click('[data-action="close-product"]');await page.click('[data-action="publish-product"]');
    const left=await page.locator('.publish-fields').boundingBox(),right=await page.locator('.publish-upload').boundingBox();
    check(left.x+left.width<right.x,'Form left and upload right');
    check((await page.getAttribute('.demo-brief-link','href'))==='DEMO_PRODUCT_BRIEF.md','Demo brief available');
    await page.setInputFiles('#publishDocument',path.join(project,'DEMO_PRODUCT_BRIEF.md'));await page.waitForSelector('.upload-status.success');
    check(await page.inputValue('#publishMonthly')==='1290','Upload extracts monthly price');
    check(await page.inputValue('#publishSetup')==='590','Upload extracts setup price');
    check(await page.inputValue('#publishUsers')==='60','Upload extracts users');
    check((await page.inputValue('#publishDescription')).length>1000,'Upload extracts detailed introduction');
    await page.fill('#publishName','Demo edited listing');await page.locator('#publishForm button[type="submit"]').click();
    await page.waitForSelector('.product-card');
    const product=await page.evaluate(()=>db.products.find(product=>product.name==='Demo edited listing'));
    check(product?.companyId==='co-nura'&&product.monthly===1290,'Published listing belongs to current seller company');
    check(product.languages.length===3&&product.deployment.length===2&&product.capabilities.length===5,'Published structured arrays preserved');
    await go('warehouse');check((await page.locator('.seller-product-grid').innerText()).includes('Demo edited listing'),'Published product available in warehouse');
    await page.click('[data-action="publish-product"]');
    await page.locator('#publishDropzone').dispatchEvent('drop',{dataTransfer:await page.evaluateHandle(()=>{const transfer=new DataTransfer();transfer.items.add(new File(['Product name: Dropped demo\nSummary: A documented product\nMonthly price: USD 0\nSetup price: USD 0'],'drop.txt',{type:'text/plain'}));return transfer;})});
    await page.waitForSelector('.upload-status.success');check(await page.inputValue('#publishName')==='Dropped demo','Drag-and-drop extraction works');check(await page.inputValue('#publishMonthly')==='0','Known zero price preserved');
    await page.fill('#publishSupport','Manually reviewed support');
    await page.setInputFiles('#publishDocument',{name:'replacement.txt',mimeType:'text/plain',buffer:Buffer.from('Product name: Replacement demo\nSummary: A replacement brief with no prices')});
    await page.waitForSelector('.upload-status.success');
    check(await page.inputValue('#publishMonthly')===''&&await page.inputValue('#publishSetup')==='','Replacement file clears unchanged facts from the previous file');
    check(await page.inputValue('#publishSupport')==='Manually reviewed support','Replacement file preserves manual edits for unspecified fields');
    await page.click('[data-action="close-publish"]');
    const documentPage=await browser.newPage();await documentPage.setContent('<h1>Product name: PDF demo</h1><p>Summary: A text PDF brief</p><p>Monthly price: 1234</p>');const pdf=await documentPage.pdf();await documentPage.close();
    await page.click('[data-action="publish-product"]');await page.setInputFiles('#publishDocument',{name:'demo.pdf',mimeType:'application/pdf',buffer:pdf});await page.waitForSelector('.upload-status.success');check(await page.inputValue('#publishName')==='PDF demo','PDF content extracted as text');await page.click('[data-action="close-publish"]');
    const zip=new JSZip();zip.file('[Content_Types].xml','<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');zip.file('_rels/.rels','<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');zip.file('word/document.xml','<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Product name: Word demo</w:t></w:r></w:p><w:p><w:r><w:t>Monthly price: USD 0</w:t></w:r></w:p><w:p><w:r><w:t>Summary: A Word product document</w:t></w:r></w:p></w:body></w:document>');const docx=await zip.generateAsync({type:'nodebuffer'});
    await page.click('[data-action="publish-product"]');await page.setInputFiles('#publishDocument',{name:'demo.docx',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',buffer:docx});await page.waitForSelector('.upload-status.success');check(await page.inputValue('#publishName')==='Word demo','Word DOCX content extracted');check(await page.inputValue('#publishMonthly')==='0'&&await page.inputValue('#publishSetup')==='','Known zero and unknown empty prices preserved');await page.click('[data-action="close-publish"]');
    const safe=await page.evaluate(()=>renderMarkdown('## Test\n\n| Product | Price |\n|---|---|\n| A | 123 |\n\n<script>window.xss=true</script>\n\n[bad](javascript:alert(1))'));
    check(safe.includes('<table>')&&!safe.includes('<script>')&&!safe.includes('javascript:'),'Markdown tables render and scripts are sanitized');
    await page.route('**/mock-model',async route=>{const body=route.request().postDataJSON();const tool=body.messages.findLast(message=>message.role==='tool');if(!tool)return route.fulfill({json:{choices:[{message:{role:'assistant',content:null,tool_calls:[{id:'call_orders',type:'function',function:{name:'get_orders',arguments:'{}'}}]}}]}});const orders=JSON.parse(tool.content);check(orders.every(order=>['ORD-001','ORD-002'].includes(order.id)),'Tool result scoped to seller');return route.fulfill({json:{choices:[{message:{role:'assistant',content:JSON.stringify({markdown:'## Sales review\n\n| Order | Value |\n|---|---|\n| [ORD-002](#order/ORD-002) | 4600 |',links:[{type:'order',id:'ORD-002'},{type:'order',id:'ORD-005'}]})}}]}});});
    await page.evaluate(base=>{SaqrAgents.config.apiKey='test-only';SaqrAgents.config.endpoint=`${base}/mock-model`;},base);await go('seller-agent');await page.fill('#workspaceAgentInput','Review my sales orders');await page.click('#workspaceAgentForm button');await page.waitForSelector('.agent-bubble table');check(await page.locator('[data-record-id="ORD-002"]').count()===1&&await page.locator('[data-record-id="ORD-005"]').count()===0,'Model reply exposes only accessible record links');
    await page.screenshot({path:'/tmp/saqrloong-agent-final.png',fullPage:true});
    for(const language of ['EN','ZH','SA']){
      await page.setViewportSize({width:390,height:844});await page.click(`[data-lang="${language}"]`);
      for(const route of ['overview','buyer-agent','seller-agent','revenue']){
        await go(route);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${language} mobile ${route} no overflow`);
        if(route.endsWith('-agent'))check(await page.locator('.agent-composer').evaluate(node=>node.getBoundingClientRect().bottom<=innerHeight),`${language} mobile ${route} composer visible`);
      }
      await go('catalog');await page.click('[data-action="publish-product"]');check(await page.locator('.publish-modal').evaluate(el=>el.scrollWidth<=el.clientWidth+1),`${language} mobile publish no overflow`);await page.screenshot({path:`/tmp/saqrloong-mobile-${language}.png`});await page.click('[data-action="close-publish"]');
    }
    await page.setViewportSize({width:1440,height:1000});await page.click('[data-lang="EN"]');await login('buyer@almanar.sa');
    await page.evaluate(()=>{SaqrAgents.config.apiKey='';});
    await go('catalog');await page.click('[data-action="publish-product"]');await page.setInputFiles('#publishDocument',path.join(project,'DEMO_PRODUCT_BRIEF.md'));await page.waitForSelector('.upload-status.success');
    await page.fill('#publishName','Buyer-owned demo');await page.locator('#publishForm button[type="submit"]').click();
    check(await page.evaluate(()=>db.products.find(p=>p.name==='Buyer-owned demo')?.publisherUserId===state.user.id),'Buyer publication records its owner');
    await go('warehouse');check((await page.locator('.seller-product-grid').innerText()).includes('Buyer-owned demo'),'Buyer publisher sees its own warehouse');
    await go('seller-agent');await page.fill('#workspaceAgentInput','Analyze my product warehouse');await page.click('#workspaceAgentForm button');await page.waitForSelector('.agent-tool-trace');
    check((await page.locator('.agent-conversation').innerText()).includes('Buyer-owned demo'),'Buyer publisher Agent reads its own warehouse');
    assert.deepEqual(errors,[],'No browser exceptions');console.log(`PASS: ${checks} workspace UI checks; live requests disabled/intercepted.`);
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
