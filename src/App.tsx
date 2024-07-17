/* eslint-disable @typescript-eslint/no-unused-vars */
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Shared/Navbar';
import AdminNavbar from './components/Admin/AdminNavbar';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminUsers from './components/Admin/AdminUsers';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminProtectedRoute from './components/Auth/AdminProtectedRoute';
import { useAuth } from './hooks/useAuth';
import AdminRoutes from './routes/AdminRoutes';


// const AdminRoutes: React.FC = () => (
//   <Routes>
//     <Route path="/" element={<AdminDashboard />} />
//     <Route path="/users" element={<AdminUsers />} />
//   </Routes>
// );

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isAdminAuthenticated } = useAuth();
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {isAdminRoute ? <AdminNavbar /> : !isAuthRoute && <Navbar />}

      <div className="container mx-auto">
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route
            path="/*"
            element={
              // <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppRoutes />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              // <AdminProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdminAuthenticated}>
                <AdminRoutes />
              // </AdminProtectedRoute>
            }
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
