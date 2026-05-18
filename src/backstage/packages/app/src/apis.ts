import {
  createApiFactory,
  discoveryApiRef,
  identityApiRef,
  scmIntegrationsApiRef,
  errorApiRef,
  unknownErrorHandler,
} from '@backstage/core-plugin-api';
import { ScmIntegrations } from '@backstage/integration';
import { UrlPatternDiscovery } from '@backstage/core-app-api';
import { IdentityApi } from '@backstage/core-plugin-api';

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
];
