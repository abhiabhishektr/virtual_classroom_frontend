// src/components/AdminDashboard.tsx

import React from 'react';

const AdminDashboard: React.FC = () => {
  console.log('haiaia');
  
  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 1</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 2</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 3</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 4</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 5</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 6</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 4</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 5</div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md h-40">Card 6</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
