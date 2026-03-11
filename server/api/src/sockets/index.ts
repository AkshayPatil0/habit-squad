import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { env } from '../config/env';

let io: SocketIOServer;

export const initSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // Join a group room
    socket.on('join_group', (groupId: string) => {
      socket.join(`group:${groupId}`);
      console.log(`Socket ${socket.id} joined group:${groupId}`);
    });

    // Leave a group room
    socket.on('leave_group', (groupId: string) => {
      socket.leave(`group:${groupId}`);
      console.log(`Socket ${socket.id} left group:${groupId}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO has not been initialized. Call initSocket first.');
  }
  return io;
};
