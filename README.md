# UTCC AIoT Sphere Monorepo

Enterprise-grade monorepo scaffold for the UTCC AIoT Sphere platform.

## Structure
- `apps/web` — Public and member-facing Next.js app
- `apps/admin` — Staff and administrator dashboard
- `packages/ui` — Shared UI component system
- `packages/types` — Domain contract definitions and Firestore schema models
- `packages/lib` — Firebase client utilities and shared helpers
- `packages/config` — Runtime configuration layer
- `packages/analytics` — Analytics event helpers
- `packages/ai` — AI integration payload contracts
- `firebase` — Firestore rules, storage rules, and Firebase Functions scaffold
- `docs` — Architecture and Firestore schema documentation
- `scripts` — Seed and deployment helper scripts

## Key capabilities
- Modular workspace architecture using npm workspaces
- Strict TypeScript and reusable package design
- Firebase security rules and serverless function scaffolding
- Next.js App Router with dark-mode-first premium UI theme
- AI analytics and RAG-ready foundation
- Multi-language readiness using `next-intl`

## Local setup
```bash
cd starter-template
npm install
npm run dev:web
```

## Build and lint
```bash
npm run build
npm run lint
```

## Firebase emulation and serverless development
```bash
cd firebase/functions
npm install
npm run serve
```

## Next steps
1. Implement i18n content under `messages/`
2. Add `apps/web` and `apps/admin` page routes for core sections
3. Add Firebase auth adapters, QR attendance workflows, and certificate rendering
4. Configure GitHub Actions for CI/CD
5. Add production environment variables and deploy to Firebase Hosting / Vercel
