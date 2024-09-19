// src/context/SocketContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { showHotToast } from '../utils/hotToast';
import { API_BASE_URL } from '../utils/constants';


export interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({ socket: null });

// export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken') 

    if (token) {

      const newSocket = io(API_BASE_URL, {
        auth: { token },
      });
      setSocket(newSocket);

      newSocket.on('receive-notification', (notification: { title: string; message: string }) => {
        console.log('Received notification:', notification);
        const truncatedMessage = notification.message.length > 50
        ? notification.message.substring(0, 50) + '...'
        : notification.message;
    
        showHotToast(`${notification.title}: ${truncatedMessage}`, 'custom', {
            icon: '🚀',
            style: { background: '#333', color: '#fff' },
            duration: 8000,
            position: 'bottom-center',
        });
    });
    
      return () => {
        newSocket.disconnect();
      };
    }
    return () => {}; 
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

