create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  supplier_url text not null,
  price_cny numeric not null,
  weight_kg numeric,
  category text,
  image_url text,
  qc_count integer default 0,
  rating numeric default 0,
  status text default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists affiliate_sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  domain text,
  affiliate_id text not null,
  link_template text not null,
  logo_url text,
  active boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists shipping_rates (
  id uuid primary key default gen_random_uuid(),
  affiliate_site_id uuid references affiliate_sites(id) on delete cascade,
  price_per_kg_eur numeric not null,
  price_per_kg_usd numeric,
  active boolean default true,
  updated_at timestamp with time zone default now()
);

create table if not exists exchange_rates (
  id uuid primary key default gen_random_uuid(),
  base_currency text not null,
  target_currency text not null,
  rate numeric not null,
  updated_at timestamp with time zone default now(),
  unique(base_currency, target_currency)
);

create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  affiliate_site_id uuid references affiliate_sites(id) on delete cascade,
  clicked_at timestamp with time zone default now(),
  user_country text,
  user_device text,
  user_browser text,
  referrer text,
  landing_page text,
  ip_hash text,
  user_agent text
);

create index if not exists affiliate_clicks_product_id_idx on affiliate_clicks(product_id);
create index if not exists affiliate_clicks_site_id_idx on affiliate_clicks(affiliate_site_id);
create index if not exists affiliate_clicks_clicked_at_idx on affiliate_clicks(clicked_at);

insert into products (title, slug, supplier_url, price_cny, weight_kg, category, image_url, qc_count, rating, status)
values
('Yeezy Slides Budget', 'yeezy-slides-budget', 'https://detail.1688.com/offer/demo.html', 68, 0.7, 'Slides', '/uploads/placeholder-product.svg', 9, 4.8, 'published'),
('Nike Tech Fleece Black', 'nike-tech-fleece-black', 'https://detail.1688.com/offer/demo2.html', 168, 0.85, 'Hoodies', '/uploads/placeholder-product.svg', 14, 4.9, 'published')
on conflict (slug) do nothing;

insert into affiliate_sites (name, slug, domain, affiliate_id, link_template, logo_url, active, sort_order)
values
('CNFans', 'cnfans', 'cnfans.com', 'TON_ID_CNFANS', 'https://cnfans.com/product?url={PRODUCT_URL}&ref={AFFILIATE_ID}', '/logos/placeholder-logo.svg', true, 1),
('Kakobuy', 'kakobuy', 'kakobuy.com', 'TON_ID_KAKOBUY', 'https://kakobuy.com/item?url={PRODUCT_URL}&aff={AFFILIATE_ID}', '/logos/placeholder-logo.svg', true, 2)
on conflict (slug) do nothing;

insert into shipping_rates (affiliate_site_id, price_per_kg_eur, price_per_kg_usd)
select id, 11.90, 12.95 from affiliate_sites where slug = 'cnfans'
on conflict do nothing;

insert into shipping_rates (affiliate_site_id, price_per_kg_eur, price_per_kg_usd)
select id, 12.50, 13.60 from affiliate_sites where slug = 'kakobuy'
on conflict do nothing;

insert into exchange_rates (base_currency, target_currency, rate)
values
('CNY', 'EUR', 0.128),
('CNY', 'USD', 0.139)
on conflict (base_currency, target_currency) do update set rate = excluded.rate, updated_at = now();

-- Stats utiles
-- Clics par site
-- select affiliate_sites.name, count(*) as total_clicks
-- from affiliate_clicks
-- join affiliate_sites on affiliate_clicks.affiliate_site_id = affiliate_sites.id
-- group by affiliate_sites.name
-- order by total_clicks desc;

-- Clics par article
-- select products.title, count(*) as total_clicks
-- from affiliate_clicks
-- join products on affiliate_clicks.product_id = products.id
-- group by products.title
-- order by total_clicks desc;
