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
import { useAuth } from './hooks/useAuth';


// --------------------------------------------------
import TestRoutes from './routes/TestRoutes';
import ProfilePage from './routes/ProfileRoutes';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth(); //isAdminAuthenticated , ,logout 
  const navigate = useNavigate();

  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowNavbar = !isAuthRoute && !isAdminRoute;
  const isLoading = useSelector((state: RootState) => state.profile.loading);

  useEffect(() => {
    if (isAuthenticated && isAuthRoute) {
      navigate('/', { replace: true });
    }
    // if (isAdminAuthenticated && isAdminRoute) {
    //   navigate('/admin', { replace: true });

    // }
  }, [isAuthenticated, isAuthRoute, navigate]);


  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
    }
    //Disables scrolling and interaction on the page while loading
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
    };
  }, [isLoading]);

  return (
    <div className="App"> 
     {/* style={{ height: '100%' }} */}
      <ToastContainer />
      {isLoading && <Loader />}
      {shouldShowNavbar && <Navbar />}

      <div className="container mx-auto"  >
      {/* style={{ height: 'calc(100vh - 64px)' }} */}
        <Routes>
          <Route
            path="/auth/*"
            element={<AuthRoutes />} />
          <Route
            path="/*"
            element={<AppRoutes />}
          />
          <Route
            path="/profile/*"
            element={<ProfilePage />} />

          <Route
            path="/admin/*"
            element={<AdminRoutes />}
          />
          <Route
            path="/test/*"
            element={<TestRoutes />}
          />
        </Routes>
      </div>
    </div>
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