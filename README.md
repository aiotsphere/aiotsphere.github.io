# AIoT Sphere Laboratory

Futuristic bilingual laboratory platform for **AIoT Sphere Laboratory, University of the Thai Chamber of Commerce**.

AI Builder Camp 2026 is included as a subproject under AIoT Sphere Lab.

## Stack

- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React
- Sonner
- Supabase database storage in production
- Local JSON file storage fallback for development
- QR generation with `qrcode`

## Free Deployment

GitHub Pages cannot run this project because it uses Next.js API routes and authentication.

Use **Vercel Hobby + Supabase Free** for a free deployment:

- `.github/workflows/build-check.yml` for lint/build validation
- `supabase/schema.sql` for database setup
- `DEPLOY_FREE_SUPABASE_VERCEL.md` for step-by-step deployment

If Supabase environment variables are missing, the app falls back to local JSON files for development.

## Local Storage Files

Local development fallback files:

- `data/users.json`
- `data/progress.json`
- `data/activityCodes.json`
- `data/checkins.json`
- `data/adminEmails.json`

## Routes

- `/` AIoT Sphere Laboratory home
- `/about`
- `/administrators`
- `/ai-builder-camp`
- `/activities`
- `/progress`
- `/checkin`
- `/login`
- `/register`
- `/dashboard`
- `/admin`

Admin access is controlled by `ADMIN_EMAILS` and the Supabase table `app_admin_emails`.
