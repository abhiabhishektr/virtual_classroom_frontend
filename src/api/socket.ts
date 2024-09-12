// src/api/socket.ts
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../utils/constants';

const socket: Socket = io(API_BASE_URL, {
  auth: {
    token: localStorage.getItem('authToken'), // Pass the token
  },
});

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

export default socket;


// src/
// ├── components/
// │   ├── ChatInterface.tsx
// │   ├── SocketInitializer.tsx
// ├── context/
// │   └── SocketContext.tsx
// ├── hooks/
// │   └── useAuth.ts
// ├── redux/
// │   ├── slices/
// │   │   └── socketSlice.ts
// │   └── store.ts
// ├── App.tsx
// └── index.tsx
