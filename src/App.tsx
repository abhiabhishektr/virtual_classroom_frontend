import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Shared/Navbar';
import AdminRoutes from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
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
  console.log("isAuthenticated: ", isAuthenticated);

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

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
