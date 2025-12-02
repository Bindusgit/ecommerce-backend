import { app, initOnce } from '../server.js';

export default async function handler(req, res) {
  try {
    await initOnce();
    // Forward request to Express app
    return app(req, res);
  } catch (err) {
    console.error('Serverless handler error', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
