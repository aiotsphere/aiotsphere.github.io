# AI Builder Camp 2026

A modern event registration platform for **AI Builder Camp 2026: Pathway to AI Engineer** built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, Supabase Auth/PostgreSQL, and Lucide Icons.

## Features

- Futuristic AI education landing page with animated neon background and responsive mobile menu
- Public registration form that writes directly to Supabase PostgreSQL without Auth signup rate limits
- Supabase email/password login for admins
- Admin dashboard with analytics cards, animated track chart, search, track filter, status badges, and CSV export
- Zod + React Hook Form validation, loading states, and toast notifications
- RLS-ready Supabase schema in `supabase/schema.sql`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
copy .env.example .env.local
```

3. Fill in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. In Supabase SQL Editor, run:

```sql
-- paste the contents of supabase/schema.sql
```

5. Create an auth user for the admin account, then promote the user for admin access:

```sql
insert into public.admin_users (user_id)
values ('replace-with-auth-user-id');
```

6. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` landing page
- `/register` registration form
- `/login` login form
- `/dashboard` protected participant dashboard for legacy/auth users
- `/admin` protected admin dashboard for users listed in `admin_users`
