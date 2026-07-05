import express from 'express';

const app = express();
const port = Number(process.env.PORT ?? 8080);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend placeholder' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});