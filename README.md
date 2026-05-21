# AIoT Sphere Laboratory

Static GitHub Pages build for **AIoT Sphere Laboratory** and **AI Builder Camp 2026**.

## Deployment

This project is configured for GitHub Pages only.

- Push to `main`
- GitHub Actions runs lint and static export
- The generated `out` folder is deployed by `actions/deploy-pages`

## Runtime Storage

Because GitHub Pages cannot run a server or database, membership, camp registration, admin codes, and badge progress use browser `localStorage`.

That means the full demo system works on GitHub Pages without Supabase or Vercel, but data is stored per browser/device.

## Stack

- Next.js static export
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React
- Sonner

## Main Routes

- `/`
- `/about`
- `/administrators`
- `/camp`
- `/camp/ai-builder-camp`
- `/camp/register`
- `/camp/login`
- `/camp/checkin`
- `/camp/progress`
- `/admin`

Admin access is determined client-side by the configured admin email in `lib/clientStore.ts`.
