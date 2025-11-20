// src/routes/TestRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const TestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/test" element={<div>Test Page</div>} />
    </Routes>
  );
};

export default TestRoutes;
