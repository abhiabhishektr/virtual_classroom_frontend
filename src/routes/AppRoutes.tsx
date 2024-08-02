// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Users/Dashboard';
import Profile from './ProfileRoutes';
import Courses from '../pages/Teacher/Courses-listing';
import { ProtectedRoute } from './ProtectedRoute/CustomRoute';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path='/profile' element={<ProtectedRoute element={Profile} />} /> */}
      <Route path='/courses' element={<ProtectedRoute element={Courses} />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;

// <Route path="/profile" element={<Profile />} />
