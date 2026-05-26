# UTCC AIoT Sphere Architecture

## Vision
UTCC AIoT Sphere is a scalable enterprise SaaS ecosystem for AI/IoT education, gamified learning, event orchestration, analytics, and membership services. The architecture is built to support rapid expansion, internationalization, AI agent integration, and enterprise-grade security.

## Core Principles
- Modular monorepo structure with separate web, admin, shared UI, and domain packages
- Clean architecture with explicit data contracts and strict TypeScript typing
- Firebase-first backend for authentication, realtime data, storage, and serverless business logic
- AI-ready services prepared for RAG, vector search, and LangChain-style orchestration
- Mobile-first responsive UX with futuristic premium design system
- RBAC and audit logging enforced at both client and Firestore security layers

## System Layers
1. **Presentation**
   - `apps/web` for public and member-facing experiences
   - `apps/admin` for staff/administrator workflows and analytics
   - Shared UI components under `packages/ui`
2. **Domain Contracts**
   - Strong shared types in `packages/types`
   - Validation schemas using Zod centralized in `packages/lib`
3. **Service Layer**
   - Firebase services in `packages/lib`
   - Analytics and AI utility foundations in `packages/analytics` and `packages/ai`
4. **Data Layer**
   - Firestore collections optimized for query scalability and index efficiency
   - Storage for media assets and certificate artifacts
   - Functions for secure server-side operations, certificate generation, payment processing, and AI insight generation

## Firestore Architecture
Collections are designed for high-cardinality queries and strong access control:
- `users`
- `activities`
- `activity_categories`
- `sub_courses`
- `registrations`
- `attendance`
- `badges`
- `achievements`
- `leaderboards`
- `certificates`
- `payments`
- `royalty_points`
- `analytics`
- `ai_insights`
- `notifications`
- `staff_logs`
- `system_settings`
- `landing_pages`
- `media_assets`

## Security
- RBAC model with roles: `member`, `staff`, `administrator`
- Firestore rules validate document ownership and role-based permissions
- Sensitive operations proxied through Firebase Functions
- Rate limiting and audit logs enforced server-side
- XSS-safe UI patterns and strict content validation on user-generated fields

## Scalability
- Collection-level design avoids deeply nested documents for query efficiency
- Data partitioning via category, season, and activity status fields
- Use of expandable subcollections and composite indexes for leaderboard and attendance queries
- Stateless frontend with cache-aware TanStack Query and session persistence
- Firebase Functions as isolated business logic for certificate generation, payment verification, and analytics ingestion

## AI & Analytics Readiness
- AI service layer supports OpenAI and LangChain-compatible vector retrieval
- `ai_insights` collection stores agent-generated recommendations, summaries, and forecast signals
- Analytics foundation supports marketing funnels, engagement metrics, retention forecasts, and revenue attribution
- Future support for multi-agent workflows, memory stores, and personalized recommendation engines

## Future Extensibility
- Add new activity types (e.g. `hackathon`, `lab_training`) using the same activity domain model
- Extend loyalty engine to support digital merch, scholarship rewards, and partner benefits
- Integrate third-party identity proofing (e.g. face verification, mobile OTP providers) through modular auth adapters
- Add additional locales with `next-intl` and structured content in `messages/`
