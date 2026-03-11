import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      autoConnect: false,
      transports: ['websocket'],
    });
  }
  return socket;
};

export const connectSocket = (): void => {
  const s = getSocket();
  if (!s.connected) s.connect();
};

export const disconnectSocket = (): void => {
  if (socket?.connected) socket.disconnect();
};

export const joinGroupRoom = (groupId: string): void => {
  getSocket().emit('join_group', groupId);
};

export const leaveGroupRoom = (groupId: string): void => {
  getSocket().emit('leave_group', groupId);
};
