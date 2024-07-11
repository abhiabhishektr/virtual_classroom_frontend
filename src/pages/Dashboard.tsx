import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to your dashboard. Here you can find a quick overview of your activities.</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">New Signups</h2>
            <p className="text-2xl font-bold">123</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-600">User John Doe signed up</li>
            <li className="text-gray-600">Order #12345 was placed</li>
            <li className="text-gray-600">User Jane Smith updated her profile</li>
          </ul>
        </div>

        {/* Placeholder for additional sections */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Other Section</h2>
          <p className="text-gray-600">This is a placeholder for another section of your dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
