// src/hooks/useAuth.ts

import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  const checkAuthTokens = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const adminToken = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
    setIsAdminAuthenticated(!!adminToken);
  }, []);

  useEffect(() => {
    checkAuthTokens();
  }, [checkAuthTokens]);

  const login = (accessToken: string, refreshToken: string) => {
    console.log('Login successful:', accessToken, refreshToken);

    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true });
    setIsAuthenticated(true);
    checkAuthTokens();
  };

  const setadminLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('adminToken', accessToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true });
    setIsAdminAuthenticated(true);
    checkAuthTokens();
    console.log('Admin login set, state updated.');
    console.log('Login successful: isAdminAuthenticated', isAdminAuthenticated);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    checkAuthTokens();
  };

  const adminlogout = () => {
    localStorage.removeItem('adminToken');
    Cookies.remove('refreshToken');
    setIsAdminAuthenticated(false);
    checkAuthTokens();
  };

  return { 
    isAuthenticated, 
    isAdminAuthenticated, 
    login, 
    logout, 
    setadminLogin, 
    adminlogout,
    checkAuthTokens
  };
};