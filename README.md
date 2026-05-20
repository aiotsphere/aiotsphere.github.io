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
- Local JSON file storage with Node.js `fs`
- QR generation with `qrcode`

## Deployment

GitHub Pages cannot run this project because it uses Next.js API routes, authentication, and Node.js file storage.

Deploy it as a Node.js server. The repository includes:

- `Dockerfile` for production server deployment
- `render.yaml` for Render deployment with a persistent disk mounted at `/app/data`
- `.github/workflows/build-check.yml` for lint/build validation

For full functionality, deploy to a Node host such as Render, Railway, Fly.io, a VPS, or another platform that supports persistent disk storage.

### Deploy To Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/aiotsphere/aiotsphere.github.io)

Recommended setup:

1. Open the Deploy to Render button above.
2. Sign in to Render.
3. Connect the GitHub repository `aiotsphere/aiotsphere.github.io`.
4. Confirm the Blueprint from `render.yaml`.
5. Keep the persistent disk mounted at `/app/data`.
6. Deploy.

After deployment, use the Render service URL as the live application URL.

## Local Storage Files

Data is stored locally only:

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

Only emails listed in `data/adminEmails.json` or `ADMIN_EMAILS` can access the admin dashboard.
