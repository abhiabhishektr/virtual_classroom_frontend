// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Users/Dashboard';
import Courses from '../pages/Teacher/Courses-listing';
import { ProtectedRoute } from './ProtectedRoute/CustomRoute';
import CourseDetail from '../components/user/CourseDetail';
import NotFoundPage from '../pages/Page404';
import ChatPage from '../pages/Users/ChatPage';
import Assignments from '../pages/Users/Assignments.tsx';
import Bookmarks from '../pages/Users/Bookmarks';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path='/courses' element={<ProtectedRoute element={Courses} />} />
      <Route path='/assignments' element={<ProtectedRoute element={Assignments} />} />
      <Route path='/course/:courseId' element={<ProtectedRoute element={CourseDetail} />} />
      <Route path='/groupchats' element={<ProtectedRoute element={ChatPage} />} />
      <Route path='/bookmarks' element={<ProtectedRoute element={Bookmarks} />} />
    </Routes>
  );
};

export default AppRoutes;





