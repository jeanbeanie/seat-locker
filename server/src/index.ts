import express from 'express';

const app = express();
app.use(express.json());

app.get("/api/users", (_req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

