import {
  createApiFactory,
  discoveryApiRef,
  identityApiRef,
  scmIntegrationsApiRef,
} from '@backstage/core-plugin-api';
import { ScmIntegrations } from '@backstage/integration';
import { UrlPatternDiscovery } from '@backstage/core-app-api';
import {
  notificationsApiRef,
  NotificationsClient,
} from '@backstage/plugin-notifications';

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
    deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
    factory: ({ discoveryApi, identityApi }) =>
      new NotificationsClient({ discoveryApi, identityApi }),
  }),
];
