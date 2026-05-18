import express from 'express';

const main = async () => {
  const app = express();
  
  // Health check endpoints
  app.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
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
