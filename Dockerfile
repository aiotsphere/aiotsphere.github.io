FROM node:20-alpine AS base
WORKDIR /workspace
COPY package.json package-lock.json* ./
COPY tsconfig.base.json .
COPY apps/web/package.json apps/web/package.json
COPY apps/admin/package.json apps/admin/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/lib/package.json packages/lib/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/analytics/package.json packages/analytics/package.json
COPY packages/ai/package.json packages/ai/package.json
RUN npm install

FROM base AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /workspace
COPY --from=build /workspace/apps/web/.next ./apps/web/.next
COPY --from=build /workspace/apps/web/public ./apps/web/public
COPY --from=build /workspace/apps/web/package.json ./apps/web/package.json
EXPOSE 3000
CMD ["npm", "--workspace", "@aiotsphere/web", "start"]
