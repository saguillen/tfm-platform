import {
  createApiFactory,
  discoveryApiRef,
  scmIntegrationsApiRef,
} from '@backstage/core-plugin-api';
import { ScmIntegrations } from '@backstage/integration';
import { UrlPatternDiscovery } from '@backstage/core-app-api';
import { notificationsApiRef } from '@backstage/plugin-notifications';

export const apis = [
  createApiFactory({
    api: discoveryApiRef,
    deps: {},
    factory: () => UrlPatternDiscovery.compile('http://localhost:7007'),
  }),
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: {},
    factory: () => ScmIntegrations.fromConfig({}),
  }),
  createApiFactory({
    api: notificationsApiRef,
    deps: {},
    factory: () =>
      ({
        getNotifications: async () => ({ items: [], totalCount: 0 }),
        getNotification: async () => undefined,
        markAsRead: async () => undefined,
        markAsUnread: async () => undefined,
        markAllAsRead: async () => undefined,
        markAllAsUnread: async () => undefined,
        deleteNotification: async () => undefined,
      } as any),
  }),
];
