# Use official Backstage image from GitHub Container Registry
FROM ghcr.io/backstage/backstage:latest

WORKDIR /app

# Copy configuration files
COPY --chown=node:node app-config.yaml ./
COPY --chown=node:node app-config.production.yaml ./

# Expose ports (7007 for backend, 3000 for frontend)
EXPOSE 7007 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7007/healthcheck', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

# Use the official image's entry point - it handles config loading properly
# The image expects NODE_OPTIONS or config files in /app root
ENV NODE_ENV=development