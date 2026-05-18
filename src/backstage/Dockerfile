# Stage 1 - Create yarn install skeleton layer
FROM node:20-alpine AS packages

WORKDIR /app
COPY backstage.json package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn/
COPY packages packages

# Find all package.json files in packages
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -exec rm -rf {} \+


# Stage 2 - Install dependencies and build packages
FROM node:20-alpine AS build

# Set Python interpreter for node-gyp to use
ENV PYTHON=/usr/bin/python3

# Install build dependencies
RUN apk add --no-cache python3 g++ make

USER node
WORKDIR /app

COPY --from=packages --chown=node:node /app .
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn install --immutable

COPY --chown=node:node . .

RUN yarn tsc
RUN yarn build:backend

RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar czf packages/backend/dist/skeleton.tar.gz -C packages/backend/dist skeleton \
    && tar czf packages/backend/dist/bundle.tar.gz -C packages/backend/dist bundle


# Stage 3 - Build the actual backend image and install production dependencies
FROM node:20-alpine

# Set Python interpreter for node-gyp to use
ENV PYTHON=/usr/bin/python3

# Install runtime dependencies
RUN apk add --no-cache python3 g++ make

USER node
WORKDIR /app

# Copy the install dependencies from the build stage
COPY --from=build --chown=node:node /app/.yarn ./.yarn
COPY --from=build --chown=node:node /app/.yarnrc.yml ./
COPY --from=build --chown=node:node /app/backstage.json ./
COPY --from=build --chown=node:node /app/yarn.lock /app/package.json /app/packages/backend/dist/skeleton/ ./

RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"

# Copy the built packages from the build stage
COPY --from=build --chown=node:node /app/packages/backend/dist/bundle/ ./

# Copy app configuration files
COPY --chown=node:node app-config*.yaml ./

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--no-node-snapshot"

EXPOSE 7007

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7007/healthcheck', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
