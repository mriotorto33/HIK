# ── Stage 1: install deps ────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev=false   # need devDeps for build

# ── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Bake NEXT_PUBLIC_ vars into the bundle at build time
ARG NEXT_PUBLIC_BACKEND_URL=https://hik-backend-805730087505.us-east4.run.app
ARG NEXT_PUBLIC_POSTHOG_KEY=phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs
ARG NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: minimal runtime ─────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run expects port 8080; Next.js standalone honours the PORT env var
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# standalone/ contains a self-contained server.js + all required node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static     ./.next/static
COPY --from=builder /app/public           ./public

EXPOSE 8080

CMD ["node", "server.js"]
