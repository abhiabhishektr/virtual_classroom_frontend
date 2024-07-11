/* eslint-disable @typescript-eslint/no-unused-vars */
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Shared/Navbar';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = true; // Replace with actual auth check
  const isAuthRoute = location.pathname.startsWith('/auth');

  return (
    <div className="App">
      {!isAuthRoute && <Navbar />}
      <div className="container mx-auto px-4">
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