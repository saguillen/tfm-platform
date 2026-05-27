import {
  createApiFactory,
  createApiRef,
  discoveryApiRef,
  scmIntegrationsApiRef,
} from '@backstage/core-plugin-api';
import { ScmIntegrations } from '@backstage/integration';
import { UrlPatternDiscovery } from '@backstage/core-app-api';
type NotificationsApi = {
  getNotifications: () => Promise<{ items: unknown[]; totalCount: number }>;
  getNotification: (id: string) => Promise<unknown | undefined>;
  markAsRead: (id: string) => Promise<void>;
  markAsUnread: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  markAllAsUnread: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
};

const notificationsApiRef = createApiRef<NotificationsApi>({
  id: 'plugin.notifications.service',
});

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
