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
  image_url text,
  image_urls text[] not null default '{}',
  badge text,
  published boolean not null default true,
  stock integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor')); $$;

alter table public.products enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "published products are public" on public.products;
create policy "published products are public" on public.products for select using (published = true or public.is_staff());

drop policy if exists "staff can manage products" on public.products;
create policy "staff can manage products" on public.products for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile" on public.profiles for select using (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', '')); return new; end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Storage para las imágenes del catálogo.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public can view product images" on storage.objects;
create policy "public can view product images" on storage.objects for select using (bucket_id = 'product-images');

drop policy if exists "staff can upload product images" on storage.objects;
create policy "staff can upload product images" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "staff can update product images" on storage.objects;
create policy "staff can update product images" on storage.objects for update using (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "staff can delete product images" on storage.objects;
create policy "staff can delete product images" on storage.objects for delete using (bucket_id = 'product-images' and public.is_staff());

alter table public.products add column if not exists image_urls text[] not null default '{}';
