// src/hooks/useSocket.ts
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import type { SocketContextProps } from '../context/SocketContext';  // Importing the type explicitly

export const useSocket = () => useContext<SocketContextProps>(SocketContext);
