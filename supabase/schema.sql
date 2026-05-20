create table if not exists public.app_users (
  id text primary key,
  user_id text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  password_hash text not null,
  school text not null,
  education_level text not null,
  interested_track text not null,
  discord_username text not null,
  status text not null default 'pending',
  role text not null default 'student',
  created_at timestamptz not null
);

create table if not exists public.app_progress (
  user_id text not null,
  track_id text not null,
  completed_activity_ids jsonb not null default '[]'::jsonb,
  xp integer not null default 0,
  updated_at timestamptz not null,
  primary key (user_id, track_id)
);

create table if not exists public.app_activity_codes (
  id text primary key,
  code text not null unique,
  activity_id text not null,
  track_id text not null,
  created_by text not null,
  expires_at timestamptz not null,
  max_uses integer not null,
  used_count integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null
);

create table if not exists public.app_checkins (
  id text primary key,
  user_id text not null,
  activity_id text not null,
  code text not null,
  track_id text not null,
  created_at timestamptz not null,
  unique (user_id, activity_id)
);

create table if not exists public.app_admin_emails (
  email text primary key
);

insert into public.app_admin_emails (email)
values ('aiotsphere@utcc.ac.th')
on conflict (email) do nothing;
