import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import homePlugin from '@backstage/plugin-home/alpha';
import kubernetesPlugin from '@backstage/plugin-kubernetes/alpha';
import notificationsPlugin from '@backstage/plugin-notifications/alpha';
import searchPlugin from '@backstage/plugin-search/alpha'; 
import { navModule } from './modules/nav';



export default createApp({
  features: [
    homePlugin,
    catalogPlugin,
    kubernetesPlugin,
    navModule,
    notificationsPlugin,
    searchPlugin,
  ],
});
