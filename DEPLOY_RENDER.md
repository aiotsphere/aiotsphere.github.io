# Deploy AIoT Sphere Laboratory To Render

GitHub Pages cannot run this app because the project uses:

- Next.js API routes
- Authentication cookies
- Admin-only API routes
- Local JSON file storage with Node.js `fs`
- Check-in and activity-code APIs

Use Render as a Node.js server with Docker and a persistent disk.

## Quick Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/aiotsphere/aiotsphere.github.io)

## Steps

1. Sign in to Render.
2. Click **New**.
3. Choose **Blueprint**.
4. Select repository `aiotsphere/aiotsphere.github.io`.
5. Render will read `render.yaml`.
6. Confirm the service.
7. Keep the disk mounted at `/app/data`.
8. Deploy.

## Important

The persistent disk is required because registrations, users, progress, activity codes, and check-ins are stored in JSON files under `/app/data`.

Without a persistent disk, file changes can disappear after redeploys or restarts.

## Admin Emails

Admin access is controlled by:

- `data/adminEmails.json`
- `ADMIN_EMAILS` environment variable on Render

The default value in `render.yaml` is:

```txt
aiotsphere@utcc.ac.th
```

To add more admins in Render, edit the `ADMIN_EMAILS` environment variable:

```txt
aiotsphere@utcc.ac.th,another-admin@utcc.ac.th
```
