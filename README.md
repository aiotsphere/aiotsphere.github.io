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
