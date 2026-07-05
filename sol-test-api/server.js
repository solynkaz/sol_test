import express from 'express';

const app = express();
const port = Number(process.env.PORT ?? 8080);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend placeholder' });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});