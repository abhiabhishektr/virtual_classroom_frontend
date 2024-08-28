// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import T1 from '../../src/Testing/t2';
import ProductTable from '../Testing/t2';
import CourseListing from '../pages/Users/CourseListing';
// import ResizableDemo from '../pages/Users/ChatPage';



const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/1" element={<CourseListing />} />
      <Route path="/2" element={<ProductTable />} />
      {/* <Route path="/3" element={<ResizableDemo />} /> */}

    </Routes>
  );
};

export default AuthRoutes;

