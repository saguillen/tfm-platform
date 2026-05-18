import express from 'express';
import { getRootLogger } from '@backstage/backend-common';
import { loadBackendConfig } from '@backstage/config-loader';

const main = async () => {
  const logger = getRootLogger();
  const config = await loadBackendConfig({ logger, argv: process.argv.slice(2) });
  
  const app = express();
  
  // Health check endpoints
  app.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const port = config.getOptional('backend.listen.port') ?? 7007;
  const host = config.getOptional('backend.listen.host') ?? '0.0.0.0';

  const server = app.listen(port, host, () => {
    logger.info(`Backstage backend listening on http://${host}:${port}`);
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  });
};

main().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
