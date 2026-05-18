import React from 'react';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogPage } from '@backstage/plugin-catalog';
import { CatalogIndexPage } from '@backstage/plugin-catalog';
import { TechDocsIndexPage } from '@backstage/plugin-techdocs';
import { HomePage } from '@backstage/plugin-home';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';

const app = createApp({
  apis: [],
  plugins: [],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
    });
  },
});

const AppBase = app.createRoot(
  <AppRouter>
    <FlatRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogIndexPage />} />
      <Route path="/catalog/:namespace/:kind/:name" element={<CatalogPage />} />
      <Route path="/docs" element={<TechDocsIndexPage />} />
      <Route path="/create" element={<ScaffolderPage />} />
    </FlatRoutes>
  </AppRouter>,
);

export default AppBase;
