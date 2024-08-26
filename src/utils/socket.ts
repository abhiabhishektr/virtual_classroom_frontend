import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      auth: { token },
    });
  }
  return socket;
};

export const getSocket = () => socket;



// ====================================

// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store'; // Adjust path if needed

// const ChatInterface: React.FC = () => {
//   const socket = useSelector((state: RootState) => state.socket.socket);

//   useEffect(() => {
//     if (socket) {
//       socket.on('message', (message) => {
//         console.log('New message:', message);
//       });

//       return () => {
//         socket.off('message');
//       };
//     }
//   }, [socket]);

//   return (
//     <div>
//       {/* Chat UI components */}
//     </div>
//   );
// };

// export default ChatInterface;


// ====================================