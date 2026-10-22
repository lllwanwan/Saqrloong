/* Simulated checkout regression. Never calls a model or a payment provider.
 * NODE_PATH=/tmp/saqrloong-tools/node_modules BASE_URL=http://127.0.0.1:4186 CHROMIUM_PATH=/snap/bin/chromium node tests/checkout-ui.cjs
 */
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4186';
let checks = 0;
const check = (condition, label) => { assert.ok(condition, label); checks++; };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/snap/bin/chromium', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage(), errors = [], outbound = [];
    page.on('pageerror', error => errors.push(error.message));
    await context.route('**/*', route => {
      const request = route.request(), url = new URL(request.url());
      if (url.pathname.endsWith('/config.json')) return route.fulfill({ json: { api_configs: { gpt: { api_key: '', base_url: '', model: ['local'] } } } });
      if (request.method() !== 'GET' || /\/chat\/completions|\/responses\b/.test(url.pathname)) { outbound.push(url.origin + url.pathname); return route.abort(); }
      if (url.origin !== new URL(base).origin) return route.abort();
      return route.continue();
    });
    await page.goto(base);
    const go = route => page.evaluate(route => navigate(route), route);
    const language = code => page.click(`[data-lang="${code}"]`);
    const account = async id => {
      await page.evaluate(id => localStorage.setItem('saqrloong-user', JSON.stringify(db.users.find(user => user.id === id))), id);
      await page.reload();
      await page.waitForFunction(id => state.user?.id === id, id);
    };
    const orderCount = () => page.evaluate(() => SaqrDB.load().orders.length);
    const openProduct = async id => {
      await go('catalog');
      await page.evaluate(id => { state.productModal = id; render(); }, id);
    };
    const start = async (id, months = 3) => {
      await openProduct(id);
      await page.click('#productModal [data-action="place-order"]');
      await page.waitForSelector('#checkoutForm');
      await page.fill('#checkoutMonths', String(months));
      await page.locator('#checkoutMonths').dispatchEvent('change');
    };
    const continuePayment = async () => {
      await page.locator('#checkoutForm').evaluate(form => form.requestSubmit());
      await page.waitForSelector('#paymentForm');
    };
    const total = async amount => {
      const text = await page.locator('[data-checkout-total],#checkoutTotal').first().innerText();
      check(text.includes('USD') && text.replace(/,/g, '').includes(String(amount)), `Correct USD total: ${amount}`);
      check(!/SAR|CNY|AED|ر\.س/.test(await page.locator('#pageWrap').innerText()), 'Checkout contains no retired currency');
    };
    const fit = async label => {
      const layout = await page.locator('#pageWrap').evaluate(node => ({ width: node.clientWidth, scroll: node.scrollWidth, viewport: innerWidth, doc: document.documentElement.scrollWidth, items: [...node.querySelectorAll('.checkout-card,.checkout-summary,.payment-method,.checkout-success')].map(item => ({ width: item.clientWidth, scroll: item.scrollWidth, left: item.getBoundingClientRect().left, right: item.getBoundingClientRect().right })) }));
      check(layout.scroll <= layout.width + 1 && layout.doc <= layout.viewport + 1, label + ' has no horizontal page overflow');
      check(layout.items.every(item => item.scroll <= item.width + 1 && item.left >= -1 && item.right <= layout.viewport + 1), label + ' cards and payment controls fit');
    };
    const pay = async method => {
      await page.check(`[name="paymentMethod"][value="${method}"]`);
      await page.locator('#paymentForm').evaluate(form => form.requestSubmit());
      await page.waitForSelector('[data-payment-state="processing"]');
    };
    const finish = async (before, expected) => {
      await page.waitForSelector('[data-payment-state="success"]');
      check(await orderCount() === before + 1, 'A successful simulated payment persists exactly one order');
      const id = await page.locator('[data-paid-order-id]').first().getAttribute('data-paid-order-id');
      const order = await page.evaluate(id => SaqrDB.load().orders.find(order => order.id === id), id);
      check(!!order, 'Success links to a persisted order');
      check(order.total === expected && order.currency === 'USD', 'Paid order stores the full subscription total in USD');
      check(order.payment?.mode === 'demo', 'Paid order explicitly records simulated payment mode');
      return order;
    };

    // Publish through the actual form, then purchase the product from its own account.
    await account('USR-SELL-001');
    await language('ZH'); await go('catalog');
    await page.click('[data-action="publish-product"]');
    const fields = {
      publishName: 'Checkout Demo Knowledge Agent', publishSummary: 'A detailed searchable knowledge assistant for demonstration.',
      publishDescription: '## Product introduction\nThis demonstration assistant searches approved internal documents, cites sources and helps customer support teams prepare accurate replies.\n\n## Deployment\nRun in a private cloud with controlled access and human review.',
      publishMonthly: '1290', publishSetup: '590', publishLanguages: 'English, Arabic', publishDeployment: 'Private cloud',
      publishEmail: 'checkout-demo@example.test', publishCountry: 'Saudi Arabia', publishCity: 'Riyadh'
    };
    for (const [id, value] of Object.entries(fields)) await page.fill('#' + id, value);
    await page.locator('#publishForm').evaluate(form => form.requestSubmit());
    await page.waitForSelector('#publishForm', { state: 'detached' });
    const product = await page.evaluate(() => db.products.find(product => product.name === 'Checkout Demo Knowledge Agent'));
    check(!!product && product.publisherUserId === 'USR-SELL-001', 'Actual publish form creates an own product');
    await openProduct(product.id);
    const ownAction = page.locator('#productModal [data-action="place-order"]');
    check(await ownAction.getAttribute('data-self-purchase') === 'true', 'Own product exposes the explicit demonstration purchase action');
    check((await ownAction.innerText()).includes('演示下单'), 'Own product action explains demonstration purchase');
    const initial = await orderCount();
    await ownAction.click(); await page.waitForSelector('#checkoutForm');
    check(await page.inputValue('#checkoutMonths') === '1', 'Subscription defaults to one month');
    await total(1880);
    for (const invalid of ['0', '37']) {
      await page.fill('#checkoutMonths', invalid);
      await page.locator('#checkoutForm').evaluate(form => form.requestSubmit());
      check(await page.locator('#checkoutForm').count() === 1, `Month value ${invalid} cannot proceed`);
    }
    await page.fill('#checkoutMonths', '3'); await page.locator('#checkoutMonths').dispatchEvent('change'); await total(4460);
    await go('catalog');
    check(await orderCount() === initial, 'Leaving checkout creates no unpaid order');

    // Nine combinations exercise all payment methods and every supported UI language.
    for (const code of ['EN', 'ZH', 'SA']) {
      await language(code);
      for (const method of ['alipay', 'visa', 'paypal']) {
        await start(product.id, 3);
        await total(4460);
        check((await page.locator('.checkout-demo-note').allTextContents()).some(text => /demo|simulat|演示|模拟|تجريب|محاكا/i.test(text)), `${code} clearly labels the simulated purchase`);
        await fit(`${code} checkout desktop`);
        if (method === 'alipay') {
          for (const width of [390, 320]) {
            await page.setViewportSize({ width, height: 844 });
            await fit(`${code} ${width}px checkout`);
          }
          await page.setViewportSize({ width: 1440, height: 1000 });
        }
        await continuePayment();
        check(await page.locator('[name="paymentMethod"]').count() === 3, `${code} offers Alipay, Visa and PayPal`);
        check(await page.locator('input[type="password"],input[autocomplete="cc-number"],input[autocomplete="cc-csc"],iframe').count() === 0, 'Demonstration asks for no payment secrets');
        await total(4460); await fit(`${code} payment desktop`);
        const before = await orderCount();
        await pay(method);
        check(await orderCount() === before, 'Processing has not prematurely created an order');
        check(await page.locator('#payButton').isDisabled(), 'Processing disables the payment button');
        check(await page.locator('[name="paymentMethod"]:not(:disabled)').count() === 0, 'Processing locks payment method selection');
        await page.evaluate(() => { const form = document.querySelector('#paymentForm'); form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); });
        const order = await finish(before, 4460);
        check(order.selfPurchaseDemo === true && order.buyerUserId === 'USR-SELL-001' && order.sellerUserId === 'USR-SELL-001', 'Own purchase is labelled as a self-purchase demonstration');
        check(order.months === 3 || order.subscriptionMonths === 3, 'Paid order records three subscription months');
        check(order.payment?.method === method, 'Paid order records the selected payment method');
        await fit(`${code} payment success`);
        await page.reload(); await page.waitForSelector('[data-payment-state="success"]');
        check(await orderCount() === before + 1, 'Success survives refresh without a duplicate order');
        await page.click('[data-action="view-paid-order"]');
        await page.waitForSelector(`[data-order-id="${order.id}"]`);
        check((await page.locator(`[data-order-id="${order.id}"]`).innerText()).includes('USD 4,460'), 'Paid-order action opens the order with the correct amount');
      }
    }

    // Incomplete payment is safe to refresh and remains private to the current account.
    await language('EN');
    await start(product.id, 2); await continuePayment();
    await page.check('[name="paymentMethod"][value="paypal"]');
    const pending = await orderCount();
    await page.reload(); await page.waitForSelector('#paymentForm');
    await total(3170);
    check(await page.isChecked('[name="paymentMethod"][value="paypal"]'), 'Unpaid refresh preserves the chosen method');
    check(await orderCount() === pending, 'Unpaid refresh does not create an order');
    await pay('paypal');
    await page.reload(); await page.waitForSelector('#paymentForm');
    check(await orderCount() === pending, 'Refreshing processing cancels completion and creates no hidden order');
    await account('USR-BUY-001');
    check(await page.locator('#paymentForm').count() === 0, 'A second account cannot access the first account checkout');
    check(!(await page.locator('#pageWrap').innerText()).includes(product.name), 'A second account is not shown the previous checkout details');
    check(await orderCount() === pending, 'Account switching cannot complete another account payment');
    await account('USR-SELL-001'); await go('payment');
    await page.waitForSelector('#paymentForm'); await total(3170);

    // Compact Arabic layouts include the full method selection and success state.
    await language('SA');
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await fit(`Arabic ${width}px payment`);
      check(await page.locator('html').getAttribute('dir') === 'rtl', 'Arabic checkout uses RTL direction');
    }
    await page.setViewportSize({ width: 390, height: 844 });
    const beforeMobile = await orderCount();
    await pay('alipay'); await finish(beforeMobile, 3170); await fit('Arabic mobile success');

    // A normal buyer can purchase a provider product with the same pricing rules.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await account('USR-BUY-001'); await language('EN');
    await start('prd-nura-knowledge', 3); await total(4400); await continuePayment();
    const beforeBuyer = await orderCount();
    await pay('visa'); const normal = await finish(beforeBuyer, 4400);
    check(normal.buyerUserId === 'USR-BUY-001' && normal.sellerUserId === 'USR-SELL-001' && normal.selfPurchaseDemo !== true, 'Regular purchase retains distinct buyer and provider');
    assert.deepEqual(errors, [], 'No browser exceptions');
    assert.deepEqual(outbound, [], 'No live model or payment network request was attempted');
    console.log(`PASS: ${checks} simulated checkout checks; actual own-product publication, three languages, three methods, price validation, duplicate prevention, reload, account isolation and mobile RTL. No live model or payment calls.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
