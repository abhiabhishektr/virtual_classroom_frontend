import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { resetAuthState, setAuthToken } from '../redux/slices/authSlice';
import Cookies from 'js-cookie';
import { resetProfileState } from '../redux/slices/profileSlice';

// Custom hook to handle authentication logic
export const useAuth = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  const checkAuthTokens = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const adminToken = localStorage.getItem('adminToken');
    if (token) {
      dispatch(setAuthToken(token)); // Update Redux store
    } else if (adminToken) {
      dispatch(setAuthToken(adminToken)); // Update Redux store
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuthTokens();
  }, [checkAuthTokens]);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    // Note: httpOnly cookies must be set by the backend server
    // Client-side httpOnly flag is ignored by browsers
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict' });
    dispatch(setAuthToken(accessToken)); // Update Redux store
    checkAuthTokens();
  };

  const setAdminLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('adminToken', accessToken);
    // Note: httpOnly cookies must be set by the backend server
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict' });
    dispatch(setAuthToken(accessToken)); // Update Redux store
    checkAuthTokens();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    Cookies.remove('refreshToken');
    dispatch(setAuthToken(null)); // Update Redux store
    dispatch(resetAuthState()); // Clear auth state
    dispatch(resetProfileState()); // Clear profile state
    checkAuthTokens();
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    Cookies.remove('refreshToken');
    dispatch(setAuthToken(null)); // Update Redux store
    checkAuthTokens();
  };

  return {
    isAuthenticated: !!authToken,
    isAdminAuthenticated: !!localStorage.getItem('adminToken'),
    login,
    logout,
    setAdminLogin,
    adminLogout,
    checkAuthTokens,
  };
};
