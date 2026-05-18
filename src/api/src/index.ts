import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'tfm-platform-api',
    timestamp: new Date().toISOString(),
  });
});

// Ready check
app.get('/api/ready', (req: Request, res: Response) => {
  res.json({
    ready: true,
    service: 'tfm-platform-api',
  });
});

// Example endpoint
app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to TFM Platform API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.listen(port, () => {
  console.log(`TFM Platform API server is running at port ${port}`);
});
