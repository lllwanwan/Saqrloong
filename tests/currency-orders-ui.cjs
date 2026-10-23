/* Currency, order-localization and product-action regressions. No live model calls.
 * BASE_URL=http://127.0.0.1:4186 CHROMIUM_PATH=/snap/bin/chromium node tests/currency-orders-ui.cjs
 */
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4186';
let checks = 0;
const check = (condition, label) => { assert.ok(condition, label); checks++; };
const titles = {
  EN: { orders: 'Purchase orders', 'sales-orders': 'Sales orders' },
  ZH: { orders: '购买订单', 'sales-orders': '销售订单' },
  SA: { orders: 'طلبات الشراء', 'sales-orders': 'طلبات البيع' }
};
const localized = (value, language, label) => {
  check(value.trim().length > 0, label + ' is present');
  if (language === 'ZH') {
    check(/\p{Script=Han}/u.test(value), label + ' contains Chinese');
    check(!/[A-Za-z\p{Script=Arabic}]/u.test(value), label + ' has no untranslated English or Arabic');
  } else if (language === 'SA') {
    check(/\p{Script=Arabic}/u.test(value), label + ' contains Arabic');
    check(!/[A-Za-z\p{Script=Han}]/u.test(value), label + ' has no untranslated English or Chinese');
  } else check(!/[\p{Script=Han}\p{Script=Arabic}]/u.test(value), label + ' remains English');
};
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/snap/bin/chromium', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage(), errors = [], modelRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    await context.route('**/*', route => {
      const request = route.request(), url = new URL(request.url());
      if (url.pathname.endsWith('/config.json')) return route.fulfill({ json: { api_configs: { gpt: { api_key: '', base_url: '', model: ['local'] } } } });
      if (request.method() !== 'GET' || /\/chat\/completions|\/responses\b/.test(url.pathname)) { modelRequests.push(url.origin + url.pathname); return route.abort(); }
      if (url.origin !== new URL(base).origin) return route.abort();
      return route.continue();
    });
    await page.goto(base);
    const go = route => page.evaluate(route => navigate(route), route);
    const language = code => page.click(`[data-lang="${code}"]`);
    const useAccount = id => page.evaluate(id => {
      state.user = { ...db.users.find(user => user.id === id) };
      state.authenticated = true;
      localStorage.setItem('saqrloong-user', JSON.stringify(state.user));
      state.productModal = null;
      state.publishModal = false;
    }, id);
    const seed = await page.evaluate(() => ({ orders: db.orders.map(order => ({ ...order, productName: SaqrDB.product(order.productId, db)?.name })), users: db.users.map(user => ({ id: user.id, name: user.name })) }));
    check(seed.orders.length >= 8, 'All seeded order cases are available');
    check(seed.orders.every(order => order.currency === 'USD'), 'All seeded orders declare USD');
    const nura = seed.orders.find(order => order.id === 'ORD-001');
    check(nura.monthly === 1200 && nura.setup === 800 && nura.total === 2000, 'Nura demo uses the deliberate USD price, not a currency-label swap');
    const checkOrderPage = async (route, code, rows) => {
      check(await page.locator('.page-header h1').innerText() === titles[code][route], `${code} ${route} page heading`);
      check(await page.locator('.screen-card .section-header h2').innerText() === titles[code][route], `${code} ${route} section heading`);
      localized(await page.locator('.screen-card .section-header .eyebrow').innerText(), code, `${code} order ledger heading`);
      check(await page.locator('[data-order-id]').count() === rows.length, `${code} ${route} contains exactly the account's orders`);
      for (const order of rows) {
        const row = page.locator(`[data-order-id="${order.id}"]`), label = `${code} ${route} ${order.id}`;
        const status = await row.locator('.order-status').innerText(), next = await row.locator('.order-next-step').innerText();
        localized(status, code, label + ' status'); localized(next, code, label + ' next step');
        if (code === 'EN') { check(status === order.status, label + ' exact original status'); check(next === order.nextStep, label + ' exact original next step'); }
        check(await row.locator('.order-product-link').innerText() === order.productName, label + ' preserves the product name');
        const other = seed.users.find(user => user.id === (route === 'sales-orders' ? order.buyerUserId : order.sellerUserId));
        check((await row.innerText()).includes(other.name), label + ' preserves the counterparty name');
        check((await row.locator(':scope > strong').last().innerText()) === `USD ${Number(order.total).toLocaleString('en-US')}`, label + ' displays the correct USD amount');
      }
    };
    // Every seeded next step is exercised in both its buyer's and seller's ledger.
    for (const route of ['orders', 'sales-orders']) {
      const ownerField = route === 'orders' ? 'buyerUserId' : 'sellerUserId';
      for (const account of [...new Set(seed.orders.map(order => order[ownerField]))]) {
        await useAccount(account);
        for (const code of ['EN', 'ZH', 'SA']) { await language(code); await go(route); await checkOrderPage(route, code, seed.orders.filter(order => order[ownerField] === account)); }
      }
    }
    await useAccount(nura.buyerUserId);
    const assertUSD = async label => {
      const text = await page.locator('#pageWrap').innerText();
      check(!/\b(?:SAR|CNY|AED)\b|ر\.س|ريال|人民币/.test(text), label + ' has no retired currency');
      check(/\bUSD\b|\$|美元|دولار/.test(text), label + ' shows US dollars');
    };
    for (const code of ['EN', 'ZH', 'SA']) {
      await language(code);
      for (const route of ['catalog', 'orders', 'revenue']) { await go(route); await assertUSD(`${code} ${route}`); }
      await go('profile');
      const currencies = await page.locator('#profileCurrency option').allTextContents();
      check(currencies.length === 1 && currencies[0].includes('USD'), code + ' profile only offers the supported USD currency');
      await go('catalog');
      await page.locator('[data-action="publish-product"]').click();
      const priceLabels = await page.locator('label[for="publishMonthly"],label[for="publishSetup"]').allTextContents();
      check(priceLabels.length === 2 && priceLabels.every(text => /USD|美元|دولار/.test(text)), code + ' publishing price fields use dollars');
      await page.locator('#publishModal .modal-close').click();
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 844 });
        await page.evaluate(() => { state.productModal = 'prd-nura-knowledge'; render(); });
        const actions = page.locator('#productModal .product-modal-actions');
        const layout = await actions.evaluate(node => {
          const intro = document.querySelector('#productModal .product-introduction'), details = document.querySelector('#productModal .product-rich-info'), modal = node.closest('.modal-card');
          return { afterIntro: !!(intro.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING), beforeDetails: !!(node.compareDocumentPosition(details) & Node.DOCUMENT_POSITION_FOLLOWING), width: node.clientWidth, scroll: node.scrollWidth, modalWidth: modal.clientWidth, modalScroll: modal.scrollWidth, buttons: [...node.querySelectorAll('button')].map(button => ({ action: button.dataset.action, width: button.clientWidth, scroll: button.scrollWidth, left: button.getBoundingClientRect().left, right: button.getBoundingClientRect().right })) };
        });
        check(layout.afterIntro && layout.beforeDetails, `${code}/${width} actions sit between the introduction and detailed information`);
        check(layout.buttons.map(button => button.action).join(',') === 'contact-seller,place-order', `${code}/${width} has contact and order actions`);
        check(await page.locator('#productModal > .modal-card > .modal-close[data-action="close-product"]').count() === 1, `${code}/${width} has a separate dialog close action`);
        for (const [index, text] of (await actions.locator('button').allTextContents()).entries()) localized(text, code, `${code}/${width} product action ${index + 1}`);
        check(layout.scroll <= layout.width + 1 && layout.modalScroll <= layout.modalWidth + 1, `${code}/${width} product actions and dialog do not overflow`);
        check(layout.buttons.every(button => button.scroll <= button.width + 1 && button.left >= 0 && button.right <= width), `${code}/${width} every action fits its responsive layout`);
        await assertUSD(`${code}/${width} product details`);
        await page.locator('#productModal > .modal-card > .modal-close[data-action="close-product"]').click();
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    // A real product action must persist a USD order and localize on both sides.
    await language('EN'); await go('catalog');
    await page.evaluate(() => { state.productModal = 'prd-nura-knowledge'; render(); });
    const countBeforePayment = await page.evaluate(() => db.orders.length);
    await page.locator('#productModal [data-action="place-order"]').click();
    await page.waitForSelector('#checkoutForm');
    check(await page.evaluate(() => state.screen) === 'checkout', 'Purchase action opens checkout');
    check(await page.inputValue('#checkoutMonths') === '1', 'Checkout defaults to one subscription month');
    check(await page.evaluate(() => db.orders.length) === countBeforePayment, 'Checkout has not created an unpaid order');
    await page.locator('#checkoutForm').evaluate(form => form.requestSubmit());
    await page.waitForSelector('#paymentForm');
    check(await page.evaluate(() => db.orders.length) === countBeforePayment, 'Payment selection has not created an unpaid order');
    await page.check('input[name="paymentMethod"][value="visa"]');
    await page.locator('#paymentForm').evaluate(form => form.requestSubmit());
    await page.waitForSelector('[data-payment-state="processing"]');
    check(await page.evaluate(() => db.orders.length) === countBeforePayment, 'Processing has not yet persisted an order');
    await page.waitForSelector('[data-payment-state="success"]');
    check(await page.evaluate(() => db.orders.length) === countBeforePayment + 1, 'Successful demonstration payment creates exactly one order');
    const created = await page.evaluate(() => ({ ...db.orders[0], productName: SaqrDB.product(db.orders[0].productId, db).name }));
    check(created.currency === 'USD' && created.monthly === 1200 && created.setup === 800 && created.total === 2000, 'New purchase order records the intended USD price');
    check(created.status === 'Placed' && created.nextStep === 'Awaiting provider scope confirmation', 'New order uses its initial workflow state');
    await page.click('[data-action="view-paid-order"]');
    await page.waitForSelector(`[data-order-id="${created.id}"]`);
    await page.reload();
    check(await page.evaluate(id => SaqrDB.load().orders.find(order => order.id === id)?.currency, created.id) === 'USD', 'New USD order survives reload');
    for (const route of ['orders', 'sales-orders']) {
      await useAccount(route === 'orders' ? created.buyerUserId : created.sellerUserId);
      for (const code of ['EN', 'ZH', 'SA']) {
        await language(code); await go(route);
        const row = page.locator(`[data-order-id="${created.id}"]`);
        localized(await row.locator('.order-status').innerText(), code, `${code} new ${route} status`);
        localized(await row.locator('.order-next-step').innerText(), code, `${code} new ${route} next step`);
        check(await row.locator('.order-product-link').innerText() === created.productName, `${code} new ${route} preserves product name`);
        check((await row.innerText()).includes('USD 2,000'), `${code} new ${route} displays USD 2,000`);
      }
    }
    assert.deepEqual(errors, [], 'No browser exceptions');
    assert.deepEqual(modelRequests, [], 'No live model request was attempted');
    console.log(`PASS: ${checks} currency/order checks; all ${seed.orders.length} seed orders in both ledgers, three languages, new purchase persistence and responsive product actions. No live model calls.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
