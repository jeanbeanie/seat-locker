import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

// Initialize Redis client for standard commands
const redisClient = createClient({ url: 'redis://localhost:6373' });

// Separate client specifically to listen to key expiration events
// Redis is single threaded, so listening blocks fetching/setting/etc
const subscriberClient = redisClient.duplicate();

// open TCP network connection btwn Node and Redis server instance
await redisClient.connect();
await subscriberClient.connect();

// Enable Redis keyspace notifications for expired events
// instructs Redis to emit expirations events (Ex) when keys time out
// default behavior is silent upon key expiration
// E (Keyevent events) x (expired events, died due to their TTL)
await redisClient.configSet('notify-keyspace-events', 'Ex');

// SEAT HOLD EXPIRATION
const LOCK_DURATION_MS = 600000; // 10 minutes


app.get("/api/users", (_req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

