// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for authentication token in localStorage or cookies
    const token = localStorage.getItem('authToken');
    const admintoken = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsAdminAuthenticated(!!admintoken);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    console.log('Login successful:', accessToken, refreshToken);

    localStorage.setItem('authToken', accessToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true });
    setIsAuthenticated(true);
  }; //

  const setadminLogin = (accessToken: string, refreshToken: string) => {
    console.log('Login successful:', accessToken, refreshToken);

    localStorage.setItem('adminToken', accessToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true });
    setIsAdminAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    // Cookies.remove('refreshToken');
    setIsAuthenticated(false);
  };

  const adminlogout = () => {
    localStorage.removeItem('adminToken');
    Cookies.remove('refreshToken');
    setIsAdminAuthenticated(false);
  };

  return { isAuthenticated, isAdminAuthenticated, login, logout, setadminLogin, adminlogout };
};

