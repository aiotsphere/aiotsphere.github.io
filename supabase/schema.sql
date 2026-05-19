create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  school text not null,
  education_level text not null,
  interested_track text not null check (
    interested_track in ('ai-creator', 'ai-builder', 'aiot-innovator', 'ai-business')
  ),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'waitlist')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id),
  unique (email)
);

alter table public.registrations
drop column if exists discord_username;

alter table public.registrations
alter column user_id drop not null;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_registrations_updated_at on public.registrations;
create trigger set_registrations_updated_at
before update on public.registrations
for each row execute function public.set_updated_at();

alter table public.registrations enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Anyone can submit registration" on public.registrations;
drop policy if exists "Users can insert own registration" on public.registrations;
drop policy if exists "Users can read own registration" on public.registrations;
drop policy if exists "Admins can read registrations" on public.registrations;
drop policy if exists "Admins can update registrations" on public.registrations;
drop policy if exists "Admins can read admin allowlist" on public.admin_users;

create policy "Anyone can submit registration"
on public.registrations for insert
to anon, authenticated
with check (true);

create policy "Users can insert own registration"
on public.registrations for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Admins can read registrations"
on public.registrations for select
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "Admins can update registrations"
on public.registrations for update
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "Admins can read admin allowlist"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

-- After creating your admin account in Supabase Auth, promote it with:
-- insert into public.admin_users (user_id)
-- values ('00000000-0000-0000-0000-000000000000');
