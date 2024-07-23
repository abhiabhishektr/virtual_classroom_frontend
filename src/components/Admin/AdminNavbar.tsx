import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiBookOpen, FiBell } from 'react-icons/fi';
import { FiUser,FiLogIn, FiLogOut } from 'react-icons/fi';

import { useAuth} from '../../hooks/useAuth';

const AdminNavbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const { isAdminAuthenticated} = useAuth();
  useEffect(() => {
    // Check if admin token exists in localStorage
    // setIsLoggedIn(!!isAdminAuthenticated)
    const admintoken = localStorage.getItem('adminToken'); // Replace with your admintoken retrieval logic
    setIsLoggedIn(!!admintoken); // using truthy falsy logic
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear auth token on logout
    setIsLoggedIn(false);
    navigate('/admin/adminlogin');
  };

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800">Admin Panel</span>
        </div>

        {/* Middle section with clickable buttons */}
        <div className="flex bg-gray-100 rounded-full px-8 py-3 shadow-inner">
          <Link
            to="/admin/"
            onClick={() => handleButtonClick('Dashboard')}
            className={`${
              selectedButton === 'Dashboard'
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiGrid className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            onClick={() => handleButtonClick('Users')}
            className={`${
              selectedButton === 'Users'
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiUsers className="mr-2" />
            Users
          </Link>
          <Link
            to="/admin/course-oversight"
            onClick={() => handleButtonClick('Course Oversight')}
            className={`${
              selectedButton === 'Course Oversight'
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiBookOpen className="mr-2" />
            Course Oversight
          </Link>
          <Link
            to="/admin/push-notifications"
            onClick={() => handleButtonClick('Push Notifications')}
            className={`${
              selectedButton === 'Push Notifications'
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiBell className="mr-2" />
            Push Notifications
          </Link>
        </div>

        {/* Right section with profile button */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfileClick}
                className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md flex items-center transition-colors"
              >
                <FiUser className="mr-2" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md flex items-center transition-colors ml-4"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate(`/admin/adminlogin`)}
              className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md flex items-center transition-colors"
            >
              <FiLogIn className="mr-2" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
