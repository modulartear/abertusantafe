-- Ejecutar este archivo en Supabase > SQL Editor.
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null default 'ventanas',
  tags text[] not null default '{}',
  price numeric(12, 2) not null default 0,
  old_price numeric(12, 2),
  description text not null default '',
  delivery_info text not null default 'Retiro en local o envío a coordinar',
  promo_text text,
  image_url text,
  image_urls text[] not null default '{}',
  badge text,
  published boolean not null default true,
  stock integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  business_name text not null default 'Santa Fe Aberturas',
  theme text not null default 'modern',
  brands_enabled boolean not null default true,
  logo_url text,
  phone text,
  whatsapp text,
  email text,
  address text,
  schedule text,
  hero_badge text default 'Nuevo stock',
  hero_title text default 'Santa Fe Aberturas',
  hero_subtitle text default 'La abertura que estás buscando, lista para transformar tu espacio.',
  hero_image_url text,
  contact_title text default 'Consultá por medidas, stock y formas de pago.',
  contact_subtitle text default 'Te respondemos con opciones disponibles en el local.',
  primary_color text default '#0054d6',
  secondary_color text default '#003f9f',
  accent_color text default '#f7941d',
  danger_color text default '#e5342f',
  updated_at timestamptz not null default now()
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null default '#productos',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  customer_address text,
  delivery_method text not null default 'A coordinar',
  notes text,
  total numeric(12, 2) not null default 0,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  product_id text,
  product_name text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(12, 2) not null default 0
);

alter table public.products add column if not exists category_id uuid references public.categories(id) on delete set null;
alter table public.products add column if not exists brand_id uuid references public.brands(id) on delete set null;
alter table public.products add column if not exists delivery_info text not null default 'Retiro en local o envío a coordinar';
alter table public.products add column if not exists promo_text text;
alter table public.site_settings add column if not exists primary_color text default '#0054d6';
alter table public.site_settings add column if not exists theme text not null default 'modern';
alter table public.site_settings add column if not exists brands_enabled boolean not null default true;
alter table public.site_settings add column if not exists secondary_color text default '#003f9f';
alter table public.site_settings add column if not exists accent_color text default '#f7941d';
alter table public.site_settings add column if not exists danger_color text default '#e5342f';

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor')); $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.site_settings enable row level security;
alter table public.navigation_items enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.profiles enable row level security;

insert into public.categories (name, slug, sort_order) values
  ('Ventanas', 'ventanas', 1), ('Puertas', 'puertas', 2), ('Aluminio', 'aluminio', 3),
  ('PVC', 'pvc', 4), ('Madera', 'madera', 5), ('Baño', 'bano', 6), ('Outlet', 'outlet', 7)
on conflict (slug) do nothing;

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

insert into public.navigation_items (label, href, sort_order)
select seed.label, seed.href, seed.sort_order
from (values ('Inicio', '#inicio', 1), ('Productos', '#productos', 2), ('Contacto', '#contacto', 3)) as seed(label, href, sort_order)
where not exists (select 1 from public.navigation_items existing where existing.label = seed.label and existing.href = seed.href);

drop policy if exists "published products are public" on public.products;
create policy "published products are public" on public.products for select using (published = true or public.is_staff());

drop policy if exists "staff can manage products" on public.products;
create policy "staff can manage products" on public.products for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "active categories are public" on public.categories;
create policy "active categories are public" on public.categories for select using (active = true or public.is_staff());

drop policy if exists "staff can manage categories" on public.categories;
create policy "staff can manage categories" on public.categories for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "active brands are public" on public.brands;
create policy "active brands are public" on public.brands for select using (active = true or public.is_staff());

drop policy if exists "staff can manage brands" on public.brands;
create policy "staff can manage brands" on public.brands for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "site settings are public" on public.site_settings;
create policy "site settings are public" on public.site_settings for select using (true);

drop policy if exists "staff can manage site settings" on public.site_settings;
create policy "staff can manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "active navigation is public" on public.navigation_items;
create policy "active navigation is public" on public.navigation_items for select using (active = true or public.is_staff());

drop policy if exists "staff can manage navigation" on public.navigation_items;
create policy "staff can manage navigation" on public.navigation_items for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "anyone can create quotes" on public.quotes;
create policy "anyone can create quotes" on public.quotes for insert with check (true);

drop policy if exists "staff can manage quotes" on public.quotes;
create policy "staff can manage quotes" on public.quotes for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "anyone can add quote items" on public.quote_items;
create policy "anyone can add quote items" on public.quote_items for insert with check (true);

drop policy if exists "staff can manage quote items" on public.quote_items;
create policy "staff can manage quote items" on public.quote_items for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());

drop policy if exists "admins can manage profiles" on public.profiles;
create policy "admins can manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles (id, email, full_name) values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', '')); return new; end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Storage para las imágenes del catálogo.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('brand-assets', 'brand-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "public can view product images" on storage.objects;
create policy "public can view product images" on storage.objects for select using (bucket_id = 'product-images');

drop policy if exists "staff can upload product images" on storage.objects;
create policy "staff can upload product images" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "staff can update product images" on storage.objects;
create policy "staff can update product images" on storage.objects for update using (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "staff can delete product images" on storage.objects;
create policy "staff can delete product images" on storage.objects for delete using (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "public can view site assets" on storage.objects;
create policy "public can view site assets" on storage.objects for select using (bucket_id = 'site-assets');

drop policy if exists "staff can upload site assets" on storage.objects;
create policy "staff can upload site assets" on storage.objects for insert with check (bucket_id = 'site-assets' and public.is_staff());

drop policy if exists "staff can update site assets" on storage.objects;
create policy "staff can update site assets" on storage.objects for update using (bucket_id = 'site-assets' and public.is_staff());

drop policy if exists "public can view brand assets" on storage.objects;
create policy "public can view brand assets" on storage.objects for select using (bucket_id = 'brand-assets');

drop policy if exists "staff can upload brand assets" on storage.objects;
create policy "staff can upload brand assets" on storage.objects for insert with check (bucket_id = 'brand-assets' and public.is_staff());

drop policy if exists "staff can update brand assets" on storage.objects;
create policy "staff can update brand assets" on storage.objects for update using (bucket_id = 'brand-assets' and public.is_staff());

alter table public.products add column if not exists image_urls text[] not null default '{}';
