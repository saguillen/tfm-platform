# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --network-timeout 100000

# Copy source
COPY . .

# Build
RUN yarn build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production --network-timeout 100000

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7007', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000 7007


# Run Backstage
CMD ["node", "dist/index.js"]
