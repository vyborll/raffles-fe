import io from 'socket.io-client';

const scheme = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
const url = process.env.NODE_ENV === 'production' ? 's.rbxraffles.com' : 'localhost:5000';

// @ts-ignore
export const socket = io(`${scheme}://${url}`, {
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 60,
});
