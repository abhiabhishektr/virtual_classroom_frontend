// AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiBookOpen, FiBell, FiFileText } from 'react-icons/fi';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { FaFlickr } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const { isAdminAuthenticated, adminLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
  
    if (path === '/admin/users-requests') { // Exact match
      setSelectedButton('users requests');
    } else if (path === '/admin/course-oversight') { // Exact match
      setSelectedButton('Course Oversight');
    } else if (path === '/admin/users') { // Exact match
      setSelectedButton('Users');
    } else if (path === '/admin/') { // Exact match for Dashboard
      setSelectedButton('Dashboard');
    } else if (path === '/admin/push-notifications') { // Exact match
      setSelectedButton('Push Notifications');
    } else if (path === '/admin/user-reports') { // Exact match
      setSelectedButton('User Reports');
    } else {
      setSelectedButton(null);
    }
  }, [location]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/adminlogin');
  };

  return (
    <aside className="bg-white w-64 shadow-md h-screen fixed top-0 left-0 z-10">
      <div className="p-4 border-b">
        <span className="text-xl font-bold text-gray-800">Admin Panel</span>
      </div>
      <ul className="space-y-2 p-4">
        <li>
          <Link
            to="/admin/"
            onClick={() => handleButtonClick('Dashboard')}
            className={`${selectedButton === 'Dashboard'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              } px-4 py-2 rounded-md block transition-colors`}
          >
            <FiGrid className="inline-block mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            onClick={() => handleButtonClick('Users')}
            className={`${selectedButton === 'Users'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              } px-4 py-2 rounded-md block transition-colors`}
          >
            <FiUsers className="inline-block mr-2" />
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/course-oversight"
            onClick={() => handleButtonClick('Course Oversight')}
            className={`${selectedButton === 'Course Oversight'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              } px-4 py-2 rounded-md block transition-colors`}
          >
            <FiBookOpen className="inline-block mr-2" />
            Course Oversight
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users-requests"
            onClick={() => handleButtonClick('users requests')}
            className={`${selectedButton === 'users requests'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              } px-4 py-2 rounded-md block transition-colors`}
          >
            <FaFlickr className="inline-block mr-2" />
            Requests
          </Link>
        </li>
        <li>
          <Link
            to="/admin/push-notifications"
            onClick={() => handleButtonClick('Push Notifications')}
            className={`${selectedButton === 'Push Notifications'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              } px-4 py-2 rounded-md block transition-colors`}
          >
            <FiBell className="inline-block mr-2" />
            Push Notifications
          </Link>
        </li>
        <li>
          <Link
            to="/admin/user-reports"
            onClick={() => handleButtonClick('User Reports')}
            className={`${selectedButton === 'User Reports'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              } px-4 py-2 rounded-md block transition-colors`}
          >
            <FiFileText className="inline-block mr-2" />
            User Reports
          </Link>
        </li>
      </ul>
      <div className="absolute bottom-4 left-4 w-64">
        {isAdminAuthenticated ? (

          <button
            onClick={handleLogout}
            className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md block w-full text-left transition-colors"
          >
            <FiLogOut className="inline-block mr-2" />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate(`/admin/adminlogin`)}
            className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md block w-full text-left transition-colors"
          >
            <FiLogIn className="inline-block mr-2" />
            Login
          </button>
        )}</div>
    </aside>
  );
};

export default AdminSidebar;

