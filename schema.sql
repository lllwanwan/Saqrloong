-- Saqrloong repository schema. The GitHub Pages build uses data.js/localStorage;
-- this schema is ready for a hosted Postgres adapter when a backend is added.
create table companies (
  id text primary key,
  name text not null,
  country text not null,
  city text not null,
  verified boolean not null default false,
  description text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  website text
);
create table users (
  id text primary key,
  name text not null,
  email text not null unique,
  phone text,
  country text,
  city text,
  address text,
  postal_code text,
  company text,
  tax_id text,
  preferred_currency text not null default 'USD' check (preferred_currency = 'USD'),
  password_hash text,
  role text not null default 'buyer' check (role in ('buyer','seller')),
  company_id text references companies(id),
  created_at timestamptz not null default now()
);
create table products (
  id text primary key,
  company_id text not null references companies(id),
  name text not null,
  category text not null,
  summary text not null,
  description text not null,
  content_language text,
  product_info jsonb,
  currency text not null default 'USD' check (currency = 'USD'),
  monthly_usd numeric(14,2) not null,
  setup_usd numeric(14,2) not null,
  languages jsonb not null,
  deployment jsonb not null,
  capabilities jsonb not null,
  tags jsonb not null default '[]'::jsonb,
  evidence_score integer not null check (evidence_score between 0 and 100),
  contact_user_id text references users(id),
  status text not null default 'published'
);
create table requests (
  id text primary key,
  owner_name text not null,
  title text not null,
  need text not null,
  users_count integer not null,
  languages jsonb not null,
  deployment text not null,
  currency text not null default 'USD' check (currency = 'USD'),
  monthly_cap_usd numeric(14,2) not null,
  first_month_cap_usd numeric(14,2) not null,
  status text not null,
  created_at date not null
);
create table request_products (
  request_id text not null references requests(id),
  product_id text not null references products(id),
  primary key (request_id, product_id)
);
create table evaluations (
  id text primary key,
  request_id text not null references requests(id),
  status text not null,
  method text not null,
  recommendation_product_id text references products(id),
  report jsonb not null,
  created_at date not null
);
create table deals (
  id text primary key,
  request_id text not null references requests(id),
  product_id text not null references products(id),
  quote_version text not null,
  currency text not null default 'USD' check (currency = 'USD'),
  monthly_usd numeric(14,2) not null,
  setup_usd numeric(14,2) not null,
  first_month_usd numeric(14,2) not null,
  scope jsonb not null,
  exclusions jsonb not null,
  provider_approved_at timestamptz,
  requester_approved_at timestamptz
);
create table deal_messages (
  id bigserial primary key,
  deal_id text not null references deals(id),
  side text not null check (side in ('requester','provider')),
  language text not null,
  original_text text not null,
  translation_text text,
  created_at timestamptz not null default now()
);
create table pilots (
  id text primary key,
  request_id text not null references requests(id),
  deal_id text not null references deals(id),
  status text not null,
  tasks jsonb not null
);

create table orders (
  id text primary key,
  publisher_user_id text not null references users(id),
  seller_user_id text not null references users(id),
  buyer_user_id text not null references users(id),
  product_id text not null references products(id),
  status text not null,
  ordered_at date not null,
  currency text not null default 'USD' check (currency = 'USD'),
  monthly_usd numeric(14,2) not null default 0 check (monthly_usd >= 0),
  subscription_months integer not null default 1 check (subscription_months between 1 and 36),
  subtotal_usd numeric(14,2) not null default 0 check (subtotal_usd >= 0),
  setup_usd numeric(14,2) not null default 0 check (setup_usd >= 0),
  total_usd numeric(14,2) not null default 0 check (total_usd >= 0),
  checkout_id text unique,
  self_purchase_demo boolean not null default false,
  -- Optional simulation evidence only; legacy orders have no payment record.
  -- {mode: 'demo', method: 'alipay'|'visa'|'paypal', status: 'succeeded', paidAt, transactionId}
  payment jsonb,
  next_step text
);
create table conversations (
  id text primary key,
  order_id text references orders(id),
  participant_ids jsonb not null
);
create table conversation_messages (
  id text primary key,
  conversation_id text not null references conversations(id),
  sender_user_id text not null references users(id),
  language text not null,
  original_text text not null,
  translations jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table revenue_reports (
  id text primary key,
  seller_user_id text not null references users(id),
  provider text not null,
  report_markdown text not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table agent_documents (
  id text primary key,
  name text not null,
  markdown text not null,
  created_at timestamptz not null default now()
);
