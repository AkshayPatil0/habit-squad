"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const env_1 = require("../config/env");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: env_1.env.CLIENT_URL,
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log(`🔌 Socket connected: ${socket.id}`);
        // Join a group room
        socket.on('join_group', (groupId) => {
            socket.join(`group:${groupId}`);
            console.log(`Socket ${socket.id} joined group:${groupId}`);
        });
        // Leave a group room
        socket.on('leave_group', (groupId) => {
            socket.leave(`group:${groupId}`);
            console.log(`Socket ${socket.id} left group:${groupId}`);
        });
        socket.on('disconnect', () => {
            console.log(`🔌 Socket disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO has not been initialized. Call initSocket first.');
    }
    return io;
};
exports.getIO = getIO;
//# sourceMappingURL=index.js.map