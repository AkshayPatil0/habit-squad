import express from 'express';
import http from 'http';
import cors from 'cors';
import { env } from './config/env';
import { connectDB } from './config/db';
import { initSocket } from './sockets';
import authRoutes from './routes/auth';
import groupRoutes from './routes/groups';
import habitRoutes from './routes/habits';
import leaderboardRoutes from './routes/leaderboard';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true, env: env.NODE_ENV }));

// Routes
app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/habits', habitRoutes);
app.use('/', leaderboardRoutes);

// Socket.IO
initSocket(server);

// Start server
const startServer = async () => {
  await connectDB();
  server.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
};

startServer();
