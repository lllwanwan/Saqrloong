# Saqrloong ai marketplace

Saqrloong is a static GitHub Pages marketplace for discovering AI products, discussing requirements with an assistant, contacting providers and tracking orders through delivery.

## Run locally

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>. The first screen is local workspace authentication. Email verification is intentionally omitted for this repository; the identity is stored in browser `localStorage`.

For an optional model connection, copy `config.example.json` to `config.json` and fill in your local settings. `config.json` is ignored by Git so API credentials stay on your machine. The application also runs without it, using the local record tools and document fallback.

## Routes

- `#/login` and `#/register`
- `#/overview`
- `#/catalog`
- `#/sourcing`
- `#/procurement`
- `#/buyer-agent`
- `#/seller-agent`
- `#/guide-agent`
- `#/messages`
- `#/warehouse`
- `#/orders` (purchase orders)
- `#/sales-orders` (sales orders)
- `#/checkout`, `#/payment` and `#/order-success` (simulated checkout flow)
- `#/revenue` (data analytics only)
- `#/profile`
- `#/settings`

## Repository and agents

- `schema.sql` defines the relational repository model for companies, users, products, requests, evaluations, orders, conversations and pilots.
- `data.js` defines the seeded repository entities: eight providers, ten products, users, requests, evaluations, orders and conversations. Products include detailed introductions and structured product information. Existing browser records are enriched without resetting custom listings.
- `agents.js` defines Buyer Assistant, Seller Assistant, Workflow Assistant and automatic message translation prompts, tools, skills and JSON contracts. Seller Assistant reads warehouse, sales and competitor records; Buyer Assistant discusses needs and reads purchases; Workflow Assistant explains marketplace operations.
- `app.js` connects routes, repository records, automatic incoming-message translation and UI actions.
- `workflow-ui.js` implements the dedicated procurement/seller conversations, record navigation and dual-path product publishing. Markdown is rendered with local Marked and sanitized with DOMPurify.

The buyer and seller sections each start with a dedicated assistant. The homepage bird opens Workflow Assistant. Each has a history sidebar with independent conversations stored in localStorage per user and assistant. New conversations preserve earlier chats, and the model supplies a title in its first response without a separate title request. Older sessionStorage histories are migrated. Interface language changes preserve conversations; product and order references open the actual record.

Requirements are discussed in the buyer conversation. Procurement overview explains needs, provider contact, commercial approval, purchase orders, delivery/acceptance and renewal. There is no separate requirement form or comparison-report workflow; old `requests`, `compare` and `evaluations` links open Buyer Assistant.

Incoming partner messages automatically appear in the current interface language. Stored translations are reused; missing translations call the configured model and are cached for the current page session. Sender-authored messages retain their original text. The received original is available in an expandable detail; no manual translation button is shown. If the model is unavailable, the original appears with a status message.

Provider-submitted product names, descriptions, summaries and detailed fields retain the original source language. Only interface labels are localized. Known legacy seed translations are repaired without replacing custom listings or provider edits.

`SaqrAgents.runWorkspaceAgent` uses a read-only tool loop with `get_orders`, `get_order_details`, `calculate_metrics`, `search_catalog` and `get_product_details`; seller conversations also have `inspect_inventory` and `search_competitors`. It reads the latest browser repository, keeps purchase and sales data scoped, and distinguishes recorded order values from payments. Role-specific skills and system prompts are in `agents.js`. No external ERP is connected.

## Product publishing demo

Click **Publish product**. The left side contains editable structured fields; the right side accepts a dropped or selected document. TXT, Markdown, JSON, text PDF and Word DOCX files up to 10 MB are supported. PDF and Word text is extracted locally, then sent to the currently configured model to generate an editable draft. Missing facts remain empty. Scanned image-only PDF OCR and legacy `.doc` files are not supported.

Use `DEMO_PRODUCT_BRIEF.md`, also available from the upload panel. It contains a detailed fictional product, explicit 1,290 USD monthly and 590 USD setup prices, 60 users, languages, deployment, contacts, deliverables and acceptance criteria. Review the generated fields and click Publish. The product is associated with the current provider and appears in their warehouse. Without a model connection, labeled documents and JSON still have a deterministic extraction fallback.

The model connection automatically reads the existing `config.json` model configuration. Settings saved in the browser override those defaults; assigning `window.SAQRLOONG_CONFIG` before loading `agents.js` takes highest priority:

```js
window.SAQRLOONG_CONFIG = {
  apiKey: "",
  endpoint: "https://api.openai.com/v1/chat/completions",
  model: "gpt-5.6-luna"
};
```

Without a model connection, the three workspace assistants use local records and document extraction uses its local fallback. Automatic message translation uses saved translations when available and otherwise shows the original with an availability status. With a connection, the configured chat endpoint supplies structured responses. A production deployment should proxy the request server-side so a secret is never exposed in a public GitHub Pages bundle.

## Seed accounts

All seeded passwords are `111111` and are checked at login:

- Buyer: `buyer@almanar.sa`
- Seller: `seller@nura.sa`
- Seller: `seller@hanriver.ai`
- Seller: `seller@dunetech.sa`
- Seller: `seller@latticeworks.cn`

## Checkout demo

Open a product and choose **Create purchase order** (or **Demo purchase** for your own product). Select an integer subscription period from 1 to 36 months. Checkout calculates the subscription subtotal as the USD monthly price multiplied by the number of months, then adds the setup fee once. For the uploaded demo product, three months cost `1,290 × 3 + 590 = 4,460 USD`.

Continue to the payment screen and choose Alipay, Visa or PayPal, then confirm the simulated payment. These are demo choices: no real charge occurs, no external payment provider is contacted, and no card number, password or payment credential is requested. The success screen links to the generated order. Trying your own listing also creates a simulated order and labels it as a self-purchase demo.

Orders retain the subscription months, monthly price, subscription subtotal, setup fee and total as checkout snapshots. Successful demo payments have an explicitly labeled `payment` record with `mode: "demo"`, method, status, timestamp and transaction ID. A unique `checkoutId` prevents repeated confirmations of the same checkout from creating duplicate orders. The eight historical seed orders default to one month and have no payment record; their booked values do not imply payment.

`SaqrDB.checkoutQuote(product, months = 1)` validates a confirmed USD price and an integer month count of 1–36, rounds prices to cents and returns `{monthly, months, subtotal, setup, total, currency}`. Missing, negative, non-finite or unsupported-currency prices throw an error. It calculates a quote only and never creates an order or payment.

## Workflow records

The seeded records include eight providers, ten products and eight orders. Older requirement, evaluation and quote records remain in browser storage for compatibility; the current interface uses conversational requirements and simulated product checkout. Commercial approval, real payment and acceptance remain between the buyer and provider; the checkout demo does not perform these real transactions.

All marketplace prices, budgets and order amounts use USD. Demo prices are illustrative, not converted live exchange-rate quotes. All pricing, company profiles and operational states are repository seed data for the product workspace. They are editable through the repository adapter and can be reset from the sidebar.

## Browser checks

The application itself needs no package installation. Tests use Node.js and Playwright:

```bash
npm install
# Start the static server in a separate terminal, then:
BASE_URL=http://127.0.0.1:4173 CHROMIUM_PATH=/snap/bin/chromium npm test
BASE_URL=http://127.0.0.1:4173 CHROMIUM_PATH=/snap/bin/chromium npm run test:english
```

Set `CHROMIUM_PATH` to an installed Chromium binary. The regression tests disable or intercept model requests and make no paid API calls. The locally vendored parser versions and licenses are documented in `vendor/README.md`.

`npm test` covers model configuration and permissions, conversation history, source-language migration, publishing, automatic translation and navigation. `npm run test:agents` runs the configuration and data-scope checks using Node.js alone, without a browser or API connection.

## Existing browser currency migration

The storage key is retained. On the first USD upgrade, unchanged seeded offers and matching generated orders receive the new USD demo prices; renewal orders keep zero setup. Other old numeric amounts use a fixed illustrative rate (3.75 legacy Saudi riyals per USD), rounded to cents. Legacy AED, EUR, GBP and CNY amounts use explicitly recorded demo rates; an unsupported currency requires a fresh USD quote instead of relabeling the amount. Each migrated monetary record retains its original amounts, source currency, rate and policy in `currencyMigration`. Multi-month orders reconcile their subscription subtotal and total against the recorded month count, charging setup once; missing historical month counts default to one. Migration never fabricates payment evidence. The version marker and per-record USD currency make repeated loading safe.

Exact known seed messages, price notes and quotes are updated consistently; independently written product text and business messages remain original source records. Old generated analytics are archived for recalculation from USD orders. Existing assistant histories remain historical conversations; new calculations use current records. Uploaded non-USD prices are not automatically converted into a new listing.
