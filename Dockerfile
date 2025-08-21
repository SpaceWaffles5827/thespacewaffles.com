# --- Builder Stage ---

FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm

RUN npm install -g pnpm

# Copy manifests

COPY package.json pnpm-lock.yaml* ./

# Install dependencies (frozen lockfile ensures reproducibility)

RUN pnpm install --frozen-lockfile

# Copy rest of app

COPY . .

# Build Next.js

RUN pnpm run build

# --- Runner Stage ---

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV production

ENV PORT 3000

# Copy only the built artifacts + node_modules from builder

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public ./public

COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000

CMD ["pnpm", "start"]


