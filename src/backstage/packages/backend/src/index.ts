import express from 'express';
import path from 'path';

const main = async () => {
  const app = express();

  const appDistPath = path.resolve(__dirname, '../../app/dist');
  app.use(express.static(appDistPath));
  
  // Health check endpoints
  app.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Notifications plugin endpoint
  app.use('/api/notifications', (req, res) => {
    res.json({ messages: [] });
  });

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.sendFile(path.join(appDistPath, 'index.html'));
  });

  const port = process.env.PORT || 7007;
  const host = '0.0.0.0';

  const server = app.listen(port, host, () => {
    console.log(`Backstage backend listening on http://${host}:${port}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
};

main().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
