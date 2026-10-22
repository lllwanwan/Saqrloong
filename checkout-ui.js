/* Local demo checkout. Payment methods are presentation choices; no payment API is called. */
const checkoutJobs = new Map();
const checkoutMethods = ['alipay', 'visa', 'paypal'];
function checkoutToken() { return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; }
function checkoutCopy() {
  const copies = {
    EN: {
      title: 'Confirm your purchase', paymentTitle: 'Choose a payment method', successTitle: 'Your order is confirmed',
      subtitle: 'Choose a subscription term and review the price before payment.', paymentSubtitle: 'Select a payment method to complete this demo purchase.',
      steps: ['Purchase details', 'Payment', 'Order confirmed'], demo: 'Demo payment · No money will be charged.',
      demoPurchase: 'Demo purchase', selfNote: 'This is your own listing. You can try the complete demo purchase flow here.',
      duration: 'Subscription term', months: 'months', month: 'month', durationHelp: 'Choose 1–36 months. The setup fee is charged once.',
      monthly: 'Monthly price', subscription: 'Subscription', setup: 'One-time setup', total: 'Total due', summary: 'Order summary', provider: 'Provider',
      continue: 'Continue to payment', back: 'Back to purchase details', cancel: 'Return to products',
      alipay: 'Alipay', visa: 'Visa', paypal: 'PayPal', alipayDetail: 'Wallet payment', visaDetail: 'Card payment', paypalDetail: 'PayPal account',
      noDetails: 'Choose a method and pay. No card details, password or account sign-in is needed.', pay: 'Simulate payment',
      processing: 'Processing payment…', processingHelp: 'Confirming your demo payment. Please wait.',
      success: 'Payment successful', successHelp: 'Your demo payment succeeded and your purchase order has been created.',
      orderId: 'Order number', method: 'Payment method', paymentStatus: 'Payment status', demoSuccess: 'Demo payment successful',
      viewOrder: 'View purchase order', browse: 'Continue browsing', invalidMonths: 'Enter a whole number from 1 to 36.',
      unavailable: 'This product needs a confirmed USD quote before checkout.', missing: 'No purchase is waiting for this account.',
      missingHelp: 'Open a product and start a purchase to choose your subscription term.', expired: 'The product or provider changed. Please start the purchase again.',
      changedAccount: 'The account changed. No payment or order was completed.', retry: 'The payment did not finish. Please try again.',
      demoOrder: 'Demo order', unknownMethod: 'Choose a payment method.'
    },
    ZH: {
      title: '确认购买信息', paymentTitle: '选择支付方式', successTitle: '下单成功',
      subtitle: '选择购买月数，核对费用后前往支付。', paymentSubtitle: '选择一种支付方式，完成本次模拟购买。',
      steps: ['确认购买', '支付', '下单成功'], demo: '模拟支付 · 不会真实扣款。',
      demoPurchase: '演示下单', selfNote: '这是你发布的产品，可以在这里体验完整的模拟下单流程。',
      duration: '购买时长', months: '个月', month: '个月', durationHelp: '可购买 1–36 个月，实施费只收取一次。',
      monthly: '每月费用', subscription: '订阅费用', setup: '一次性实施费', total: '应付总额', summary: '订单明细', provider: '服务商',
      continue: '前往支付', back: '返回购买信息', cancel: '返回产品列表',
      alipay: '支付宝', visa: 'Visa', paypal: 'PayPal', alipayDetail: '钱包支付', visaDetail: '银行卡支付', paypalDetail: '账户支付',
      noDetails: '选择支付方式即可，无需输入卡号、密码或登录支付账户。', pay: '模拟支付',
      processing: '支付中…', processingHelp: '正在确认模拟支付结果，请稍候。',
      success: '支付成功', successHelp: '模拟支付已成功，购买订单已创建。',
      orderId: '订单编号', method: '支付方式', paymentStatus: '支付状态', demoSuccess: '模拟支付成功',
      viewOrder: '查看购买订单', browse: '继续浏览产品', invalidMonths: '请输入 1 至 36 之间的整数。',
      unavailable: '请先与服务商确认美元报价，再进行下单。', missing: '当前账号没有待结算的购买。',
      missingHelp: '从产品详情发起购买，即可选择购买月数。', expired: '产品或服务商信息已变化，请重新发起购买。',
      changedAccount: '账号已切换，本次支付和订单均未完成。', retry: '支付未完成，请重试。',
      demoOrder: '演示订单', unknownMethod: '请选择一种支付方式。'
    },
    SA: {
      title: 'تأكيد تفاصيل الشراء', paymentTitle: 'اختر وسيلة الدفع', successTitle: 'تم تأكيد طلبك',
      subtitle: 'اختر مدة الاشتراك وراجع المبلغ قبل الانتقال إلى الدفع.', paymentSubtitle: 'اختر وسيلة دفع لإتمام عملية الشراء التجريبية.',
      steps: ['تفاصيل الشراء', 'الدفع', 'تأكيد الطلب'], demo: 'دفع تجريبي · لن يتم خصم أي مبلغ.',
      demoPurchase: 'تجربة الشراء', selfNote: 'هذا منتجك المنشور. يمكنك تجربة خطوات الشراء والدفع كاملة هنا.',
      duration: 'مدة الاشتراك', months: 'أشهر', month: 'شهر', durationHelp: 'اختر من شهر إلى 36 شهراً. تُحسب رسوم الإعداد مرة واحدة.',
      monthly: 'السعر الشهري', subscription: 'رسوم الاشتراك', setup: 'رسوم الإعداد لمرة واحدة', total: 'الإجمالي المستحق', summary: 'ملخص الطلب', provider: 'مقدم الخدمة',
      continue: 'الانتقال إلى الدفع', back: 'العودة إلى تفاصيل الشراء', cancel: 'العودة إلى المنتجات',
      alipay: 'Alipay', visa: 'Visa', paypal: 'PayPal', alipayDetail: 'الدفع بالمحفظة', visaDetail: 'الدفع بالبطاقة', paypalDetail: 'الدفع بحساب باي بال',
      noDetails: 'اختر الوسيلة فقط. لا حاجة لرقم بطاقة أو كلمة مرور أو تسجيل دخول لحساب الدفع.', pay: 'محاكاة الدفع',
      processing: 'جارٍ الدفع…', processingHelp: 'جارٍ تأكيد الدفع التجريبي. يرجى الانتظار.',
      success: 'تم الدفع بنجاح', successHelp: 'نجح الدفع التجريبي وتم إنشاء طلب الشراء.',
      orderId: 'رقم الطلب', method: 'وسيلة الدفع', paymentStatus: 'حالة الدفع', demoSuccess: 'تم الدفع التجريبي بنجاح',
      viewOrder: 'عرض طلب الشراء', browse: 'متابعة تصفح المنتجات', invalidMonths: 'أدخل عدداً صحيحاً من 1 إلى 36.',
      unavailable: 'يجب تأكيد السعر بالدولار الأمريكي مع المقدم قبل الشراء.', missing: 'لا توجد عملية شراء معلقة لهذا الحساب.',
      missingHelp: 'ابدأ الشراء من تفاصيل المنتج لاختيار مدة الاشتراك.', expired: 'تغيرت بيانات المنتج أو المقدم. يرجى بدء الشراء من جديد.',
      changedAccount: 'تغير الحساب. لم يكتمل الدفع أو إنشاء الطلب.', retry: 'لم يكتمل الدفع. يرجى المحاولة مجدداً.',
      demoOrder: 'طلب تجريبي', unknownMethod: 'يرجى اختيار وسيلة الدفع.'
    }
  };
  return copies[state.lang] || copies.EN;
}
const checkoutKey = userId => `saqrloong-checkout-v1-${encodeURIComponent(userId)}`;
function storeCheckout(draft) { sessionStorage.setItem(checkoutKey(draft.userId), JSON.stringify(draft)); }
function isCurrentCheckout(draft, expectedStatus) {
  try {
    const current = JSON.parse(sessionStorage.getItem(checkoutKey(draft.userId)) || 'null');
    return current?.id === draft.id && current.userId === draft.userId && (!expectedStatus || current.status === expectedStatus);
  } catch { return false; }
}
function activeCheckout() {
  if (!state.user?.id || !state.authenticated) return null;
  let draft;
  try { draft = JSON.parse(sessionStorage.getItem(checkoutKey(state.user.id)) || 'null'); } catch { return null; }
  if (!draft || draft.userId !== state.user.id) return null;
  const recorded = db.orders.find(order => order.checkoutId === draft.id && order.buyerUserId === draft.userId);
  if (recorded) { draft.status = 'succeeded'; draft.orderId = recorded.id; draft.method = recorded.payment?.method || draft.method; }
  else if (draft.status === 'processing' && !checkoutJobs.has(draft.id)) { draft.status = 'ready'; draft.stage = 'payment'; storeCheckout(draft); }
  return draft;
}
function checkoutSteps(active) {
  return `<ol class="checkout-steps">${checkoutCopy().steps.map((label, i) => `<li class="checkout-step ${i === active ? 'active' : i < active ? 'completed' : ''}" ${i === active ? 'aria-current="step"' : ''}><span>${i < active ? '✓' : i + 1}</span><strong>${esc(label)}</strong></li>`).join('')}</ol>`;
}
function checkoutSummary(draft) {
  const c = checkoutCopy();
  return `<aside class="checkout-summary checkout-card"><h2>${c.summary}</h2><div class="checkout-product"><span class="tag">${c.demoOrder}</span><h3 dir="auto">${esc(draft.productName)}</h3><p>${c.provider}: <span dir="auto">${esc(draft.providerName)}</span></p></div><dl><div><dt>${c.monthly}</dt><dd data-checkout-monthly dir="ltr">${money(draft.monthly)}</dd></div><div><dt>${c.duration}</dt><dd><span data-checkout-months>${draft.months}</span> ${draft.months === 1 ? c.month : c.months}</dd></div><div><dt>${c.subscription}</dt><dd data-checkout-subtotal dir="ltr">${money(draft.subtotal)}</dd></div><div><dt>${c.setup}</dt><dd data-checkout-setup dir="ltr">${money(draft.setup)}</dd></div><div class="checkout-total"><dt>${c.total}</dt><dd data-checkout-total dir="ltr">${money(draft.total)}</dd></div></dl><p class="checkout-demo-note">${c.demo}</p></aside>`;
}
function checkoutFrame(title, subtitle, stage, main, draft) {
  return `<section class="checkout-shell" data-no-translate><div class="page-header"><div><h1>${title}</h1><p>${subtitle}</p></div><span class="checkout-demo-badge">${checkoutCopy().demoOrder}</span></div>${checkoutSteps(stage)}<div class="checkout-layout"><div class="checkout-main">${main}</div>${draft ? checkoutSummary(draft) : ''}</div></section>`;
}
function checkoutEmpty() {
  const c = checkoutCopy();
  return checkoutFrame(c.missing, c.missingHelp, 0, `<section class="checkout-card"><button class="primary-btn" data-screen="catalog">${c.cancel}</button></section>`, null);
}
function checkout() {
  const draft = activeCheckout(), c = checkoutCopy();
  if (!draft) return checkoutEmpty();
  if (draft.status === 'succeeded') return orderSuccess();
  if (draft.status === 'processing') return payment();
  return checkoutFrame(c.title, c.subtitle, 0, `<form class="checkout-card" id="checkoutForm">${draft.selfPurchaseDemo ? `<p class="checkout-demo-note">${c.selfNote}</p>` : ''}<div class="field"><label for="checkoutMonths">${c.duration}</label><div class="checkout-months-input"><input id="checkoutMonths" name="months" type="number" min="1" max="36" step="1" required value="${draft.months}" aria-describedby="checkoutDurationHelp checkoutError"/><span>${c.months}</span></div><p id="checkoutDurationHelp" class="helper-text">${c.durationHelp}</p></div><div class="checkout-durations">${[1,3,6,12].map(months => `<button type="button" class="checkout-duration ${draft.months === months ? 'selected' : ''}" data-checkout-months="${months}">${months} ${months === 1 ? c.month : c.months}</button>`).join('')}</div><p id="checkoutError" class="checkout-error" role="alert"></p><div class="checkout-actions"><button type="button" class="secondary-btn" data-screen="catalog">${c.cancel}</button><button type="submit" class="primary-btn" data-action="checkout-continue">${c.continue} <span aria-hidden="true">→</span></button></div></form>`, draft);
}
function payment() {
  const draft = activeCheckout(), c = checkoutCopy();
  if (!draft) return checkoutEmpty();
  if (draft.status === 'succeeded') return orderSuccess();
  const busy = draft.status === 'processing';
  return checkoutFrame(c.paymentTitle, c.paymentSubtitle, 1, `<form class="checkout-card" id="paymentForm"><div class="payment-methods" role="radiogroup" aria-label="${c.method}">${checkoutMethods.map(method => `<label class="payment-method ${draft.method === method ? 'selected' : ''}"><input type="radio" name="paymentMethod" value="${method}" ${draft.method === method ? 'checked' : ''} ${busy ? 'disabled' : ''} required/><span class="payment-brand payment-brand-${method}" aria-hidden="true">${({alipay:'ALI',visa:'VISA',paypal:'PayPal'})[method]}</span><span class="payment-method-copy"><strong>${c[method]}</strong><small>${c[method+'Detail']}</small></span><span class="payment-radio" aria-hidden="true"></span></label>`).join('')}</div><p class="helper-text">${c.noDetails}</p>${busy ? `<div class="payment-state" data-payment-state="processing" role="status" aria-live="polite"><span class="payment-spinner" aria-hidden="true"></span><div><strong>${c.processing}</strong><p>${c.processingHelp}</p></div></div>` : ''}<p id="paymentError" class="checkout-error" role="alert"></p><div class="checkout-actions"><button type="button" class="secondary-btn" data-action="checkout-back" ${busy ? 'disabled' : ''}>${c.back}</button><button type="submit" class="primary-btn" id="payButton" ${busy || !checkoutMethods.includes(draft.method) ? 'disabled' : ''}>${busy ? c.processing : `${c.pay} · ${money(draft.total)}`}</button></div></form>`, draft);
}
function orderSuccess() {
  const draft = activeCheckout(), c = checkoutCopy();
  const order = draft && db.orders.find(item => item.id === draft.orderId && item.buyerUserId === state.user.id && item.checkoutId === draft.id);
  if (!order) return checkoutEmpty();
  return checkoutFrame(c.successTitle, c.demo, 2, `<section class="checkout-card checkout-success payment-success" data-payment-state="success" data-paid-order-id="${esc(order.id)}" role="status"><div class="payment-success-mark" aria-hidden="true">✓</div><h2>${c.success}</h2><p>${c.successHelp}</p><dl class="payment-receipt"><div><dt>${c.orderId}</dt><dd dir="ltr">${esc(order.id)}</dd></div><div><dt>${c.method}</dt><dd>${c[order.payment.method]}</dd></div><div><dt>${c.paymentStatus}</dt><dd>${c.demoSuccess}</dd></div></dl><div class="checkout-actions"><button class="secondary-btn" data-screen="catalog">${c.browse}</button><button class="primary-btn" data-action="view-paid-order" data-order-id="${esc(order.id)}">${c.viewOrder}</button></div></section>`, draft);
}
function beginCheckout(productId, requestId) {
  updateDb();
  const product = SaqrDB.product(productId, db), c = checkoutCopy();
  if (!product || !state.user || !state.authenticated) return;
  if (activeCheckout()?.status === 'processing') { state.productModal = null; navigate('payment'); return; }
  let quote; try { quote = SaqrDB.checkoutQuote(product, 1); } catch { return toast(c.unavailable, true); }
  const draft = { id: `checkout-${checkoutToken()}`, userId: state.user.id, productId, productName: product.name, companyId: product.companyId, providerName: companyFor(product).name, requestId: requestId || null, selfPurchaseDemo: product.companyId === state.user.companyId || product.publisherUserId === state.user.id, ...quote, status: 'ready', stage: 'details', method: null, createdAt: new Date().toISOString() };
  storeCheckout(draft); state.productModal = null; navigate('checkout');
}
function updateCheckoutMonths(value) {
  const draft = activeCheckout();
  if (!draft || draft.status !== 'ready') return false;
  let quote;
  try { quote = SaqrDB.checkoutQuote(draft, value === '' ? NaN : Number(value)); }
  catch { $('#checkoutError').textContent = checkoutCopy().invalidMonths; $('#checkoutMonths').setAttribute('aria-invalid', 'true'); $('[data-action="checkout-continue"]').disabled = true; return false; }
  Object.assign(draft, quote); storeCheckout(draft);
  $('#checkoutError').textContent = ''; $('#checkoutMonths').removeAttribute('aria-invalid'); $('[data-action="checkout-continue"]').disabled = false;
  $('.checkout-summary').outerHTML = checkoutSummary(draft);
  $$('[data-checkout-months].checkout-duration').forEach(button => button.classList.toggle('selected', Number(button.dataset.checkoutMonths) === draft.months));
  return true;
}
function checkoutIdentityMatches(userId) {
  if (!state.authenticated || state.user?.id !== userId) return false;
  try { return JSON.parse(localStorage.getItem('saqrloong-user') || 'null')?.id === userId; } catch { return false; }
}
function commitDemoOrder(draft) {
  if (!checkoutIdentityMatches(draft.userId)) throw new Error(checkoutCopy().changedAccount);
  if (!isCurrentCheckout(draft, 'processing')) throw new Error(checkoutCopy().retry);
  db = SaqrDB.load();
  const existing = db.orders.find(order => order.checkoutId === draft.id && order.buyerUserId === draft.userId);
  if (existing) return existing;
  const product = SaqrDB.product(draft.productId, db);
  if (!product || product.companyId !== draft.companyId) throw new Error(checkoutCopy().expired);
  const quote = SaqrDB.checkoutQuote(draft, draft.months);
  const seller = ensureSellerForProduct(product);
  if (!seller) throw new Error(checkoutCopy().expired);
  const sequence = Math.max(0, ...db.orders.map(order => /^ORD-\d+$/.test(order.id) ? Number(order.id.slice(4)) : 0)) + 1;
  const now = new Date().toISOString();
  const order = { id: `ORD-${String(sequence).padStart(3,'0')}`, checkoutId: draft.id, publisherUserId: product.publisherUserId || seller.id, sellerUserId: seller.id, buyerUserId: draft.userId, productId: draft.productId, requestId: draft.requestId, title: draft.productName, status: 'Placed', orderedAt: now.slice(0,10), monthly: quote.monthly, subscriptionMonths: quote.months, subtotal: quote.subtotal, setup: quote.setup, total: quote.total, currency: 'USD', nextStep: 'Awaiting provider scope confirmation', selfPurchaseDemo: draft.selfPurchaseDemo, payment: { mode: 'demo', method: draft.method, status: 'succeeded', paidAt: now, transactionId: `demo-${draft.id}` } };
  db.orders.unshift(order);
  const request = db.requests.find(item => item.id === draft.requestId); if (request) request.status = 'Ordered';
  // A self-purchase demo does not need a conversation with the same company.
  if (!draft.selfPurchaseDemo && draft.userId !== seller.id) {
    let conversation = db.conversations.find(item => item.participantIds.includes(draft.userId) && item.participantIds.includes(seller.id));
    if (!conversation) { conversation = { id: `CONV-${checkoutToken()}`, participantIds: [draft.userId,seller.id], productId: draft.productId, messages: [] }; db.conversations.push(conversation); }
    conversation.orderId = order.id; state.selectedConversation = conversation.id;
  }
  SaqrDB.save(db);
  return order;
}
async function finishDemoPayment(draft) {
  try {
    if (!checkoutIdentityMatches(draft.userId)) throw new Error(checkoutCopy().changedAccount);
    const latest = activeCheckout();
    if (!latest || latest.id !== draft.id || latest.status !== 'processing') return;
    const order = navigator.locks?.request ? await navigator.locks.request('saqrloong-demo-orders', () => commitDemoOrder(draft)) : commitDemoOrder(draft);
    if (isCurrentCheckout(draft)) {
      Object.assign(draft, { status: 'succeeded', stage: 'success', orderId: order.id }); storeCheckout(draft);
      if (checkoutIdentityMatches(draft.userId) && ['checkout','payment','order-success'].includes(state.screen)) navigate('order-success');
    }
  } catch (error) {
    if (isCurrentCheckout(draft)) {
      Object.assign(draft, { status: 'ready', stage: 'payment' }); storeCheckout(draft);
      if (checkoutIdentityMatches(draft.userId) && state.screen === 'payment') { render(); $('#paymentError').textContent = error.message || checkoutCopy().retry; }
    }
  } finally { checkoutJobs.delete(draft.id); }
}
function submitDemoPayment() {
  const draft = activeCheckout(), method = $('input[name="paymentMethod"]:checked')?.value;
  if (!draft || draft.status !== 'ready' || checkoutJobs.has(draft.id)) return;
  if (!checkoutIdentityMatches(draft.userId)) { $('#paymentError').textContent = checkoutCopy().changedAccount; return; }
  if (!checkoutMethods.includes(method)) { $('#paymentError').textContent = checkoutCopy().unknownMethod; return; }
  try { SaqrDB.checkoutQuote(draft, draft.months); } catch { $('#paymentError').textContent = checkoutCopy().unavailable; return; }
  Object.assign(draft, { method, status: 'processing', stage: 'payment' });
  checkoutJobs.set(draft.id, true); storeCheckout(draft); render();
  setTimeout(() => finishDemoPayment(draft), 1100);
}
function bindCheckoutUI() {
  $('#checkoutMonths')?.addEventListener('input', event => updateCheckoutMonths(event.target.value));
  $$('.checkout-duration').forEach(button => button.onclick = () => { $('#checkoutMonths').value = button.dataset.checkoutMonths; updateCheckoutMonths(button.dataset.checkoutMonths); });
  $('#checkoutForm')?.addEventListener('submit', event => { event.preventDefault(); if (!updateCheckoutMonths($('#checkoutMonths').value)) return; const draft = activeCheckout(); draft.stage = 'payment'; storeCheckout(draft); navigate('payment'); });
  $$('input[name="paymentMethod"]').forEach(input => input.onchange = () => { const draft = activeCheckout(); if (!draft || draft.status !== 'ready') return; draft.method = input.value; storeCheckout(draft); $$('.payment-method').forEach(label => label.classList.toggle('selected', label.contains(input))); $('#payButton').disabled = false; });
  $('#paymentForm')?.addEventListener('submit', event => { event.preventDefault(); submitDemoPayment(); });
  $('[data-action="checkout-back"]')?.addEventListener('click', () => { const draft = activeCheckout(); if (!draft || draft.status !== 'ready') return; draft.stage = 'details'; storeCheckout(draft); navigate('checkout'); });
  $('[data-action="view-paid-order"]')?.addEventListener('click', event => { state.focusedOrderId = event.currentTarget.dataset.orderId; navigate('orders'); });
}
function checkoutOrderMeta(order) {
  if (order.payment?.mode !== 'demo') return '';
  const c = checkoutCopy();
  return `<small class="order-purchase-meta">${order.subscriptionMonths} ${order.subscriptionMonths === 1 ? c.month : c.months} · ${esc(c[order.payment.method] || '')} · ${c.demoSuccess}</small>`;
}
