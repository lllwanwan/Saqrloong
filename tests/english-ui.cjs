/* English interface regression. All configured model requests are intercepted. */
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:4186';
const routes=['overview','catalog','sourcing','procurement','buyer-agent','seller-agent','guide-agent','warehouse','orders','sales-orders','revenue','messages','profile','settings','login','register'];
let checks=0;
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/snap/bin/chromium',args:['--no-sandbox']});
  try{
    const page=await browser.newPage(),errors=[],calls=[];
    let releaseResponse,held=false,failNext=false;
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/config.json',route=>route.fulfill({json:{api_configs:{gpt:{api_key:'test-only',base_url:`${base}/test-model`,model:['test-model']}}}}));
    await page.route('**/test-model/chat/completions',async route=>{
      const body=route.request().postDataJSON(),system=body.messages[0].content;
      calls.push({system,body});
      if(held)await new Promise(resolve=>{releaseResponse=resolve;});
      if(failNext){failNext=false;return route.fulfill({status:503,body:'Unavailable'});}
      const language=/Write all human-readable output in English/.test(system)?'EN':/所有面向用户/.test(system)?'ZH':'SA';
      const text=language==='ZH'?'这是中文分析结果':language==='SA'?'هذا تحليل باللغة العربية':'English analysis based on workspace records.';
      await route.fulfill({json:{choices:[{message:{content:JSON.stringify({markdown:`## ${language==='EN'?'Analysis':language==='ZH'?'分析':'التحليل'}\n\n${text}`,conversation_title:language==='EN'?'Workspace review':language==='ZH'?'工作区分析':'مراجعة مساحة العمل',links:[],translation:text,upload_draft:{name:'Private Knowledge Assistant',summary:'An Arabic and English knowledge assistant.'}})}}]}});
    });
    await page.goto(base);await page.waitForFunction(()=>SaqrAgents.config.apiKey==='test-only');
    const go=async route=>page.evaluate(route=>navigate(route),route);
    const login=async email=>{await go('login');await page.fill('#authEmail',email);await page.fill('#authPassword','111111');await page.click('#authForm button[type="submit"]');await page.waitForSelector('.home-guide');};
    const scan=async label=>{
      const found=await page.evaluate(()=>{
        const foreign=/[\p{Script=Han}\p{Script=Arabic}]/u,found=[];
        const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
        while(walker.nextNode()){
          const node=walker.currentNode,parent=node.parentElement;
          // Enterprise text and conversation history retain their original language.
          if(!parent||parent.closest('script,style,[data-no-translate],.chat-bubble,.chat-original,.agent-bubble-body,.agent-history-title,.agent-history-preview,.markdown-body')||!parent.getClientRects().length)continue;
          if(foreign.test(node.textContent))found.push(node.textContent.trim());
        }
        document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(node=>{
          if(node.closest('[data-no-translate]'))return;
          for(const attr of ['placeholder','aria-label','title'])if(foreign.test(node.getAttribute(attr)||''))found.push(`${attr}: ${node.getAttribute(attr)}`);
        });return found;
      });
      assert.deepEqual(found,[],label);assert.equal(await page.getAttribute('html','lang'),'en',label);checks++;
    };
    for(const account of ['buyer@almanar.sa','seller@nura.sa']){
      await login(account);
      for(const route of routes){
        await go(route);await scan(`${account}: ${route}`);
        for(const language of ['ZH','SA']){await page.click(`[data-lang="${language}"]`);await page.click('[data-lang="EN"]');await scan(`${route}: ${language} to EN`);}
      }
    }
    await login('buyer@almanar.sa');await go('catalog');
    const ids=await page.evaluate(()=>db.products.map(product=>product.id));
    for(const id of ids){
      await page.evaluate(id=>{state.productModal=id;render();},id);await scan(`product ${id}`);await page.click('[data-action="close-product"]');
      await page.click('[data-lang="ZH"]');await page.click('[data-lang="EN"]');await page.evaluate(id=>{state.productModal=id;render();},id);await scan(`product roundtrip ${id}`);await page.click('[data-action="close-product"]');
    }
    await page.fill('#catalogSearch','NoMatchingProduct123');await scan('empty catalog');
    await go('overview');await page.click('[data-action="publish-product"]');await scan('publish modal');
    await page.setInputFiles('#publishDocument',{name:'brief.txt',mimeType:'text/plain',buffer:Buffer.from('Product name: Private Knowledge Assistant\nSummary: An Arabic and English knowledge assistant.')});
    await page.waitForSelector('.upload-status.success');await scan('uploaded draft');await page.click('[data-action="close-publish"]');
    for(const route of ['buyer-agent','seller-agent','guide-agent']){
      await go(route);await page.click('[data-action="new-agent-chat"]');held=true;releaseResponse=undefined;
      await page.fill('#workspaceAgentInput','Help with my workspace');await page.locator('#workspaceAgentForm').evaluate(form=>form.requestSubmit());await page.waitForSelector('#workspaceAgentLoading');await scan(`${route} loading`);
      await page.waitForFunction(()=>document.querySelector('#workspaceAgentLoading')!==null);
      const deadline=Date.now()+5000;while(!releaseResponse&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,10));assert.ok(releaseResponse,'Mock model request arrived');held=false;releaseResponse();
      await page.waitForSelector('#workspaceAgentMessages .markdown-body');await scan(`${route} result`);
    }
    // Procurement has no independent requirement forms or comparison reports.
    for(const legacy of ['requests','compare','evaluations']){await go(legacy);assert.equal(await page.evaluate(()=>state.screen),'buyer-agent');await scan(`legacy ${legacy}`);}
    await go('catalog');await page.fill('#catalogSearch','Nura');await page.locator('[data-product="prd-nura-knowledge"]').first().click();await page.click('[data-action="place-order"]');
    await page.waitForSelector('#checkoutForm');await scan('checkout');
    await page.locator('#checkoutForm').evaluate(form=>form.requestSubmit());await page.waitForSelector('#paymentForm');await scan('payment selection');
    await page.check('input[name="paymentMethod"][value="paypal"]');await page.locator('#paymentForm').evaluate(form=>form.requestSubmit());
    await page.waitForSelector('[data-payment-state="processing"]');await scan('payment processing');
    await page.waitForSelector('[data-payment-state="success"]');await scan('payment success');
    await page.click('[data-action="view-paid-order"]');await page.waitForSelector('.order-table');await scan('purchase created');
    await go('revenue');await scan('data analytics');await go('messages');await scan('automatic message translation');assert.equal(await page.locator('.translate-message').count(),0);checks++;
    // In-flight responses stay in their original history and cannot alter the current-language UI.
    for(const route of ['buyer-agent','seller-agent','guide-agent']){
      await go(route);await page.click('[data-lang="ZH"]');await page.click('[data-action="new-agent-chat"]');held=true;releaseResponse=undefined;
      await page.fill('#workspaceAgentInput','请分析当前数据');await page.locator('#workspaceAgentForm').evaluate(form=>form.requestSubmit());
      const deadline=Date.now()+5000;while(!releaseResponse&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,10));assert.ok(releaseResponse);await page.click('[data-lang="EN"]');held=false;releaseResponse();
      await page.waitForSelector('#workspaceAgentMessages .markdown-body');await scan(`${route} language changed during reply`);
    }
    await go('seller-agent');await page.click('[data-action="new-agent-chat"]');failNext=true;await page.fill('#workspaceAgentInput','Review my sales orders');await page.locator('#workspaceAgentForm').evaluate(form=>form.requestSubmit());await page.waitForSelector('.agent-tool-trace');await scan('model unavailable fallback');
    assert.deepEqual(errors,[],'No browser exceptions');
    console.log(`PASS: ${checks} English interface checks; ${routes.length} routes, both accounts, ${ids.length} product dialogs, language switches and asynchronous replies. ${calls.length} intercepted model requests; no paid API calls.`);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
