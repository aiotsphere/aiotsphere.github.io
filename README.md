# AIoT Sphere Laboratory

Static GitHub Pages build for **AIoT Sphere Laboratory** and **AI Builder Camp 2026**.

## Deployment

This project is configured for GitHub Pages.

- Push to `main`
- GitHub Actions builds a static Next.js export
- The generated `out` folder is deployed by `actions/deploy-pages`

## Firestore Storage

The website uses Firebase Auth and Firestore from the browser, so it can run on GitHub Pages without a custom server.

Required GitHub repository secrets:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Enable Email/Password sign-in in Firebase Authentication, create a Firestore database, and publish the rules in `firestore.rules`.

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

Admin access is restricted by email in `lib/clientStore.ts` and `firestore.rules`.
