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
      dispatch(setAuthToken(token));  // Update Redux store
    } else if (adminToken) {
      dispatch(setAuthToken(adminToken));  // Update Redux store
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuthTokens();
  }, [checkAuthTokens]);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true });
    dispatch(setAuthToken(accessToken));  // Update Redux store
    checkAuthTokens();
  };

  const setadminLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('adminToken', accessToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true });
    dispatch(setAuthToken(accessToken));  // Update Redux store
    checkAuthTokens();
    console.log('Admin login set, state updated.');
  };

  const logout = () => {
    localStorage.clear();
    dispatch(setAuthToken(null));  // Update Redux store
    dispatch(resetAuthState());   // Clear auth state
    dispatch(resetProfileState()); // Clear profile state
    Cookies.remove('refreshToken');
    localStorage.removeItem('reduxState')
    checkAuthTokens();
  };

  const adminlogout = () => {
    localStorage.removeItem('adminToken');
    Cookies.remove('refreshToken');
    dispatch(setAuthToken(null));  // Update Redux store
    checkAuthTokens();
  };

  return {
    isAuthenticated: !!authToken,
    isAdminAuthenticated: !!authToken, // Update according to your admin auth logic
    login,
    logout,
    setadminLogin,
    adminlogout,
    checkAuthTokens
  };
};
