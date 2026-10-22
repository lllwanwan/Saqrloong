/* Run with: node tests/agents-scope.cjs
 * Uses Node built-ins and isolated browser mocks. No real configuration, API or npm packages.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const agentSource = fs.readFileSync(path.join(__dirname, '..', 'agents.js'), 'utf8');
const dataSource = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
let checks = 0;
const equal = (actual, expected, label) => { assert.equal(actual, expected, label); checks++; };
const ok = (condition, label) => { assert.ok(condition, label); checks++; };
const same = (actual, expected, label) => { assert.deepEqual(actual, expected, label); checks++; };

function browser({ saved = {}, explicit = {}, file = {}, beforeConfigResponse, modelHandler } = {}) {
  const requests = [];
  const context = {
    window: { SAQRLOONG_CONFIG: explicit },
    localStorage: { getItem: key => key === 'saqrloong-agent-config' ? JSON.stringify(saved) : null },
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (url !== 'config.json') {
        if (modelHandler) return modelHandler(JSON.parse(options.body), requests);
        throw new Error('Unexpected network request blocked by the test harness');
      }
      if (beforeConfigResponse) await beforeConfigResponse();
      return { ok: true, json: async () => file };
    },
    setTimeout,
    clearTimeout,
    AbortController
  };
  vm.createContext(context);
  vm.runInContext(dataSource, context, { filename: 'data.js' });
  vm.runInContext(agentSource, context, { filename: 'agents.js' });
  return { agents: context.window.SaqrAgents, orderText:context.window.SaqrDB.orderText, requests };
}

function memoryStorage(initial = {}) {
  const items = new Map(Object.entries(initial));
  return { getItem:key => items.get(key) ?? null, setItem:(key,value) => items.set(key,String(value)), removeItem:key => items.delete(key) };
}

function historyBrowser({ local = memoryStorage(), session = memoryStorage(), user = { id:'history-user' }, language = 'EN', modelHandler } = {}) {
  const context = {
    window:{},localStorage:local,sessionStorage:session,state:{user,lang:language},
    fetch:async url=>{if(url!=='config.json')throw new Error('Network blocked');return {ok:false};},
    setTimeout,clearTimeout,AbortController,
    document:{addEventListener:()=>{}},
    esc:value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])),
    renderMarkdown:value=>`<div class="markdown-body">${String(value)}</div>`,
    agentMarkdown:result=>result.markdown,
    SaqrDB:{load:()=>({users:[],companies:[],products:[],orders:[]})}
  };
  vm.createContext(context);vm.runInContext(agentSource,context,{filename:'agents.js'});
  context.SaqrAgents={...context.window.SaqrAgents,...(modelHandler?{runWorkspaceAgent:modelHandler}:{})};
  const view={dataset:{agentRole:'buyer',agentSession:''}},input={value:''},box={getAttribute:()=> 'false'};
  context.$=selector=>selector==='.agent-workspace'?view:selector==='#workspaceAgentInput'?input:selector==='#workspaceAgentMessages'?box:null;
  context.$$=()=>[];
  let renders=0;
  context.render=()=>{renders++;const store=context.workspaceSessions(view.dataset.agentRole);view.dataset.agentSession=store.activeId;};
  const workflowSource=fs.readFileSync(path.join(__dirname,'..','workflow-ui.js'),'utf8');
  vm.runInContext(workflowSource+'\nglobalThis.__historyTest={workspacePendingRequests};',context,{filename:'workflow-ui.js'});
  return {context,local,session,view,input,get renders(){return renders;}};
}

function records() {
  const account = { id: 'buyer-publisher', role: 'buyer', companyId: 'co-owned', name: 'New Publisher', email: 'private-publisher@example.invalid', password: 'private-test-password' };
  return {
    account,
    db: {
      users: [account, { id: 'seller-peer', role: 'seller', companyId: 'co-owned', name: 'Company Peer', email: 'private-peer@example.invalid', password: 'private-peer-password' }, { id: 'default-buyer', role: 'buyer' }, { id: 'foreign-seller', role: 'seller', companyId: 'co-foreign', name: 'Other Seller', email: 'private-foreign@example.invalid', password: 'private-foreign-password' }],
      companies: [{ id: 'co-owned', name: 'Owned Company' }, { id: 'co-foreign', name: 'Other Company' }],
      products: [
        { id: 'owned-product', companyId: 'co-owned', publisherUserId: account.id, name: 'Owned Product', summary: 'A published product belonging to this account.', monthly: 100, setup: 0, languages: ['Arabic'], deployment: ['Buyer VPC'], capabilities: ['Citations'], evidence: 90 },
        { id: 'foreign-product', companyId: 'co-foreign', name: 'Foreign Product', summary: 'A public competitor listing.', monthly: 200, languages: ['English'], deployment: ['Global SaaS'] }
      ],
      orders: [
        { id: 'OWN-SALE', sellerUserId: account.id, buyerUserId: 'external-buyer', productId: 'owned-product', status: 'In delivery', nextStep: 'Confirm approved sample documents', total: 100, monthly: 100, currency: 'USD' },
        { id: 'PEER-SALE', sellerUserId: 'seller-peer', buyerUserId: 'external-buyer', productId: 'owned-product', status: 'Awaiting renewal', nextStep: 'Review monthly usage', total: 200, monthly: 100, currency: 'USD' },
        { id: 'FOREIGN-SALE', sellerUserId: 'foreign-seller', buyerUserId: 'external-buyer', productId: 'foreign-product', status: 'In delivery', total: 999, monthly: 200, currency: 'USD' },
        { id: 'PERSONAL-PURCHASE', sellerUserId: 'foreign-seller', buyerUserId: account.id, productId: 'foreign-product', status: 'In delivery', total: 250, monthly: 200, currency: 'USD' }
      ]
    }
  };
}

async function checkPublisherScope() {
  const { agents, requests } = browser();
  const { db, account } = records();
  const tools = agents.sellerTools(db, account);
  equal(account.role, 'buyer', 'Publishing need not change the account role');
  same(Array.from(tools.inspect_inventory(), p => p.id), ['owned-product'], 'Buyer publisher sees its assigned-company warehouse');
  same(Array.from(tools.get_recent_orders(), o => o.id).sort(), ['OWN-SALE', 'PEER-SALE'], 'Sales scope includes own and same-company peer orders only');
  equal(tools.calculate_revenue().gross_total_usd, 300, 'Metrics include scoped sales only');

  const result = await agents.runWorkspaceAgent({ db, user: account, role: 'seller', question: '查看我的仓库和销售订单，分析营收', language: 'ZH' });
  equal(result.provider, 'local', 'Offline verification uses the local agent');
  ok(result.markdown.includes('Owned Product'), 'Owned product is available to the seller agent');
  ok(result.markdown.includes('OWN-SALE') && result.markdown.includes('PEER-SALE'), 'Seller analysis includes both accessible orders');
  ok(!JSON.stringify(result).includes('FOREIGN-SALE'), 'Seller output excludes other-company orders');
  ok(!JSON.stringify(result).includes('PERSONAL-PURCHASE'), 'Seller scope excludes the account purchase-only order');
  same(Array.from(result.links.filter(link => link.type === 'order'), link => link.id).sort(), ['OWN-SALE', 'PEER-SALE'], 'Order navigation stays within the sales scope');
  ok(result.tool_trace.some(tool => tool.name === 'inspect_inventory'), 'Warehouse retrieval is recorded in the tool trace');
  for (const user of db.users) {
    for (const key of ['email', 'password']) {
      if (user[key]) ok(!JSON.stringify(result).includes(user[key]), `Private ${key} is not exposed in the agent result`);
    }
  }

  const purchase = await agents.runWorkspaceAgent({ db, user: account, role: 'buyer', question: '查看我的购买订单', language: 'ZH' });
  same(Array.from(purchase.links.filter(link => link.type === 'order'), link => link.id), ['PERSONAL-PURCHASE'], 'Procurement scope remains the current account purchase orders');
  ok(!purchase.markdown.includes('OWN-SALE') && !purchase.markdown.includes('PEER-SALE'), 'Company ownership does not add sales orders to the purchase scope');

  const defaultTools = agents.sellerTools(db, db.users.find(user => user.id === 'default-buyer'));
  equal(defaultTools.inspect_inventory().length, 0, 'Default buyer has no synthetic seller inventory');
  equal(defaultTools.get_recent_orders().length, 0, 'Default buyer has no synthetic seller orders');
  const anonymous = agents.sellerTools(db, { id: 'not-in-database', companyId: 'co-owned' });
  equal(anonymous.inspect_inventory().length, 0, 'Unrecognized accounts cannot claim a company warehouse');
  equal(anonymous.get_recent_orders().length, 0, 'Unrecognized accounts cannot claim company orders');
  const spoofed = agents.sellerTools(db, { ...account, companyId: 'co-foreign' });
  same(Array.from(spoofed.inspect_inventory(), p => p.id), ['owned-product'], 'Company scope comes from the stored account rather than caller-supplied companyId');
  ok(requests.every(request => request.url === 'config.json'), 'No model or external API requests occur');
}

async function checkJsonDescription() {
  const { agents, requests } = browser();
  const description = '## Detailed introduction\n\nExplicit source description with deployment details and limits.';
  const result = await agents.runProduct({ documentText: JSON.stringify({ name: 'JSON Product', description, currency: 'USD', monthly: 100, setup: 0, users: 25 }), fileName: 'product.json', language: 'EN' });
  equal(result.upload_draft.description, description, 'Explicit JSON.description is preserved verbatim');
  equal(result.upload_draft.name, 'JSON Product', 'JSON product name is extracted');
  equal(result.upload_draft.monthly, 100, 'JSON USD monthly price is extracted');
  equal(result.upload_draft.setup, 0, 'Zero setup fee remains zero');
  equal(result.upload_draft.users, 25, 'JSON user count is extracted');
  equal(result.upload_draft.contactEmail, null, 'Missing contact information remains unknown');
  ok(requests.every(request => request.url === 'config.json'), 'Document extraction does not call a real API');
}

async function checkUsdDocumentGrounding() {
  const {agents}=browser();
  const extract=async text=>(await agents.extractProduct({documentText:text})).upload_draft;
  for (const currency of ['USD','US$','$','美元','دولار أمريكي']) {
    const draft=await extract(`Product name: Currency example\nMonthly price: ${currency} 1,290\nSetup fee: ${currency} 0`);
    equal(draft.monthly,1290,`${currency} monthly amount is accepted as USD`);
    equal(draft.setup,0,`${currency} zero setup amount is preserved`);
  }
  for (const currency of ['SAR','EUR','CNY','RMB','AED','GBP','CAD','AUD','NZD','SGD','HKD','JPY','ريال','里亚尔','欧元','人民币','درهم']) {
    const draft=await extract(`Currency: USD\nMonthly price: ${currency} 4800\nSetup fee: ${currency} 0`);
    equal(draft.monthly,null,`${currency} is not relabeled or converted to USD`);
    equal(draft.setup,null,`${currency} zero remains unknown in a USD form`);
  }
  const table=await extract('| Currency | USD |\n| Monthly fee | ١٬٢٩٠ |\n| Setup fee | ٥٩٠ |');
  equal(table.monthly,1290,'Markdown table USD amounts support Arabic numerals');
  equal(table.setup,590,'Table-level currency applies to numeric setup field');
  const missing=await extract('Monthly price: 1290\nSetup fee: 590');
  equal(missing.monthly,null,'Unspecified currency remains unknown');
  equal(missing.setup,null,'Unspecified setup currency remains unknown');
  const mixed=await extract('Currency: USD\nMonthly price: USD 1290\nSetup fee: SAR 590');
  equal(mixed.monthly,1290,'USD field survives a mixed-currency document');
  equal(mixed.setup,null,'Non-USD field is rejected independently');
  const model=browser({explicit:{apiKey:'mock-only',endpoint:'https://model.invalid/chat/completions'},modelHandler:()=>({ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({upload_draft:{monthly:1290,setup:590}})}}]})})}).agents;
  let result=await model.extractProduct({documentText:'Monthly price: SAR 4837.50\nSetup fee: EUR 590\nUsers: 1290'});
  equal(result.upload_draft.monthly,null,'Model-converted foreign monthly amount is rejected');
  equal(result.upload_draft.setup,null,'Model-returned foreign setup amount is rejected');
  result=await model.extractProduct({documentText:'Monthly price: USD 590\nSetup fee: USD 1290'});
  equal(result.upload_draft.monthly,590,'Model cannot swap USD setup value into monthly field');
  equal(result.upload_draft.setup,1290,'Model cannot swap USD monthly value into setup field');
}

async function checkOrderFallbackLocalization() {
  const {agents,orderText}=browser(), {db,account}=records();
  const labels={EN:['In delivery','Confirm approved sample documents','Awaiting renewal','Review monthly usage'],ZH:['交付中','确认已批准的样本文档','待续费','查看月度使用情况'],SA:['قيد التسليم','تأكيد المستندات النموذجية المعتمدة','بانتظار التجديد','مراجعة الاستخدام الشهري']};
  for(const language of ['EN','ZH','SA']) {
    const result=await agents.runWorkspaceAgent({role:'seller',db,user:account,question:'sales orders 订单 متابعة الطلبات',language});
    for(const label of labels[language])ok(result.markdown.includes(label),`${language} local order answer uses complete localized field: ${label}`);
    if(language!=='EN')for(const label of labels.EN)ok(!result.markdown.includes(label),`${language} local order answer excludes original English field`);
    const legacy={...db,orders:db.orders.map(order=>order.id==='PEER-SALE'?{...order,status:'بانتظار التجديد',nextStep:'待复核 monthly usage'}:order)};
    const restored=await agents.runWorkspaceAgent({role:'seller',db:legacy,user:account,question:'sales orders 订单 متابعة الطلبات',language});
    ok(restored.markdown.includes(labels[language][2])&&restored.markdown.includes(labels[language][3]),`${language} recognizes full legacy Arabic and mixed next-step fields`);
    ok(!restored.markdown.includes('待复核 monthly usage'),`${language} eliminates known mixed whole-field legacy value`);
    const link=result.links.find(link=>link.id==='OWN-SALE');
    equal(link?.label,'OWN-SALE · Owned Product',`${language} order link uses source product name without system-language title suffix`);
  }
  equal(orderText('Review monthly usage — special customer note','nextStep','ZH'),'Review monthly usage — special customer note','Unknown custom instructions are preserved without substring replacements');
}

async function checkConfiguration() {
  // All credentials below are invented sentinels; the real config.json is never read.
  const file = { api_configs: { gpt: { api_key: 'file-sentinel', base_url: 'https://file.invalid/v1', model: ['file-0', 'file-1', 'file-2'] } } };
  const load = async options => browser({ file, ...options }).agents.loadExternalConfig();
  let config = await load({ saved: { endpoint: 'http://localhost:8000/v1/chat/completions', model: 'saved-model', apiKey: 'saved-sentinel', baseUrl: 'https://stale.invalid/v1' } });
  equal(config.endpoint, 'http://localhost:8000/v1/chat/completions', 'Saved local endpoint survives file and stale base URLs');
  equal(config.model, 'saved-model', 'Saved model beats file model');
  equal(config.apiKey, 'saved-sentinel', 'Nonempty saved credential beats file credential');
  config = await load({ saved: { endpoint: 'http://saved.invalid/chat/completions', model: 'saved-model', apiKey: 'saved-sentinel' }, explicit: { endpoint: 'http://window.invalid/custom', model: 'window-model', apiKey: '' } });
  equal(config.endpoint, 'http://window.invalid/custom', 'Explicit endpoint beats saved settings');
  equal(config.model, 'window-model', 'Explicit model beats saved settings');
  equal(config.apiKey, '', 'An explicitly empty window credential remains empty');
  config = await load({ saved: { endpoint: '', model: '', apiKey: '' } });
  equal(config.endpoint, 'https://file.invalid/v1/chat/completions', 'Empty saved endpoint falls through to the file');
  equal(config.model, 'file-2', 'File model list preserves the existing index-two preference');
  equal(config.apiKey, 'file-sentinel', 'Empty saved credential falls through to the file');
  config = await load({ saved: { endpoint: 'http://saved.invalid/chat/completions' }, explicit: { baseUrl: 'http://window.invalid/v1/' } });
  equal(config.endpoint, 'http://window.invalid/v1/chat/completions', 'Explicit base URL beats a saved endpoint and removes its trailing slash');
  config = await load({ file: { api_configs: { gpt: { api_key: 'test-only', base_url: 'http://test.invalid/test-model', model: ['test-model'] } } } });
  equal(config.apiKey, 'test-only', 'Existing test-only config interception remains supported');
  equal(config.endpoint, 'http://test.invalid/test-model/chat/completions', 'Intercepted test endpoint is derived correctly');
  equal(config.model, 'test-model', 'A one-item model list uses index zero');
  config = await load({ file: {} });
  equal(config.apiKey, '', 'Missing file configuration leaves the default credential empty');
  equal(config.endpoint, '', 'Missing file configuration leaves the default endpoint empty');
  equal(config.model, 'gpt-5.6-luna', 'Missing file configuration retains the default model');

  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const harness = browser({ file, beforeConfigResponse: () => gate });
  const first = harness.agents.loadExternalConfig();
  const second = harness.agents.loadExternalConfig();
  equal(harness.requests.length, 1, 'Concurrent callers start only one config request');
  let secondResolved = false;
  second.then(() => { secondResolved = true; });
  await Promise.resolve();
  equal(secondResolved, false, 'Concurrent caller waits until the pending file load completes');
  release();
  const [firstResult, secondResult] = await Promise.all([first, second]);
  equal(firstResult, secondResult, 'Concurrent callers receive the same resolved configuration');
  equal(secondResult.model, 'file-2', 'Concurrent callers see the loaded model rather than an early default');
  await harness.agents.loadExternalConfig();
  equal(harness.requests.length, 1, 'Subsequent calls use the cached configuration');
}

async function checkGuideAndModelTitle() {
  const {db,account}=records();
  const offline=browser().agents;
  const guide=await offline.runWorkspaceAgent({role:'guide',db,user:account,question:'如何上传文件发布产品？',language:'ZH'});
  equal(guide.provider,'local','Workflow guidance remains available offline');
  ok(guide.markdown.includes('自动生成')&&guide.markdown.includes('10 MB'),'Guide explains actual automatic upload extraction and file limit');
  ok(!guide.links.some(link=>link.type==='product'),'Workflow question does not force product recommendations');
  ok(guide.links.some(link=>link.route==='warehouse'),'Guide can navigate to publishing even for a buyer publisher');
  same(Array.from(guide.tool_trace,tool=>tool.name),['get_workspace_status'],'Guide initially reads only necessary scoped workflow data');
  ok(typeof guide.conversation_title==='string'&&guide.conversation_title.length>0,'Offline first turn includes a usable conversation title');

  const bodies=[];
  const reply=message=>({ok:true,json:async()=>({choices:[{message}]})});
  const harness=browser({explicit:{apiKey:'model-test-sentinel',endpoint:'https://model.invalid/chat/completions',model:'mock-luna'},modelHandler:body=>{
    bodies.push(body);
    if(bodies.length===1)return reply({role:'assistant',content:null,tool_calls:[{id:'scope-check',type:'function',function:{name:'get_order_details',arguments:JSON.stringify({order_id:'FOREIGN-SALE'})}}]});
    return reply({role:'assistant',content:JSON.stringify({markdown:'Open [your warehouse](#route/warehouse).',conversation_title:'Product publishing steps',links:[{type:'route',route:'warehouse',label:'Warehouse'},{type:'route',route:'compare',label:'Retired page'},{type:'order',id:'FOREIGN-SALE'}]})});
  }});
  const result=await harness.agents.runWorkspaceAgent({role:'guide',db,user:account,question:'How do I publish a product?',language:'EN'});
  equal(result.provider,'live','Guide supports the actual model adapter');
  equal(bodies.length,2,'Answer and AI title share one tool conversation without a separate title API request');
  equal(result.conversation_title,'Product publishing steps','AI-generated title is returned alongside the answer');
  ok(bodies[0].messages[0].content.includes('Workflow Assistant'),'Guide has a dedicated identity and system prompt');
  ok(bodies[0].messages[0].content.includes('conversation_title'),'First-turn prompt requests a title in the same response');
  const toolNames=bodies[0].tools.map(tool=>tool.function.name);
  ok(toolNames.includes('get_workspace_status')&&toolNames.includes('get_orders'),'Guide can inspect current workflow status and scoped orders');
  ok(!toolNames.includes('search_catalog')&&!toolNames.includes('calculate_metrics')&&!toolNames.includes('search_competitors'),'Guide tools avoid product ranking and business analysis');
  equal(bodies[0].reasoning_effort,'none','Luna native tool calling uses its required reasoning setting');
  const snapshot=JSON.parse(bodies[0].messages.at(-1).content).workspace_snapshot;
  equal(snapshot.status.purchase_order_count,1,'Guide purchase count is scoped to the current buyer');
  equal(snapshot.status.sales_order_count,2,'Guide sales count includes owned-company sales only');
  equal(snapshot.status.own_product_count,1,'Guide warehouse count uses owned products only');
  ok(!snapshot.status.routes.includes('compare')&&!snapshot.status.routes.includes('evaluations'),'Retired business-flow pages are not advertised as assistant navigation');
  const denied=JSON.parse(bodies[1].messages.find(message=>message.role==='tool').content);
  equal(denied.error,'Order not found or inaccessible','Guide tool execution blocks another company order');
  ok(!result.links.some(link=>link.route==='compare'||link.id==='FOREIGN-SALE'),'Result validation rejects retired routes and inaccessible orders');
  for(const user of db.users)for(const field of ['password','email'])if(user[field])ok(!JSON.stringify(bodies).includes(user[field]),`Model payload excludes private ${field}`);

  bodies.length=0;
  await harness.agents.runWorkspaceAgent({role:'buyer',db,user:account,question:'Help me clarify a budget',history:[{role:'user',content:'I need an Arabic assistant'},{role:'assistant',content:'What is the budget?'}],language:'EN'});
  ok(!bodies[0].messages[0].content.includes('This is the first turn'),'Follow-up turns do not request another conversation title');
  ok(bodies[0].messages[0].content.includes('Buyer Assistant'),'Buyer conversation uses the new assistant identity');
  ok(bodies[0].messages[0].content.includes('naturally in this conversation'),'Buyer requirements are handled naturally inside the conversation');
  equal(harness.agents.generateConversationTitle({modelTitle:'## Brief title\nwith details'}),'Brief title with details','Title normalization strips Markdown and line breaks');
}

async function checkProductSourceLanguage() {
  const source={name:'Demo Knowledge Desk',category:'AI Agents',summary:'Find answers in approved English company documents.',description:'## Product overview\n\nDemo Knowledge Desk helps internal teams search approved documents and review source citations.',support:'English support during business hours',availability:'Pilot available in three weeks',capabilities:['Source citations'],languages:['English'],deployment:['Buyer VPC'],contactName:'Demo Sales'};
  const documentText=JSON.stringify(source),bodies=[];
  const harness=browser({explicit:{apiKey:'extract-test-sentinel',endpoint:'https://model.invalid/chat/completions',model:'mock'},modelHandler:body=>{bodies.push(body);return {ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({upload_draft:source})}}]})};}});
  const result=await harness.agents.runProduct({documentText,fileName:'english-product.json',language:'ZH'});
  equal(result.provider,'live','Source-language regression exercises the model extraction adapter');
  equal(bodies.length,1,'Language-preserving extraction uses one request');
  ok(bodies[0].messages[0].content.includes('PRESERVE SOURCE LANGUAGE'),'Extraction system prompt requires source-language preservation');
  ok(bodies[0].messages[0].content.includes('Do not translate product content into the UI language'),'Extraction prompt explicitly forbids UI-language product translation');
  ok(bodies[0].messages[0].content.includes('UI language (ZH) applies only to client-side operational status messages'),'UI language is limited to operational status rather than document fields');
  ok(!bodies[0].messages[0].content.includes('所有面向用户的内容必须使用中文'),'Extraction no longer inherits the Chinese conversational output instruction');
  equal(JSON.parse(bodies[0].messages[1].content).document_text,documentText,'Model receives the unmodified English source');
  for(const field of ['name','summary','description','support','availability','contactName'])equal(result.upload_draft[field],source[field],`Chinese UI preserves the source ${field} field`);
  same(Array.from(result.upload_draft.capabilities),source.capabilities,'Source technical capability names remain unchanged');
  same(Array.from(result.upload_draft.deployment),source.deployment,'Source deployment names remain unchanged');
  ok(result.markdown.includes('已从')&&result.markdown.includes('请核对'),'Operational extraction status remains localized in Chinese');
  const offline=await browser().agents.runProduct({documentText,fileName:'english-product.json',language:'ZH'});
  equal(offline.upload_draft.description,source.description,'Offline English JSON introduction also remains English under the Chinese UI');
  equal(offline.upload_draft.summary,source.summary,'Offline English JSON summary also preserves source text');
}

async function checkHistoryPersistenceAndIsolation() {
  const local=memoryStorage(),session=memoryStorage(),pending=[];
  const harness=historyBrowser({local,session,modelHandler:input=>new Promise(resolve=>pending.push({input,resolve}))});
  const {context,view,input}=harness;
  context.render();
  const firstId=context.workspaceSessions('buyer').activeId;
  input.value='First question';const firstRequest=context.sendWorkspaceQuestion({preventDefault:()=>{}});
  equal(pending.length,1,'First question starts one model request');
  const second=context.createWorkspaceConversation('buyer');context.render();
  ok(second.id!==firstId,'New conversation creates an independent session');
  equal(context.workspaceMessages('buyer').length,0,'New conversation starts with no old messages');
  input.value='Second question';const secondRequest=context.sendWorkspaceQuestion({preventDefault:()=>{}});
  equal(pending.length,2,'A new session can send while the old session is still generating');
  equal(pending[1].input.history.length,0,'New-session model context excludes the prior conversation');
  const fields={'.agent-history-title':{textContent:'Temporary title'},'.agent-history-preview':{textContent:'Reply in progress'},'.agent-history-date':{dateTime:'',textContent:''}};
  const item={dataset:{agentSession:firstId},querySelector:selector=>fields[selector]||null};
  const sidebar={scrollTop:217,scrollLeft:42,querySelectorAll:()=>[item]};
  const originalQuery=context.$;context.$=selector=>selector==='.agent-history-sidebar'?sidebar:originalQuery(selector);
  input.value='Unsent draft in the active conversation';
  const conversationBox=originalQuery('#workspaceAgentMessages');conversationBox.scrollTop=321;
  const beforeOldReply=harness.renders;
  pending[0].resolve({markdown:'First answer',conversation_title:'First AI title',provider:'live'});await firstRequest;
  equal(harness.renders,beforeOldReply,'Old-session completion does not rerender the active new session');
  equal(fields['.agent-history-title'].textContent,'First AI title','Background completion refreshes only its existing history title');
  equal(fields['.agent-history-preview'].textContent,'First answer','Background completion removes the stale pending preview');
  ok(fields['.agent-history-date'].dateTime.length>0,'Background completion refreshes its history timestamp');
  equal(input.value,'Unsent draft in the active conversation','History-only refresh preserves the current unsent composer draft');
  equal(conversationBox.scrollTop,321,'History-only refresh preserves conversation scroll position');
  equal(sidebar.scrollTop,217,'Updating a history item preserves sidebar scroll position');
  let store=context.workspaceSessions('buyer');
  equal(store.activeId,second.id,'Old-session completion keeps the newly selected conversation active');
  same(Array.from(store.sessions.find(item=>item.id===firstId).messages,message=>message.content),['First question','First answer'],'Old answer is appended only to its original session');
  same(Array.from(store.sessions.find(item=>item.id===second.id).messages,message=>message.content),['Second question'],'Old answer never appears in the new session');
  equal(store.sessions.find(item=>item.id===firstId).title,'First AI title','AI title is saved on the originating conversation');
  ok(context.__historyTest.workspacePendingRequests.has(context.workspacePendingKey('buyer',second.id)),'Completing the old session leaves the new session pending');

  pending[1].resolve({markdown:'Second answer',conversation_title:'Second AI title',provider:'live'});await secondRequest;
  equal(context.workspaceMessages('buyer').at(-1).content,'Second answer','New-session completion is displayed in its own thread');
  equal(context.__historyTest.workspacePendingRequests.size,0,'Completed requests clear their pending markers');
  ok(context.selectWorkspaceConversation('buyer',firstId),'History selection restores an existing conversation');context.render();
  equal(context.workspaceMessages('buyer').at(-1).content,'First answer','Restored history contains the original answer');
  context.state.lang='ZH';
  equal(context.workspaceMessages('buyer').at(-1).content,'First answer','Language switching preserves original message text');
  const markup=context.renderAgentWorkspace('buyer');
  ok(markup.includes('agent-history-sidebar')&&markup.includes('data-agent-session='),'Workspace renders the history sidebar and selectable sessions');
  ok(markup.includes('agent-history-title" data-no-translate')&&markup.includes('agent-bubble-body" data-no-translate'),'History titles and conversation text are protected from generic UI translation');
  ok(markup.includes('买方助手'),'Assistant heading uses the selected UI language');
  equal(context.workspaceSessions('seller').sessions[0].messages.length,0,'Seller history is independent of buyer history');
  equal(context.workspaceSessions('guide').sessions[0].messages.length,0,'Workflow-assistant history is independent of buyer history');

  input.value='Old-account follow-up';const oldAccountRequest=context.sendWorkspaceQuestion({preventDefault:()=>{}});
  context.state.user={id:'another-user'};context.render();
  const renderCount=harness.renders;
  pending[2].resolve({markdown:'Old-account answer',conversation_title:'Must not replace initial title',provider:'live'});await oldAccountRequest;
  equal(harness.renders,renderCount,'Old-account response does not rerender a different signed-in user');
  equal(context.workspaceMessages('buyer').length,0,'A different user receives a separate empty history');
  const ownerStore=context.workspaceSessions('buyer','history-user'),ownerFirst=ownerStore.sessions.find(item=>item.id===firstId);
  equal(ownerFirst.messages.at(-1).content,'Old-account answer','Old-account response is retained only in its owner history');
  equal(ownerFirst.title,'First AI title','Later turns cannot rename an AI-titled conversation');

  const reloaded=historyBrowser({local,session});
  equal(reloaded.context.workspaceSessions('buyer').activeId,firstId,'Active conversation persists across a fresh page context');
  equal(reloaded.context.workspaceMessages('buyer').at(-1).content,'Old-account answer','Full conversation survives reload through localStorage');
  equal(reloaded.context.__historyTest.workspacePendingRequests.size,0,'Reload does not leave a stale generating state');
  equal(reloaded.context.selectWorkspaceConversation('buyer','missing-session'),false,'Unknown history IDs are rejected');

  const legacy=memoryStorage({
    'saqrloong-chat-legacy-user-buyer-EN':JSON.stringify([{role:'user',content:'Legacy English question'},{role:'assistant',content:'Legacy answer'}]),
    'saqrloong-chat-legacy-user-buyer-ZH':JSON.stringify([{role:'user',content:'历史中文问题'}]),
    'saqrloong-chat-legacy-user-seller-EN':JSON.stringify([{role:'user',content:'Seller-only old history'}]),
    'saqrloong-chat-other-user-buyer-EN':JSON.stringify([{role:'user',content:'Another account secret history'}])
  });
  const migrated=historyBrowser({session:legacy,user:{id:'legacy-user'}}),migration=migrated.context.workspaceSessions('buyer');
  equal(migration.sessions.length,2,'Old language-specific sessionStorage threads migrate into distinct conversations');
  ok(migration.sessions.some(item=>item.messages[0].content==='历史中文问题'),'Migration preserves non-English source messages');
  ok(migration.sessions.every(item=>item.titleSource==='legacy'),'Imported conversations receive a recoverable title');
  equal(legacy.getItem('saqrloong-chat-legacy-user-buyer-EN'),null,'Successfully persisted legacy buyer history is removed from sessionStorage');
  ok(legacy.getItem('saqrloong-chat-legacy-user-seller-EN')!==null,'Migration does not consume another role history');
  ok(legacy.getItem('saqrloong-chat-other-user-buyer-EN')!==null,'Migration does not consume another account history');
  equal(migrated.context.workspaceSessions('buyer').sessions.length,2,'Migration is idempotent and does not duplicate sessions');
  const restoredMigration=historyBrowser({local:migrated.local,session:legacy,user:{id:'legacy-user'}});
  equal(restoredMigration.context.workspaceSessions('buyer').sessions.length,2,'Migrated conversations survive a fresh browser context');
}

(async () => {
  await checkPublisherScope();
  await checkJsonDescription();
  await checkUsdDocumentGrounding();
  await checkOrderFallbackLocalization();
  await checkConfiguration();
  await checkGuideAndModelTitle();
  await checkProductSourceLanguage();
  await checkHistoryPersistenceAndIsolation();
  console.log(`PASS: ${checks} agent scope, model, history, document and configuration regression checks. No real API requests or credential output.`);
})().catch(error => {
  // Only assertion labels are printed, keeping both mock and real credential values out of output.
  console.error(`FAIL: ${error.message.split('\n')[0]}`);
  process.exitCode = 1;
});
