/* Seed source language, legacy browser repair and provider-copy preservation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const project = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(project, 'data.js'), 'utf8');
const app = fs.readFileSync(path.join(project, 'app.js'), 'utf8');
const ui = {};
// Reproduce the historical interface substitutions rather than a new translator.
vm.runInNewContext(app.slice(app.indexOf('const lang ='), app.indexOf('const t =')) + ';globalThis.dictionaries={ZH:{...lang.ZH,...phraseTranslations.ZH},SA:{...lang.SA,...phraseTranslations.SA}};', ui);
const legacy = {};
vm.runInNewContext(app.slice(app.indexOf('const productDescriptions ='), app.indexOf('function normalizeMarketplaceData')) + ';globalThis.descriptions=productDescriptions;', legacy);
function createRepository() {
  const storage = new Map();
  let saves = 0;
  const context = { window: {}, localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => { storage.set(key, value); saves++; } } };
  vm.runInNewContext(script, context);
  return { api: context.window.SaqrDB, saves: () => saves };
}
const json = value => JSON.parse(JSON.stringify(value));
function translated(value, language) {
  if (typeof value === 'string') {
    const dictionary = ui.dictionaries[language];
    const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
    return value.replace(pattern, key => dictionary[key]);
  }
  if (Array.isArray(value)) return value.map(item => translated(item, language));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translated(item, language)]));
  return value;
}
const repository = createRepository(), seed = json(repository.api.seed);
assert.equal(seed.products.length, 10);
for (const product of seed.products) {
  assert.equal(product.contentLanguage, 'en', product.id + ' original language');
  assert.ok(!/[\p{Script=Han}\p{Script=Arabic}]/u.test(JSON.stringify(product)), product.id + ' has one original language');
  assert.equal(Object.keys(product.productInfo).length, 15);
}
for (const language of ['ZH', 'SA']) {
  const stored = json(seed);
  stored.products = stored.products.map(product => {
    const localized = translated(product, language);
    localized.contentLanguage = 'en';
    // IDs and provider references were never interface text.
    localized.id = product.id;
    localized.companyId = product.companyId;
    return localized;
  });
  if (language === 'ZH') assert.equal(stored.products[0].summary, '基于已授权企业文档，提供阿拉伯语和英语问答。');
  repository.api.save(stored);
  const loaded = json(repository.api.load());
  assert.deepEqual(loaded.products, seed.products, language + ' legacy field and long-prose substitutions are repaired');
  const before = repository.saves(), snapshot = JSON.stringify(loaded);
  assert.equal(JSON.stringify(repository.api.load()), snapshot, language + ' migration is idempotent');
  assert.equal(repository.saves(), before, language + ' stable loads do not rewrite storage');
}
const old = json(seed);
for (const product of old.products) {
  delete product.contentLanguage;
  delete product.productInfo;
  if (legacy.descriptions[product.id]) product.description = legacy.descriptions[product.id];
  else product.description = product.summary + ' This listing includes structured pricing, deployment, support and evidence fields so buyers can review the offer before contacting the provider.';
}
old.products = old.products.map(product => translated(translated(product, 'ZH'), 'SA'));
repository.api.save(old);
assert.deepEqual(json(repository.api.load()).products, seed.products, 'Old full descriptions and mixed language switches are repaired');
const edited = json(seed);
edited.products[0].summary = '采购团队自己撰写的中文原文。';
edited.products[0].description = legacy.descriptions[edited.products[0].id] + ' Our buyer added a custom scope and must retain it.';
delete edited.products[0].productInfo;
delete edited.products[0].contentLanguage;
edited.products[1].description = seed.products[1].description + '\n新增由企业提供的部署说明。';
edited.products[1].productInfo.useCases.push('企业新增的独立业务场景');
edited.products[2].summary = 'عميل يكتب وصفاً أصلياً بالعربية';
edited.products[2].contentLanguage = 'ar';
edited.products[3].sourceFile = 'provider-edited-contract.md';
edited.products[3].summary = '从合同中提取条款、义务和续约风险。';
edited.products[3].contentLanguage = 'zh';
edited.products.push({ id: 'prd-user-preserve', name: '用户上传的产品', summary: '基于已授权企业文档，提供阿拉伯语和英语问答。', description: '必须保留上传资料中的原始语言。', contentLanguage: 'zh', sourceFile: '中文原文.md', currency: 'USD' });
const expectedEdits = json(edited.products);
repository.api.save(edited);
assert.deepEqual(json(repository.api.load()).products, expectedEdits, 'Custom edits, legacy-prefix extensions, declared language and uploaded content remain unchanged');
assert.deepEqual(json(repository.api.reset()).products, seed.products, 'Reset restores canonical original copy');
assert.equal(repository.api.currency, 'USD');
assert.ok(!/SAR|ريال|里亚尔/.test(JSON.stringify(seed)), 'Current seed records and all their translations use USD only');
for (const product of seed.products) assert.equal(product.currency, 'USD');
for (const request of seed.requests) assert.equal(request.currency, 'USD');
for (const user of seed.users) assert.equal(user.preferredCurrency, 'USD');
for (const order of seed.orders) {
  assert.equal(order.currency, 'USD');
  assert.equal(order.subscriptionMonths, 1);
  assert.equal(order.subtotal, order.monthly);
  assert.equal(order.payment, undefined, 'Historical seed records have no fabricated payment evidence');
  assert.equal(order.total, repository.api.roundMoney(order.monthly + order.setup), order.id + ' line items add up');
}
const quote = repository.api.checkoutQuote;
assert.deepEqual(json(quote({ monthly: 1290, setup: 590, currency: 'USD' }, 3)), { monthly: 1290, months: 3, subtotal: 3870, setup: 590, total: 4460, currency: 'USD' });
assert.equal(quote({ monthly: 1290, setup: 590, currency: 'USD' }).total, 1880);
assert.equal(quote({ monthly: 1290, setup: 590, currency: 'USD' }, 36).total, 47030);
assert.deepEqual(json(quote({ monthly: '10.125', setup: '0.105', currency: 'USD' }, 3)), { monthly: 10.13, months: 3, subtotal: 30.39, setup: 0.11, total: 30.5, currency: 'USD' }, 'Decimal prices round once to cents before extending subscription line items');
assert.equal(quote({ monthly: 0, setup: 0, currency: 'USD' }, 36).total, 0, 'Free offers remain valid');
for (const months of [0, 37, -1, 1.5, '3', NaN, Infinity, null]) assert.throws(() => quote(seed.products[0], months), /integer from 1 to 36/);
for (const field of ['monthly', 'setup']) {
  for (const value of [-1, '', '  ', null, undefined, NaN, Infinity, true, {}, []]) assert.throws(() => quote({ monthly: 10, setup: 5, currency: 'USD', [field]: value }), /Invalid/);
}
for (const product of [null, { monthly: 1, setup: 1 }, { monthly: 1, setup: 1, currency: 'EUR' }]) assert.throws(() => quote(product), /confirmed USD/);
assert.throws(() => quote({ monthly: Number.MAX_SAFE_INTEGER, setup: 0, currency: 'USD' }), /supported amount/);
assert.throws(() => quote({ monthly: 90071992547400, setup: 0, currency: 'USD' }, 36), /supported amount/);
assert.equal(seed.deals[0].quote.firstMonth, seed.deals[0].quote.monthly + seed.deals[0].quote.setup);
assert.equal(seed.orders.filter(order => order.sellerUserId === 'USR-SELL-001').reduce((sum, order) => sum + order.total, 0), 3200, 'Seller seeded analytics are consistent');
const oldPrices = [[4600, 3000], [5200, 4200], [3900, 2400], [2800, 1800], [6100, 3500], [3200, 1500], [4400, 2100], [5100, 2600], [900, 0], [7800, 1200]];
const currencyRepository = createRepository(), oldCurrency = json(seed);
delete oldCurrency.meta.currencyVersion;
delete oldCurrency.meta.currency;
oldCurrency.products.forEach((product, i) => { [product.monthly, product.setup] = oldPrices[i]; delete product.currency; });
oldCurrency.orders.forEach(order => {
  const index = oldCurrency.products.findIndex(product => product.id === order.productId);
  order.monthly = oldPrices[index][0];
  order.setup = order.setup === 0 ? 0 : oldPrices[index][1];
  order.total = order.monthly + order.setup;
  delete order.subtotal;
  delete order.subscriptionMonths;
  order.currency = 'SAR';
});
[[5000, 8000], [4000, 7000], [4500, 7000], [5000, 8000]].forEach((caps, i) => { [oldCurrency.requests[i].monthlyCap, oldCurrency.requests[i].firstMonthCap] = caps; delete oldCurrency.requests[i].currency; });
Object.assign(oldCurrency.deals[0].quote, { monthly: 4600, setup: 3000, firstMonth: 7600, currency: 'SAR' });
const legacyBuyerText = 'الحد الأقصى للشهر الأول هو 8,000 ريال سعودي. هل يمكن أن نبدأ بدون تكامل مخصص؟';
const legacySellerText = 'Yes. We can start with manual document uploads. Setup is SAR 3,000 and monthly is SAR 4,600.';
Object.assign(oldCurrency.conversations[0].messages[0], { original: legacyBuyerText, translations: { EN: 'First-month cap is SAR 8,000. Can we start without a custom integration?', ZH: '首月预算上限是 8,000 SAR。我们可以先不做定制集成吗？' } });
Object.assign(oldCurrency.conversations[0].messages[1], { original: legacySellerText, translations: { ZH: '可以。我们可以先手动上传文档，实施费 3,000 SAR，月费 4,600 SAR。', SA: 'نعم. يمكننا البدء برفع المستندات يدوياً. الإعداد 3,000 SAR والشهري 4,600 SAR.' } });
oldCurrency.products[0].productInfo.pricingNotes = 'Illustrative listing price: SAR 4,600 per month plus SAR 3,000 one-time setup; tax treatment and final pilot scope are confirmed in the quote.';
oldCurrency.orders.push({ id: 'ORD-009', productId: seed.products[0].id, monthly: 4600, setup: 3000, total: 7600, currency: 'SAR', nextStep: 'An independently written business next step' });
oldCurrency.orders.push({ id: 'ORD-CUSTOM', productId: 'prd-user-legacy', monthly: 333.33, setup: 100, total: 433.33, currency: 'SAR', title: 'Custom original agreement SAR 433.33' });
oldCurrency.orders.push({ id: 'ORD-MULTI-SEED', productId: seed.products[0].id, monthly: 4600, subscriptionMonths: 3, subtotal: 13800, setup: 3000, total: 16800, currency: 'SAR' });
oldCurrency.orders.push({ id: 'ORD-MULTI-CUSTOM', productId: 'prd-user-legacy', monthly: 333.33, subscriptionMonths: 3, subtotal: 999.99, setup: 100, total: 1099.99, currency: 'SAR' });
oldCurrency.orders.push({ id: 'ORD-MULTI-NONSTANDARD', productId: 'prd-user-legacy', monthly: 333.33, subscriptionMonths: 3, setup: 100, total: 433.33, currency: 'SAR' });
oldCurrency.orders.push({ id: 'ORD-MULTI-USD', productId: 'prd-user-usd', monthly: 123.45, subscriptionMonths: 3, subtotal: 370.35, setup: 20, total: 390.35, currency: 'USD', payment: { mode: 'demo', method: 'visa', status: 'succeeded', paidAt: '2026-10-23T00:00:00Z', transactionId: 'demo-existing-payment' }, checkoutId: 'checkout-existing', selfPurchaseDemo: true });
oldCurrency.products.push({ id: 'prd-user-legacy', monthly: 333.33, setup: 100, currency: 'SAR', description: '企业原文 SAR 333.33，不能擅自改写。', sourceFile: 'original.md' });
oldCurrency.products.push({ id: 'prd-user-usd', monthly: 123.45, setup: 20, currency: 'USD', description: 'USD original copy' });
oldCurrency.products.push({ id: 'prd-user-unknown', monthly: 5000, setup: 1000, currency: 'XYZ', description: 'Unconfirmed original quote' });
oldCurrency.products.push({ id: 'prd-user-eur', monthly: 100, setup: 20, currency: 'EUR', description: 'Original EUR source document' });
oldCurrency.products.push({ id: 'prd-user-no-currency', monthly: 375, setup: 75, description: 'A product from the old currency-less publisher' });
oldCurrency.conversations[0].messages.push({ id: 'MSG-CUSTOM', original: 'My independent SAR 999 contract message stays original.', senderId: 'USR-BUY-001', translations: { ZH: '独立历史商务消息。' } });
oldCurrency.revenueReports.push({ id: 'REV-CUSTOM', result: { markdown: 'Historical SAR 4600 revenue snapshot.' } });
currencyRepository.api.save(oldCurrency);
const migrated = json(currencyRepository.api.load());
assert.equal(migrated.meta.currencyVersion, 1);
assert.equal(migrated.meta.currency, 'USD');
migrated.products.slice(0, 10).forEach((product, i) => {
  assert.equal(product.monthly, seed.products[i].monthly, product.id + ' gets a new dollar price rather than a relabel');
  assert.equal(product.setup, seed.products[i].setup);
  assert.equal(product.currency, 'USD');
  assert.equal(product.currencyMigration.originalAmounts.monthly, oldPrices[i][0]);
});
migrated.orders.forEach(order => assert.equal(order.currency, 'USD'));
assert.equal(migrated.orders[1].setup, 0, 'Renewals retain zero setup');
assert.equal(migrated.orders.find(order => order.id === 'ORD-009').total, 2000, 'Orders generated from old seeded prices are repriced consistently');
assert.equal(migrated.orders.find(order => order.id === 'ORD-009').nextStep, 'An independently written business next step');
assert.equal(migrated.orders.find(order => order.id === 'ORD-009').subscriptionMonths, 1, 'Historic orders default to one month');
assert.equal(migrated.orders.find(order => order.id === 'ORD-009').payment, undefined, 'Loading old orders never fabricates payment');
const seededMulti = migrated.orders.find(order => order.id === 'ORD-MULTI-SEED');
assert.deepEqual([seededMulti.monthly, seededMulti.subscriptionMonths, seededMulti.subtotal, seededMulti.setup, seededMulti.total], [1200, 3, 3600, 800, 4400], 'Multi-month seed repricing charges setup once');
const customMulti = migrated.orders.find(order => order.id === 'ORD-MULTI-CUSTOM');
assert.deepEqual([customMulti.monthly, customMulti.subtotal, customMulti.setup, customMulti.total], [88.89, 266.67, 26.67, 293.34], 'Multi-month fixed conversion reconciles rounded line items');
assert.equal(customMulti.currencyMigration.originalAmounts.subtotal, 999.99);
assert.equal(migrated.orders.find(order => order.id === 'ORD-MULTI-NONSTANDARD').total, 115.55, 'An original nonstandard multi-month total is not overwritten with a one-month formula');
assert.deepEqual(migrated.orders.find(order => order.id === 'ORD-MULTI-USD'), oldCurrency.orders.find(order => order.id === 'ORD-MULTI-USD'), 'Current USD checkout snapshots and demo payment evidence remain unchanged');
const customProduct = migrated.products.find(product => product.id === 'prd-user-legacy');
assert.equal(customProduct.monthly, 88.89, 'Custom legacy prices convert numerically to cents');
assert.equal(customProduct.setup, 26.67);
assert.equal(customProduct.description, '企业原文 SAR 333.33，不能擅自改写。', 'Currency migration keeps independent source prose');
const customOrder = migrated.orders.find(order => order.id === 'ORD-CUSTOM');
assert.equal(customOrder.total, 115.56, 'Rounded order total reconciles with its rounded line items');
assert.equal(customOrder.total, currencyRepository.api.roundMoney(customOrder.monthly + customOrder.setup));
assert.equal(customOrder.title, 'Custom original agreement SAR 433.33');
assert.equal(migrated.products.find(product => product.id === 'prd-user-usd').monthly, 123.45, 'Explicit USD records are never converted again');
assert.equal(migrated.products.find(product => product.id === 'prd-user-unknown').monthly, null, 'An unsupported currency is not relabeled as a USD amount');
assert.equal(migrated.products.find(product => product.id === 'prd-user-unknown').currencyMigration.originalAmounts.monthly, 5000);
assert.equal(migrated.products.find(product => product.id === 'prd-user-eur').monthly, 108, 'Supported historic non-USD currency has an explicit numerical conversion');
assert.equal(migrated.products.find(product => product.id === 'prd-user-no-currency').monthly, 100, 'Currency-less products from a pre-upgrade browser migrate as legacy amounts');
assert.deepEqual(migrated.conversations[0].messages.slice(0, 2), seed.conversations[0].messages.slice(0, 2), 'Known seed originals and saved translations migrate together');
assert.equal(migrated.conversations[0].messages.at(-1).original, 'My independent SAR 999 contract message stays original.');
assert.equal(migrated.products[0].productInfo.pricingNotes, seed.products[0].productInfo.pricingNotes);
assert.equal(migrated.deals[0].quote.firstMonth, 2000);
assert.equal(migrated.requests[0].monthlyCap, 1400);
assert.equal(migrated.requests[0].firstMonthCap, 2200);
assert.equal(migrated.revenueReports[0].status, 'Archived');
const migratedSnapshot = JSON.stringify(migrated), saveCount = currencyRepository.saves();
assert.equal(JSON.stringify(currencyRepository.api.load()), migratedSnapshot, 'Currency migration is idempotent');
assert.equal(currencyRepository.saves(), saveCount, 'Reload does not rewrite an already-migrated database');
const afterUpgrade = json(migrated);
afterUpgrade.products.push({ id: 'prd-user-new-usd', monthly: 149, setup: 39, description: 'New product entered after the USD upgrade' });
currencyRepository.api.save(afterUpgrade);
assert.equal(currencyRepository.api.load().products.find(product => product.id === 'prd-user-new-usd').monthly, 149, 'A new currency-less record after the upgrade defaults to USD without conversion');
const labels = currencyRepository.api.orderText;
for (const field of ['status', 'nextStep']) {
  for (const value of new Set(seed.orders.map(order => order[field]).concat(field === 'status' ? ['Placed', 'Cancelled', 'Refunded', 'Unknown'] : ['Awaiting provider scope confirmation']))) {
    for (const code of ['ZH', 'SA']) {
      const localized = labels(value, field, code);
      assert.notEqual(localized, value, field + ' localizes ' + value + ' in ' + code);
      assert.equal(labels(localized, field, 'EN'), value, field + ' localized full labels round trip');
    }
  }
}
assert.equal(labels('待复核 monthly usage', 'nextStep', 'ZH'), '查看月度使用情况');
assert.equal(labels('待复核 monthly usage', 'nextStep', 'SA'), 'مراجعة الاستخدام الشهري');
assert.equal(labels('客户指定的处理步骤', 'nextStep', 'EN'), '客户指定的处理步骤', 'Unknown business text is never partially translated');
assert.equal(labels('My custom Completed milestone', 'status', 'ZH'), 'My custom Completed milestone');
console.log('Product source language, USD seed arithmetic, old-price migration, idempotence, provider-copy preservation and order localization checks passed.');
