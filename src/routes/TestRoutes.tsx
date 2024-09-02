// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {FlickeringGridDemo} from '../Testing/t2';



const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/2" element={<FlickeringGridDemo />} />
    </Routes>
  );
};

export default AuthRoutes;

