# Free Deployment With Supabase + Vercel

This project can run for free on:

- Vercel Hobby for the Next.js app and API routes
- Supabase Free for database storage

GitHub Pages cannot run this app because GitHub Pages does not run Next.js API routes.

## 1. Create Supabase Project

1. Open Supabase.
2. Create a new project.
3. Go to **SQL Editor**.
4. Run the SQL in `supabase/schema.sql`.

## 2. Get Supabase Keys

In Supabase:

1. Go to **Project Settings**.
2. Go to **API**.
3. Copy:
   - Project URL
   - `service_role` key

Keep the service role key private. Do not expose it in client-side code.

## 3. Deploy To Vercel

1. Open Vercel.
2. Import repository `aiotsphere/aiotsphere.github.io`.
3. Framework preset: **Next.js**.
4. Add environment variables:

```txt
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAILS=aiotsphere@utcc.ac.th
```

5. Deploy.

## 4. Admin Emails

Admin access comes from:

- Supabase table `app_admin_emails`
- `ADMIN_EMAILS` env variable

Multiple env emails can be comma-separated:

```txt
aiotsphere@utcc.ac.th,another-admin@utcc.ac.th
```

## Local Development

If Supabase env variables are not set, the app falls back to local JSON files under `data/`.
