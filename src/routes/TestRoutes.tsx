// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import T1 from '../../src/Testing/t2';
import ProductTable from '../Testing/t5';
import CourseListing from '../pages/Users/CourseListing';


const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/1" element={<CourseListing />} />
      <Route path="/2" element={<ProductTable />} />

    </Routes>
  );
};

export default AuthRoutes;

