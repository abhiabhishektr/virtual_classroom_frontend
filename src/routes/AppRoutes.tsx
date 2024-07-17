// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import { PublicRoute, ProtectedRoute } from '../routes/CustomRoute';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path='/profile' element={<ProtectedRoute element={Profile} />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;

// <Route path="/profile" element={<Profile />} />
