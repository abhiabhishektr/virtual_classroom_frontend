import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiBook, FiClipboard, FiBell, FiUser, FiLogIn, FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Replace with your authToken retrieval logic
    setIsLoggedIn(!!authToken); // using truthy falsy logic
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLoginClick = () => {
    navigate(`/auth/login`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: FiGrid, link: '/', label: 'Home Page', shortLabel: 'Home' },
    { name: 'Courses', icon: FiBook, link: '/courses', label: 'Courses', shortLabel: 'Courses' },
    { name: 'Assignments', icon: FiClipboard, link: '/assignments', label: 'Assignments', shortLabel: 'Tasks' },
    { name: 'Notifications', icon: FiBell, link: '/notifications', label: 'Notifications', shortLabel: 'Notif' },
  ];

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Logo</span>
          </div>

          {/* Navigation for large screens */}
          <div className="hidden lg:flex bg-gray-100 rounded-full px-8 py-3 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => handleButtonClick(item.name)}
                className={`${
                  selectedButton === item.name
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                    : 'text-gray-500'
                } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors mx-1`}
              >
                <item.icon className="mr-2" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Profile/Login button and Menu toggle */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleProfileClick}
                className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md flex items-center transition-colors"
              >
                <FiUser className="mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md flex items-center transition-colors"
              >
                <FiLogIn className="mr-2" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-500 hover:bg-gray-200 hover:text-gray-900 p-2 rounded-md ml-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => handleButtonClick(item.name)}
                className={`${
                  selectedButton === item.name
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                    : 'text-gray-500'
                } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-md flex items-center transition-colors mb-2`}
              >
                <item.icon className="mr-2" />
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.shortLabel}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;