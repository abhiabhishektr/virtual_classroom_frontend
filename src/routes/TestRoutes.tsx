// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookmarkPage from '../Testing/t2';



const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/2" element={<BookmarkPage />} />
    </Routes>
  );
};

export default AuthRoutes;

