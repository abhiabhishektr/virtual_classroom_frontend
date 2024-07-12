import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid, FiBook, FiClipboard, FiBell, FiUser } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('Dashboard');

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800">Logo</span>
        </div>

        {/* Middle section with clickable buttons */}
        <div className="flex bg-gray-100 rounded-full px-8 py-3 shadow-inner">
          <Link
            to="/"
            onClick={() => handleButtonClick('Dashboard')}
            className={`${
              selectedButton === 'Dashboard'
                ? 'bg-gradient-to-r  from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiGrid className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/courses"
            onClick={() => handleButtonClick('Courses')}
            className={`${
              selectedButton === 'Courses'
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiBook className="mr-2" />
            Courses
          </Link>
          <Link
            to="/assignments"
            onClick={() => handleButtonClick('Assignments')}
            className={`${
              selectedButton === 'Assignments'
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiClipboard className="mr-2" />
            Assignments
          </Link>
          <Link
            to="/notifications"
            onClick={() => handleButtonClick('Notifications')}
            className={`${
              selectedButton === 'Notifications'
                ? 'bg-gradient-to-r  from-blue-400 to-blue-600 text-white'
                : 'text-gray-500'
            } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors`}
          >
            <FiBell className="mr-2" />
            Notifications
          </Link>
        </div>

        {/* Right section with profile button */}
        <div className="flex items-center">
          <Link
            to="/profile"
            className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md flex items-center transition-colors"
          >
            <FiUser className="mr-2" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
