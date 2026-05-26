# UTCC AIoT Sphere Firestore Schema

## Collections and Document Contracts

### `users`
- `email`: string
- `displayName`: string
- `role`: `member | staff | administrator`
- `locale`: `en | th | zh`
- `xp`: number
- `level`: number
- `loyaltyPoints`: number
- `badges`: string[]
- `devices`: [{ deviceId, userAgent, lastSeenAt }]
- `createdAt`, `updatedAt`

### `activities`
- `categoryId`: document id from `activity_categories`
- `type`: `camp | seminar | challenge | event`
- `slug`: string
- `title`: string
- `description`: string
- `status`: `draft | published | archived`
- `startDate`, `endDate`, `registrationDeadline`
- `capacity`: number
- `waitlistEnabled`: boolean
- `mentors`: embedded list of mentor profiles
- `seo`: structured SEO metadata

### `activity_categories`
- `name`: string
- `slug`: string
- `description`: string
- `icon`: string
- `createdAt`, `updatedAt`

### `sub_courses`
- `activityId`: string
- `title`: string
- `capacity`: number
- `schedule`: array of session ranges
- `mentorIds`: string[]
- `priceCents`: number
- `customFields`: dynamic form configuration

### `registrations`
- `activityId`: string
- `userId`: string
- `subCourseIds`: string[]
- `participantType`: Student/Teacher/Parent/Custom
- `institution`: string
- `status`: `pending | confirmed | cancelled | waitlisted`

### `attendance`
- `activityId`: string
- `userId`: string
- `sessionId`: string
- `status`: `checked-in | checked-out | absent | late`
- `checkInAt`, `checkOutAt`
- `deviceFingerprint`: string
- `location`: geo coordinates

### `badges`
- `key`: string
- `title`: string
- `criteria`: string
- `xpReward`: number

### `achievements`
- `userId`: string
- `badgeId`: string
- `awardedAt`: timestamp

### `leaderboards`
- `userId`: string
- `seasonId`: string
- `category`: string
- `rank`: number
- `xp`: number

### `certificates`
- `userId`: string
- `activityId`: string
- `registrationId`: string
- `status`: `issued | revoked | expired`
- `pdfUrl`: string
- `qrCodeUrl`: string

### `payments`
- `amountCents`: number
- `currency`: `THB | USD | CNY`
- `method`: `promptpay | manual | wallet`
- `status`: `pending | paid | failed | refunded`

### `analytics`
- `eventType`: string
- `category`: string
- `label`: string
- `metadata`: object

### `ai_insights`
- `source`: `marketing | event | engagement | revenue`
- `summary`: string
- `recommendations`: string[]

### `notifications`
- `userId`: string
- `title`: string
- `body`: string
- `type`: `system | activity | reminder | reward`
- `read`: boolean

### `staff_logs`
- `userId`: string
- `action`: string
- `entity`: string
- `details`: string

### `system_settings`
- `key`: string
- `value`: string | number | boolean | object

### `landing_pages`
- `slug`: string
- `title`: string
- `sections`: list of structured content blocks
- `seo`: Open Graph and schema metadata

### `media_assets`
- `storagePath`: string
- `publicUrl`: string
- `contentType`: string

## Index Recommendations
- `registrations` by `activityId`, `userId`, `status`
- `attendance` by `activityId`, `sessionId`, `status`
- `leaderboards` by `seasonId`, `category`, `rank`
- `certificates` by `userId`, `activityId`
- `payments` by `userId`, `activityId`, `status`
- `analytics` by `eventType`, `category`, `createdAt`
- `ai_insights` by `source`, `generatedAt`

## Security Strategy
- Use strong RBAC with `users.role`
- Enforce create/update permissions in Firestore rules
- Prevent cross-role writes through function wrappers for trusted operations
- Use audit logs for staff and admin activity
