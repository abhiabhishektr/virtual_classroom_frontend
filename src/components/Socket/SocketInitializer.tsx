import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeSocket } from '../../utils/socket'; // Adjust path if needed
import { setSocket, removeSocket } from '../../redux/slices/socketSlice';
import { useAuth } from '../../hooks/useAuth';

const SocketInitializer: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token ) {  //&& isAuthenticated
      const socket = initializeSocket(token);
      dispatch(setSocket(socket));

      return () => {
        dispatch(removeSocket());
      };
    }
    return
  }, [dispatch, isAuthenticated]);

  return null;
};

export default SocketInitializer;
