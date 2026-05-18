import { useHotMemoize } from '@backstage/backend-common';
import {
  coreServices,
  createBackendModule,
  createBackendPlugin,
  createServiceFactory,
} from '@backstage/backend-plugin-api';
import { legacyPlugin } from '@backstage/backend-common';
import { Router } from 'express';
import { createServiceRef } from '@backstage/backend-plugin-api';

export const createBackend = () => {
  const backend = createBackendPlugin({
    pluginId: 'app',
    register(reg) {
      reg.registerInit({
        deps: {
          httpRouter: coreServices.httpRouter,
          logger: coreServices.logger,
          config: coreServices.config,
          database: coreServices.database,
          permissions: coreServices.permissions,
          discovery: coreServices.discovery,
        },
        async init({ httpRouter, logger, config, database, permissions, discovery }) {
          const router = Router();

          router.get('/health', (req, res) => {
            res.send({ status: 'ok' });
          });

          router.get('/healthcheck', (req, res) => {
            res.send({ status: 'ok' });
          });

          router.get('/info', (req, res) => {
            res.json({
              status: 'ok',
              timestamp: new Date().toISOString(),
            });
          });

          httpRouter.use(router);

          logger.info('Backend initialized');
        },
      });
    },
  });

  return backend;
};
