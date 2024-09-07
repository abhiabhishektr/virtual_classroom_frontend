// src/App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Shared/Navbar';
import AdminRoutes from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Shared/Loader';
// import SocketInitializer from './components/Socket/SocketInitializer';
import TestRoutes from './routes/TestRoutes';
import ProfilePage from './routes/ProfileRoutes';

const AppContent: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowNavbar = !isAuthRoute && !isAdminRoute;
  const isLoading = useSelector((state: RootState) => state.profile.loading);
  const isAuthenticated = useSelector((state: RootState) => Boolean(state.auth.authToken)); // Use Redux state

  useEffect(() => {
    if (isAuthenticated && isAuthRoute) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAuthRoute, navigate]);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'unset';
    document.body.style.pointerEvents = isLoading ? 'none' : 'auto';

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
    };
  }, [isLoading]);

  return (
    <>
      <ToastContainer />
      <Toaster />
      {isLoading && <Loader />}
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<AppRoutes />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/test/*" element={<TestRoutes />} />
      </Routes>
    </>
  );
};






import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {

  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SocketProvider>
            <AppContent />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </SocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
