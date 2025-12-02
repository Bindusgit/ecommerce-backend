import { app, initOnce } from '../server.js';

export default async function handler(req, res) {
  try {
    await initOnce();
    // Call the Express app as middleware
    app(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.statusCode = 500;
    res.json({ error: 'Internal Server Error', message: err.message });
  }
}

