// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Users/Dashboard';
// import Profile from './ProfileRoutes';
import Courses from '../pages/Teacher/Courses-listing';
import { ProtectedRoute } from './ProtectedRoute/CustomRoute';
import CourseDetail from '../components/user/CourseDetail';
import NotFoundPage from '../pages/Page404';
import ChatPage from '../pages/Users/ChatPage';
import { SocketProvider } from '../context/SocketContext';
// import ChatInterface from '../Testing/t5';

const AppRoutes: React.FC = () => {

  
  return (
    <SocketProvider>

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* <Route path='/profile' element={<ProtectedRoute element={Profile} />} /> */}
      <Route path='/courses' element={<ProtectedRoute element={Courses} />} />
      <Route path='/course/:courseId' element={<ProtectedRoute element={CourseDetail} />} />
      <Route path='/notifications' element={<ProtectedRoute element={ChatPage} />} />
      {/* <Route path='/chat' element={<ProtectedRoute element={ChatInterface} />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* Add more routes as needed */}
    </Routes>
    </SocketProvider>
  );
};

export default AppRoutes;

// <Route path="/profile" element={<Profile />} />
