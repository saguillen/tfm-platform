import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from '@backstage/core-app-api';
import { apis } from './apis';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider apis={apis}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
