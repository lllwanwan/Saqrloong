/* Product publishing and scoped conversation workspaces. */
const workflowCopy = {
  EN: {
    buyerName:'Procurement Agent', sellerName:'Seller Agent', buyerIntro:'I am your Procurement Agent. I can search and compare products, read your purchase orders, check budgets and deployment requirements, and help you decide the next step. Tell me what you need.', sellerIntro:'I am your Seller Agent. I can read your product warehouse, sales orders and business data, identify follow-up priorities, compare marketplace offers and suggest improvements to your listings. What would you like to review?', buyerSubtitle:'Find the right product and keep purchases moving.', sellerSubtitle:'Understand your products, sales and next actions.', placeholder:'Ask a question about your workspace…', send:'Send message', newChat:'New conversation', buyerPrompts:['Find an Arabic private-deployment knowledge assistant','Which purchase orders need follow-up?','Compare products within a USD 1,400 monthly budget'], sellerPrompts:['Which sales orders need follow-up?','Analyze my product warehouse and evidence gaps','What do my sales data and competitors suggest?'], reading:'Reading workspace records…', sources:'Records consulted', manual:'Fill in structured details', upload:'Generate from a file', optional:'Optional', brief:'Upload a product brief to fill the form. Review and edit every field before publishing.', drop:'Drop a product brief here', browse:'or click to choose a file', formats:'TXT, Markdown, JSON, PDF or Word · up to 10 MB', sample:'Download demo product brief', name:'Product name', category:'Category', summary:'Summary', description:'Detailed product introduction', monthly:'Monthly price (USD)', setup:'Setup price (USD)', tags:'Tags (comma separated)', capabilities:'Capabilities (comma separated)', languages:'Supported languages (comma separated)', deployment:'Deployment options (comma separated)', users:'Included users', support:'Support', availability:'Availability', email:'Contact email', phone:'Contact phone', country:'Country', city:'City', publish:'Publish product', cancel:'Cancel', analyzing:'Analyzing product brief…', extracted:'Draft generated. Review the populated fields before publishing.', unknown:'Fields not stated in the source remain empty.', failure:'Could not analyze this file. You can retry or fill the form manually.', empty:'The file contains no readable text. Try a text-based PDF, Word or Markdown file.', invalid:'Choose a TXT, MD, JSON, PDF or DOCX file up to 10 MB.', reset:'Start with a new question.', intro:'Product introduction', details:'Detailed information', stale:'The account changed. Please upload the file again.', inspect:'View details', model:'Workspace model', local:'Local records'
  },
  ZH: {
    buyerName:'采购 Agent', sellerName:'销售 Agent', buyerIntro:'我是采购 Agent，可以帮你查找和比较产品、读取购买订单、核对预算与部署要求，并给出下一步采购建议。告诉我你想解决什么问题。', sellerIntro:'我是销售 Agent，可以读取你的商品仓库、销售订单和业务数据，识别需要跟进的订单、比较市场产品，并提出商品资料和经营改进建议。今天想先看什么？', buyerSubtitle:'从产品寻源到订单跟进，让采购有据可依。', sellerSubtitle:'查看商品、销售和数据，明确下一步动作。', placeholder:'输入你想了解的问题…', send:'发送消息', newChat:'新对话', buyerPrompts:['帮我找支持阿拉伯语和私有部署的知识助手','哪些购买订单需要跟进？','比较月费 1,400 USD 以内的产品'], sellerPrompts:['哪些销售订单需要优先跟进？','检查商品仓库和资料缺口','根据销售数据和竞品，给出经营建议'], reading:'正在读取工作区记录…', sources:'已读取的数据', manual:'填写规则化信息', upload:'从文件生成', optional:'可选', brief:'上传产品资料，自动填写左侧表单。发布前可逐项检查和编辑。', drop:'将产品资料拖到这里', browse:'或点击选择文件', formats:'TXT、Markdown、JSON、PDF 或 Word · 最大 10 MB', sample:'下载演示产品资料', name:'产品名称', category:'产品类别', summary:'产品摘要', description:'详细产品介绍', monthly:'月费（USD）', setup:'实施费（USD）', tags:'标签（用逗号分隔）', capabilities:'能力（用逗号分隔）', languages:'支持语言（用逗号分隔）', deployment:'部署方式（用逗号分隔）', users:'包含用户数', support:'支持方式', availability:'交付时间', email:'联系邮箱', phone:'联系电话', country:'国家', city:'城市', publish:'发布产品', cancel:'取消', analyzing:'正在分析产品资料…', extracted:'草稿已生成，请检查自动填写的字段后发布。', unknown:'资料中未提到的字段保持为空。', failure:'文件分析失败，可以重试，也可以手动填写。', empty:'文件没有可读取的文字，请使用文字版 PDF、Word 或 Markdown 文件。', invalid:'请选择不超过 10 MB 的 TXT、MD、JSON、PDF 或 DOCX 文件。', reset:'开始一个新问题。', intro:'产品介绍', details:'详细资料', stale:'账号已切换，请重新上传文件。', inspect:'查看详情', model:'已配置模型', local:'本地记录'
  },
  SA: {
    buyerName:'وكيل المشتريات', sellerName:'وكيل المبيعات', buyerIntro:'أنا وكيل المشتريات. أستطيع البحث عن المنتجات ومقارنتها وقراءة طلبات الشراء والتحقق من الميزانية ومتطلبات النشر واقتراح الخطوة التالية. ما الذي تحتاج إليه؟', sellerIntro:'أنا وكيل المبيعات. أستطيع قراءة مستودع منتجاتك وطلبات البيع وبيانات الأعمال وتحديد أولويات المتابعة ومقارنة عروض السوق واقتراح تحسينات. ماذا تود مراجعته؟', buyerSubtitle:'اكتشف المنتجات وتابع مشترياتك بناءً على البيانات.', sellerSubtitle:'افهم منتجاتك ومبيعاتك والخطوات التالية.', placeholder:'اسأل عن مساحة عملك…', send:'إرسال الرسالة', newChat:'محادثة جديدة', buyerPrompts:['ابحث عن مساعد معرفة عربي بنشر خاص','ما طلبات الشراء التي تحتاج إلى متابعة؟','قارن المنتجات ضمن ميزانية شهرية 1,400 دولار أمريكي'], sellerPrompts:['ما طلبات البيع التي تحتاج إلى متابعة؟','راجع مستودع منتجاتي وفجوات الأدلة','حلل المبيعات والمنافسين واقترح خطوات عملية'], reading:'جارٍ قراءة سجلات مساحة العمل…', sources:'السجلات المستخدمة', manual:'إدخال البيانات المنظمة', upload:'إنشاء من ملف', optional:'اختياري', brief:'ارفع ملف المنتج لملء النموذج، ثم راجع الحقول وعدّلها قبل النشر.', drop:'اسحب ملف المنتج إلى هنا', browse:'أو انقر لاختيار ملف', formats:'TXT أو Markdown أو JSON أو PDF أو Word · حتى 10 MB', sample:'تنزيل ملف منتج للعرض التجريبي', name:'اسم المنتج', category:'الفئة', summary:'الملخص', description:'مقدمة تفصيلية للمنتج', monthly:'السعر الشهري (USD)', setup:'سعر التأسيس (USD)', tags:'الوسوم (مفصولة بفواصل)', capabilities:'القدرات (مفصولة بفواصل)', languages:'اللغات المدعومة (مفصولة بفواصل)', deployment:'خيارات النشر (مفصولة بفواصل)', users:'عدد المستخدمين', support:'الدعم', availability:'التوفر', email:'البريد الإلكتروني', phone:'رقم الهاتف', country:'الدولة', city:'المدينة', publish:'نشر المنتج', cancel:'إلغاء', analyzing:'جارٍ تحليل ملف المنتج…', extracted:'تم إنشاء المسودة. راجع الحقول قبل النشر.', unknown:'تبقى الحقول غير المذكورة في الملف فارغة.', failure:'تعذر تحليل الملف. أعد المحاولة أو أدخل البيانات يدوياً.', empty:'لا يحتوي الملف على نص قابل للقراءة. جرّب ملف PDF نصياً أو Word أو Markdown.', invalid:'اختر ملف TXT أو MD أو JSON أو PDF أو DOCX بحجم أقصى 10 MB.', reset:'ابدأ بسؤال جديد.', intro:'مقدمة المنتج', details:'معلومات تفصيلية', stale:'تغير الحساب. أعد رفع الملف.', inspect:'عرض التفاصيل', model:'النموذج المتصل', local:'السجلات المحلية'
  }
};
// Conversation copy is shared by all three workspaces; publishing copy above stays unchanged.
const conversationCopy = {
  EN: { buyerName:'Buyer Assistant', sellerName:'Seller Assistant', guideName:'Workflow Assistant', buyerIntro:'I am your Buyer Assistant. Tell me what you need: I can help clarify requirements, check marketplace products, read your purchase orders and suggest the next step.', sellerIntro:'I am your Seller Assistant. I can review your product warehouse, sales orders and business data, identify follow-up priorities and suggest improvements.', guideIntro:'I am your Workflow Assistant. I can explain how this marketplace works and help you find the right page for publishing, purchasing, messages, orders or account settings. What would you like to do?', guideSubtitle:'Find your way around the marketplace, one step at a time.', history:'Conversations', noHistory:'Your conversations appear here.', guidePrompts:['How do I publish a product from a file?','Where can I find my purchase orders?','How do I contact a provider?'], buyerPrompts:['Help me find an Arabic product with private deployment','Which purchase orders need follow-up?','Help me clarify my requirements and monthly budget'], unnamed:'New conversation', pending:'Reply in progress', chatFailure:'The response could not be completed. Please try again.' },
  ZH: { buyerName:'买方助手', sellerName:'卖方助手', guideName:'流程助手', buyerIntro:'我是买方助手。你可以直接告诉我想解决的问题，我能帮你梳理需求、查找合适产品、读取购买订单，并给出下一步建议。', sellerIntro:'我是卖方助手，可以读取你的商品仓库、销售订单和业务数据，识别需要跟进的事项，并提出商品资料和经营改进建议。', guideIntro:'我是流程助手，可以解释集市的使用方式，帮你找到产品发布、采购、消息、订单和账号设置的入口。你现在想完成什么？', guideSubtitle:'了解集市操作，找到合适入口，逐步完成任务。', history:'历史会话', noHistory:'你的历史对话会保存在这里。', guidePrompts:['如何上传文件发布产品？','在哪里查看我的购买订单？','怎样联系产品服务商？'], buyerPrompts:['帮我找支持阿拉伯语和私有部署的产品','哪些购买订单需要跟进？','帮我梳理需求和月度预算'], unnamed:'新对话', pending:'正在回复', chatFailure:'回复未能完成，请重试。' },
  SA: { buyerName:'مساعد المشتري', sellerName:'مساعد البائع', guideName:'مساعد سير العمل', buyerIntro:'أنا مساعد المشتري. أخبرني بما تحتاج إليه؛ يمكنني توضيح المتطلبات والبحث عن المنتجات ومراجعة طلبات الشراء واقتراح الخطوة التالية.', sellerIntro:'أنا مساعد البائع. يمكنني مراجعة مستودع منتجاتك وطلبات البيع وبيانات الأعمال وتحديد أولويات المتابعة واقتراح التحسينات.', guideIntro:'أنا مساعد سير العمل. أشرح طريقة استخدام السوق وأساعدك في الوصول إلى نشر المنتجات والشراء والرسائل والطلبات وإعدادات الحساب. ما الذي تريد إنجازه؟', guideSubtitle:'تعرّف على خطوات العمل واعثر على الصفحة المناسبة.', history:'المحادثات السابقة', noHistory:'ستُحفظ محادثاتك هنا.', guidePrompts:['كيف أنشر منتجاً من ملف؟','أين أجد طلبات الشراء؟','كيف أتواصل مع مقدم المنتج؟'], buyerPrompts:['ساعدني في العثور على منتج عربي بنشر خاص','ما طلبات الشراء التي تحتاج إلى متابعة؟','ساعدني في تحديد المتطلبات والميزانية الشهرية'], unnamed:'محادثة جديدة', pending:'جارٍ الرد', chatFailure:'تعذر إكمال الرد. يرجى المحاولة مرة أخرى.' }
};
Object.keys(conversationCopy).forEach(language => Object.assign(workflowCopy[language], conversationCopy[language]));
function wc() { return workflowCopy[state.lang] || workflowCopy.EN; }
function renderProductInformation(product) {
  if(!product.productInfo)return '';
  const keys=['audience','problems','useCases','inputs','outputs','workflow','integrations','governance','deploymentNotes','implementation','deliverables','exclusions','acceptanceCriteria','pricingNotes','evidenceNotes'];
  const labels={EN:['Who it is for','Problems addressed','Use cases','Inputs','Outputs','How it works','Integrations','Access and governance','Deployment details','Implementation','Deliverables','Scope and exclusions','Acceptance criteria','Pricing notes','Evidence to review'],ZH:['适用团队','解决的问题','使用场景','输入资料','输出成果','工作流程','系统集成','权限与治理','部署说明','实施步骤','交付内容','范围与限制','验收标准','价格说明','待核验证据'],SA:['المستخدمون المستهدفون','المشكلات','حالات الاستخدام','المدخلات','المخرجات','آلية العمل','التكاملات','الصلاحيات والحوكمة','تفاصيل النشر','التنفيذ','المخرجات المسلمة','النطاق والاستثناءات','معايير القبول','ملاحظات الأسعار','الأدلة المطلوب مراجعتها']}[state.lang] || [];
  return `<section class="product-rich-info"><h3>${esc(wc().details)}</h3>${keys.map((key,i)=>{const value=product.productInfo[key];return !value||Array.isArray(value)&&!value.length?'':`<details class="product-info-section" ${i<3?'open':''}><summary>${esc(labels[i] || key)}</summary>${Array.isArray(value)?`<ul>${value.map(item=>`<li data-no-translate dir="auto">${esc(item)}</li>`).join('')}</ul>`:`<p data-no-translate dir="auto">${esc(value)}</p>`}</details>`;}).join('')}</section>`;
}
const workspaceSessionMemory = new Map();
const workspacePendingRequests = new Map();
function workspaceChatKey(role, userId = state.user?.id || 'guest') { return `saqrloong-agent-sessions-v1-${encodeURIComponent(userId)}-${role}`; }
function workspaceSessionId() { return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `chat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`; }
function workspacePendingKey(role, sessionId, userId = state.user?.id || 'guest') { return `${workspaceChatKey(role,userId)}:${sessionId}`; }
function storeWorkspaceSessions(role, store, userId = state.user?.id || 'guest') {
  const key=workspaceChatKey(role,userId);workspaceSessionMemory.set(key,store);
  try { localStorage.setItem(key,JSON.stringify(store)); } catch {}
  return store;
}
function newWorkspaceSession(language = state.lang) { const now=new Date().toISOString();return {id:workspaceSessionId(),title:null,titleSource:null,language,createdAt:now,updatedAt:now,messages:[]}; }
function workspaceSessions(role, userId = state.user?.id || 'guest') {
  const key=workspaceChatKey(role,userId);let store;
  try { store=JSON.parse(localStorage.getItem(key)||'null'); } catch {}
  store=store&&store.version===1&&Array.isArray(store.sessions)?store:workspaceSessionMemory.get(key)||{version:1,activeId:null,sessions:[],migratedLegacy:false};
  store.sessions=store.sessions.filter(session=>session&&typeof session.id==='string').map(session=>({...session,messages:(Array.isArray(session.messages)?session.messages:[]).filter(message=>message&&['user','assistant'].includes(message.role)&&typeof message.content==='string')}));
  if(!store.migratedLegacy){
    const imported=[];
    for(const language of ['EN','ZH','SA']){
      const legacyKey=`saqrloong-chat-${userId}-${role}-${language}`;
      try { const messages=JSON.parse(sessionStorage.getItem(legacyKey)||'[]');if(Array.isArray(messages)&&messages.some(message=>message&&typeof message.content==='string')){const session=newWorkspaceSession(language);session.messages=messages.filter(message=>message&&['user','assistant'].includes(message.role)&&typeof message.content==='string');session.title=SaqrAgents.generateConversationTitle({question:session.messages.find(message=>message.role==='user')?.content||'',language});session.titleSource='legacy';store.sessions.push(session);imported.push(legacyKey);} } catch {}
    }
    store.migratedLegacy=true;
    if(!store.activeId)store.activeId=store.sessions[0]?.id||null;
    storeWorkspaceSessions(role,store,userId);
    // Remove old data only after its replacement was successfully persisted.
    try { if(localStorage.getItem(key)){for(const legacyKey of imported)sessionStorage.removeItem(legacyKey);} } catch {}
  }
  if(!store.sessions.length){const session=newWorkspaceSession();store.sessions.push(session);store.activeId=session.id;}
  if(!store.sessions.some(session=>session.id===store.activeId))store.activeId=store.sessions[0].id;
  return storeWorkspaceSessions(role,store,userId);
}
function workspaceMessages(role) { const store=workspaceSessions(role);return store.sessions.find(session=>session.id===store.activeId)?.messages||[]; }
function saveWorkspaceMessages(role,messages) { const store=workspaceSessions(role),session=store.sessions.find(item=>item.id===store.activeId);session.messages=messages;session.updatedAt=new Date().toISOString();storeWorkspaceSessions(role,store); }
function createWorkspaceConversation(role,userId = state.user?.id || 'guest') { const store=workspaceSessions(role,userId),session=newWorkspaceSession();store.sessions.unshift(session);store.activeId=session.id;storeWorkspaceSessions(role,store,userId);return session; }
function selectWorkspaceConversation(role,sessionId,userId = state.user?.id || 'guest') { const store=workspaceSessions(role,userId);if(!store.sessions.some(session=>session.id===sessionId))return false;store.activeId=sessionId;storeWorkspaceSessions(role,store,userId);return true; }
function completeWorkspaceRequest({role,userId,sessionId,token,message,title}) {
  const key=workspacePendingKey(role,sessionId,userId);if(workspacePendingRequests.get(key)?.token!==token)return false;
  const store=workspaceSessions(role,userId),session=store.sessions.find(item=>item.id===sessionId);if(!session)return false;
  session.messages.push(message);session.updatedAt=new Date().toISOString();
  if(!message.error&&session.titleSource!=='model'){session.title=SaqrAgents.generateConversationTitle({question:session.messages.find(item=>item.role==='user')?.content||'',modelTitle:title,language:session.language});session.titleSource=title&&message.provider==='live'?'model':'local';}
  storeWorkspaceSessions(role,store,userId);workspacePendingRequests.delete(key);return true;
}
function refreshWorkspaceHistoryItem(role,userId,sessionId) {
  if((state.user?.id||'guest')!==userId||$('.agent-workspace')?.dataset.agentRole!==role)return;
  const sidebar=$('.agent-history-sidebar'),item=sidebar&&Array.from(sidebar.querySelectorAll('button[data-agent-session]')).find(button=>button.dataset.agentSession===sessionId);
  if(!item)return;
  const session=workspaceSessions(role,userId).sessions.find(entry=>entry.id===sessionId);if(!session)return;
  const title=item.querySelector('.agent-history-title'),preview=item.querySelector('.agent-history-preview'),date=item.querySelector('.agent-history-date');
  if(title)title.textContent=session.title||wc().unnamed;
  if(preview)preview.textContent=(session.messages.at(-1)?.content||'').replace(/[#*`>\n]/g,' ').slice(0,72);
  if(date){date.dateTime=session.updatedAt;date.textContent=new Date(session.updatedAt).toLocaleDateString(state.lang==='ZH'?'zh-CN':state.lang==='SA'?'ar-SA':'en-GB',{month:'short',day:'numeric'});}
}
function renderRecordLinks(links = []) { return links.length ? `<div class="agent-links">${links.map(link=>`<button type="button" class="agent-link secondary-btn" data-no-translate dir="auto" data-record-type="${esc(link.type)}" data-record-id="${esc(link.id||'')}" data-record-route="${esc(link.route||'')}">${esc(link.label || link.id || link.route)} <span aria-hidden="true">↗</span></button>`).join('')}</div>` : ''; }
function renderWorkspaceMessage(message) { return `<article class="agent-bubble ${message.role === 'user' ? 'user' : 'assistant'}${message.error?' error':''}">${message.provider?`<div class="agent-message-meta">${esc(message.provider==='live'?wc().model:wc().local)}</div>`:''}<div class="agent-bubble-body" data-no-translate dir="auto">${message.role === 'user' ? `<p>${esc(message.content)}</p>` : renderMarkdown(message.content)}</div>${message.role === 'assistant' ? renderRecordLinks(message.links) : ''}${message.tool_trace?.length ? `<details class="agent-tool-trace"><summary>${esc(wc().sources)} · ${message.tool_trace.length}</summary><ul>${message.tool_trace.map(item=>`<li data-no-translate dir="auto"><code>${esc(item.name || item.tool)}</code>${item.summary?` · ${esc(item.summary)}`:''}</li>`).join('')}</ul></details>`:''}</article>`; }
function renderAgentWorkspace(role) {
  const c=wc(), store=workspaceSessions(role), session=store.sessions.find(item=>item.id===store.activeId), messages=session.messages, pending=workspacePendingRequests.has(workspacePendingKey(role,session.id));
  const history=store.sessions.slice().sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt))).map(item=>{const last=item.messages.at(-1), waiting=workspacePendingRequests.has(workspacePendingKey(role,item.id));return `<button class="agent-history-item${item.id===session.id?' active':''}" type="button" data-agent-session="${esc(item.id)}" aria-current="${item.id===session.id?'true':'false'}"><span class="agent-history-title" data-no-translate dir="auto">${esc(item.title||c.unnamed)}</span><small class="agent-history-preview" data-no-translate dir="auto">${esc(waiting?c.pending:(last?.content||'').replace(/[#*`>\n]/g,' ').slice(0,72))}</small><time class="agent-history-date" datetime="${esc(item.updatedAt)}">${esc(new Date(item.updatedAt).toLocaleDateString(state.lang==='ZH'?'zh-CN':state.lang==='SA'?'ar-SA':'en-GB',{month:'short',day:'numeric'}))}</time></button>`;}).join('');
  return `<div class="agent-workspace-layout"><aside class="agent-history-sidebar" aria-label="${esc(c.history)}"><div class="agent-history-head"><h2>${esc(c.history)}</h2><button class="agent-history-new secondary-btn" type="button" data-action="new-agent-chat">＋ ${esc(c.newChat)}</button></div><div class="agent-history-list">${history||`<p class="agent-history-empty">${esc(c.noHistory)}</p>`}</div></aside><section class="agent-workspace" data-agent-role="${role}" data-agent-session="${esc(session.id)}"><header class="agent-workspace-head"><div class="agent-identity"><div class="agent-avatar"><img src="logo-bird.png" alt="Saqrloong" /></div><div><div class="eyebrow">SAQRLOONG AI</div><h1>${esc(c[`${role}Name`])}</h1><p>${esc(c[`${role}Subtitle`])}</p></div></div></header><div class="agent-conversation" id="workspaceAgentMessages" aria-live="polite" aria-busy="${pending}"><article class="agent-bubble assistant"><div class="agent-bubble-body" data-no-translate dir="auto"><p>${esc(c[`${role}Intro`])}</p></div></article>${messages.map(renderWorkspaceMessage).join('')}${pending?`<article class="agent-bubble assistant loading" id="workspaceAgentLoading"><div class="agent-bubble-body">${esc(c.reading)}</div></article>`:''}${messages.length?'':`<div class="agent-empty-prompts">${c[`${role}Prompts`].map(prompt=>`<button class="agent-prompt" type="button" data-agent-prompt="${esc(prompt)}">${esc(prompt)} <span aria-hidden="true">↗</span></button>`).join('')}</div>`}</div><form class="agent-composer" id="workspaceAgentForm"><textarea id="workspaceAgentInput" rows="2" placeholder="${esc(c.placeholder)}" aria-label="${esc(c.placeholder)}" ${pending?'disabled':''} required></textarea><button class="primary-btn" type="submit" aria-label="${esc(c.send)}" title="${esc(c.send)}" ${pending?'disabled':''}>↑</button></form></section></div>`;
}
function renderPublishForm() {
  const c=wc(), profile=currentProfile();
  const input=(id,label,type='text',value='',required=false)=>`<div class="field"><label for="${id}">${esc(label)}</label><input id="${id}" type="${type}" value="${esc(value)}" ${type==='number'?'min="0" step="any"':''} ${required?'required':''} /></div>`;
  return `<div class="modal-backdrop" id="publishModal" role="dialog" aria-modal="true" aria-labelledby="publishTitle"><section class="modal-card publish-modal"><button type="button" class="modal-close" data-action="close-publish" aria-label="${t('Close')}">×</button><div class="eyebrow">SAQRLOONG MARKETPLACE</div><h2 id="publishTitle">${t('List your AI product')}</h2><p class="modal-lede">${esc(c.brief)}</p><div class="publish-layout"><form id="publishForm" class="publish-fields"><h3>${esc(c.manual)}</h3><div class="form-grid">${input('publishName',c.name,'text','',true)}<div class="field"><label for="publishCategory">${esc(c.category)}</label><select id="publishCategory">${marketplaceCategories.map(item=>`<option value="${esc(item.name)}">${t(item.name)}</option>`).join('')}</select></div><div class="field full"><label for="publishSummary">${esc(c.summary)}</label><textarea id="publishSummary" rows="2" required></textarea></div><div class="field full"><label for="publishDescription">${esc(c.description)}</label><textarea id="publishDescription" rows="6" required></textarea></div>${input('publishMonthly',c.monthly,'number','',true)}${input('publishSetup',c.setup,'number','',true)}${input('publishLanguages',c.languages,'text','',true)}${input('publishDeployment',c.deployment,'text','',true)}${input('publishUsers',c.users,'number')}${input('publishSupport',c.support)}<div class="field full"><label for="publishCapabilities">${esc(c.capabilities)}</label><input id="publishCapabilities" /></div><div class="field full"><label for="publishTags">${esc(c.tags)}</label><input id="publishTags" /></div>${input('publishAvailability',c.availability)}${input('publishEmail',c.email,'email',profile.email,true)}${input('publishPhone',c.phone,'text',profile.phone)}${input('publishCountry',c.country,'text',profile.country,true)}${input('publishCity',c.city,'text',profile.city,true)}</div><div class="action-row"><button type="button" class="secondary-btn" data-action="close-publish">${esc(c.cancel)}</button><button type="submit" class="primary-btn">${esc(c.publish)} →</button></div></form><aside class="publish-upload"><h3>${esc(c.upload)} <small>${esc(c.optional)}</small></h3><p>${esc(c.brief)}</p><label class="publish-dropzone" id="publishDropzone" for="publishDocument" tabindex="0" role="button" aria-label="${esc(c.drop)}"><span class="file-drop-icon" aria-hidden="true">↑</span><strong>${esc(c.drop)}</strong><span>${esc(c.browse)}</span><small>${esc(c.formats)}</small><input id="publishDocument" type="file" accept=".txt,.md,.markdown,.json,.pdf,.docx" /></label><div id="publishAgentOutput" class="upload-status" role="status" aria-live="polite"></div><a class="demo-brief-link" href="DEMO_PRODUCT_BRIEF.md" download>${esc(c.sample)} ↓</a></aside></div></section></div>`;
}
async function readProductBrief(file) {
  const ext=file.name.split('.').pop().toLowerCase();
  if(file.size>10*1024*1024 || !['txt','md','markdown','json','pdf','docx'].includes(ext)) throw new Error(wc().invalid);
  if(ext==='pdf') {
    const pdfjs=await import('./vendor/pdf.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc='./vendor/pdf.worker.mjs';
    const loadingTask=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}), doc=await loadingTask.promise;
    try { const pages=[]; for(let page=1;page<=doc.numPages;page++){const text=await (await doc.getPage(page)).getTextContent();pages.push(text.items.map(item=>(item.str || '')+(item.hasEOL?'\n':' ')).join(''));} return pages.join('\n\n'); } finally { await loadingTask.destroy(); }
  }
  if(ext==='docx') return (await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()})).value;
  return file.text();
}
async function handleProductBrief(file) {
  if(!file)return;
  const out=$('#publishAgentOutput'), uid=state.user?.id, language=state.lang;
  if(!out)return;
  const generation=(state.publishUploadGeneration||0)+1; state.publishUploadGeneration=generation;
  out.className='upload-status loading'; out.textContent=`${wc().analyzing} ${file.name}`;
  const submit=$('#publishForm button[type="submit"]'); if(submit)submit.disabled=true;
  try {
    const text=await readProductBrief(file); if(!text.trim())throw new Error(wc().empty);
    const result=await SaqrAgents.runProduct({db,user:state.user,documentText:text.slice(0,100000),fileName:file.name,language});
    if(!out.isConnected||state.lang!==language||state.user?.id!==uid||generation!==state.publishUploadGeneration)return;
    const draft=result.upload_draft || {}, map={name:'Name',category:'Category',summary:'Summary',description:'Description',monthly:'Monthly',setup:'Setup',tags:'Tags',capabilities:'Capabilities',languages:'Languages',deployment:'Deployment',users:'Users',support:'Support',availability:'Availability',contactEmail:'Email',contactPhone:'Phone',country:'Country',city:'City'};
    const populated=Object.entries(map).flatMap(([field,suffix])=>{
      const node=$(`#publish${suffix}`), value=draft[field] ?? (field==='contactEmail'?draft.contact?.email:field==='contactPhone'?draft.contact?.phone:undefined);
      if(!node||value===undefined||value===null||value===''||Array.isArray(value)&&!value.length||field==='category'&&!marketplaceCategories.some(item=>item.name===value))return [];
      return [{node,value:Array.isArray(value)?value.join(', '):String(value)}];
    });
    if(!populated.length)throw new Error(wc().failure);
    // Replacing a file must not carry facts from the previous document into this draft.
    // Restore auto-filled values only while unchanged, preserving the user's edits.
    for(const suffix of Object.values(map)){
      const node=$(`#publish${suffix}`);
      if(node?.dataset.generatedValue!==undefined){
        if(node.value===node.dataset.generatedValue)node.value=node.dataset.generatedPrevious || '';
        delete node.dataset.generatedValue;delete node.dataset.generatedPrevious;
        node.classList.remove('generated-field');
      }
    }
    for(const {node,value} of populated){node.dataset.generatedPrevious=node.value;node.value=value;node.dataset.generatedValue=node.value;node.classList.add('generated-field');}
    state.publishFile={name:file.name,productInfo:draft.productInfo || null,sourceEvidence:draft.source_evidence || null};
    out.className='upload-status success';out.innerHTML=`<strong>${esc(wc().extracted)}</strong><p>${esc(file.name)} · ${populated.length} ${state.lang==='ZH'?'个字段':state.lang==='SA'?'حقول':'fields'}</p><small>${esc(wc().unknown)}</small>`;
  } catch(error) { if(out.isConnected&&generation===state.publishUploadGeneration){out.className='upload-status error';out.textContent=error.message || wc().failure;} }
  finally { if(submit?.isConnected&&generation===state.publishUploadGeneration)submit.disabled=false; }
}
function bindWorkflowUI() {
  const zone=$('#publishDropzone');
  if(zone){zone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#publishDocument').click();}});zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('dragging');});zone.addEventListener('dragleave',()=>zone.classList.remove('dragging'));zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('dragging');handleProductBrief(e.dataTransfer.files[0]);});}
  $('#workspaceAgentForm')?.addEventListener('submit',sendWorkspaceQuestion);
  $('#workspaceAgentInput')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('#workspaceAgentForm').requestSubmit();}});
  $$('[data-agent-prompt]').forEach(button=>button.onclick=()=>{$('#workspaceAgentInput').value=button.dataset.agentPrompt;$('#workspaceAgentForm').requestSubmit();});
  $('[data-action="new-agent-chat"]')?.addEventListener('click',()=>{createWorkspaceConversation($('.agent-workspace').dataset.agentRole);render();});
  $$('[data-agent-session]').filter(button=>button.matches('button')).forEach(button=>button.addEventListener('click',()=>{if(selectWorkspaceConversation($('.agent-workspace').dataset.agentRole,button.dataset.agentSession))render();}));
  $('#workspaceAgentMessages')?.scrollTo(0,$('#workspaceAgentMessages').scrollHeight);
}
async function sendWorkspaceQuestion(event) {
  event.preventDefault(); const role=$('.agent-workspace')?.dataset.agentRole, input=$('#workspaceAgentInput'), box=$('#workspaceAgentMessages'), question=input?.value.trim();
  if(!question||!role||box.getAttribute('aria-busy')==='true')return;
  const language=state.lang,user=state.user,userId=user?.id||'guest',store=workspaceSessions(role,userId),session=store.sessions.find(item=>item.id===store.activeId),history=session.messages.slice(),sessionId=session.id,token=workspaceSessionId(),pendingKey=workspacePendingKey(role,sessionId,userId);
  if(workspacePendingRequests.has(pendingKey))return;
  session.messages.push({role:'user',content:question,language});session.updatedAt=new Date().toISOString();if(!session.title){session.title=SaqrAgents.generateConversationTitle({question,language});session.titleSource='local';}
  storeWorkspaceSessions(role,store,userId);workspacePendingRequests.set(pendingKey,{token,language});render();
  try {
    const result=await SaqrAgents.runWorkspaceAgent({role,db:SaqrDB.load(),user,question,history:history.filter(message=>!message.error).slice(-16),language});
    completeWorkspaceRequest({role,userId,sessionId,token,title:result.conversation_title,message:{role:'assistant',content:agentMarkdown(result),links:result.links||[],tool_trace:result.tool_trace||[],provider:result.provider,language}});
  } catch { completeWorkspaceRequest({role,userId,sessionId,token,message:{role:'assistant',content:(workflowCopy[language]||workflowCopy.EN).chatFailure,error:true,language}}); }
  finally {
    if(workspacePendingRequests.get(pendingKey)?.token===token)workspacePendingRequests.delete(pendingKey);
    const visible=$('.agent-workspace');if((state.user?.id||'guest')===userId&&visible?.dataset.agentRole===role&&visible.dataset.agentSession===sessionId)render();else refreshWorkspaceHistoryItem(role,userId,sessionId);
  }
}
function openWorkspaceRecord(type,id,targetRoute) {
  if(type==='product'&&SaqrDB.product(id,db)){state.productModal=id;state.selectedProduct=id;render();}
  else if(type==='order'){const order=db.orders.find(item=>item.id===id);if(!order)return;const ownSale=sellerOrders().some(item=>item.id===id), ownPurchase=order.buyerUserId===state.user?.id;if(!ownSale&&!ownPurchase)return;state.focusedOrderId=id;navigate(ownSale&&!ownPurchase?'sales-orders':'orders');requestAnimationFrame(()=>document.querySelector(`[data-order-id="${CSS.escape(id)}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}));}
  else if(type==='route'&&routes.has(targetRoute))navigate(targetRoute);
}
document.addEventListener('click',event=>{
  const record=event.target.closest('[data-record-type]');if(record){event.preventDefault();openWorkspaceRecord(record.dataset.recordType,record.dataset.recordId,record.dataset.recordRoute);return;}
  const anchor=event.target.closest('.markdown-body a');if(!anchor)return;const match=(anchor.getAttribute('href')||'').match(/^#(product|order|route)\/([^?#]+)$/);if(match){event.preventDefault();openWorkspaceRecord(match[1],decodeURIComponent(match[2]),decodeURIComponent(match[2]));}
});
