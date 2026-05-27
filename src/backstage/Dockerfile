# Build the frontend app
FROM node:22-bullseye AS app-builder
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/
COPY packages/ packages/
COPY tsconfig.json backstage.json ./
COPY app-config.yaml app-config.production.yaml ./

RUN corepack enable
RUN yarn install
RUN yarn workspace @tfm/app build

# Runtime image
FROM node:22-bullseye-slim
WORKDIR /app

COPY --from=app-builder /app /app

EXPOSE 7007

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7007/healthcheck', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

ENV NODE_ENV=development

CMD ["yarn", "tsx", "packages/backend/src/index.ts"]