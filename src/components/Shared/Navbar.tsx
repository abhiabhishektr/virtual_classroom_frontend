import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiBook, FiClipboard, FiBell, FiUser, FiLogIn, FiMenu, FiX } from 'react-icons/fi';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { resetAuthState } from '../../redux/slices/authSlice';


const Navbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();


  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Replace with your authToken retrieval logic
    setIsLoggedIn(!!authToken); // using truthy falsy logic

    // Set selected button based on the current path
    if (location.pathname.startsWith('/profile')) {
      setSelectedButton('Profile');
    } else if (location.pathname === '/') {
      setSelectedButton('Dashboard');
    } else if (location.pathname.startsWith('/courses')) {
      setSelectedButton('Courses');
    } else if (location.pathname.startsWith('/assignments')) {
      setSelectedButton('Assignments');
    } else if (location.pathname.startsWith('/notifications')) {
      setSelectedButton('Notifications');
    }
  }, [location]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLoginClick = () => {
  dispatch(resetAuthState());
  console.log("handleLoginClick called");
  
    navigate(`/auth/login`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: FiGrid, link: '/', label: 'Home Page', shortLabel: 'Home' },
    { name: 'Courses', icon: FiBook, link: '/courses', label: 'Courses', shortLabel: 'Courses' },
    { name: 'Assignments', icon: FiClipboard, link: '/assignments', label: 'Assignments', shortLabel: 'Tasks' },
    { name: 'Notifications', icon: FiBell, link: '/notifications', label: 'Chats', shortLabel: 'Chats' },
  ];

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">YYY</span>
          </div>

          {/* Navigation for large screens */}
          <div className="hidden lg:flex bg-gray-100 rounded-full px-8 py-3 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => handleButtonClick(item.name)}
                className={`${selectedButton === item.name
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                    : 'text-gray-500'
                  } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors mx-1`}
              >
                <item.icon className="mr-2" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Profile/Login Button and Menu toggle */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <Button
                onClick={handleProfileClick}
                className={`${selectedButton === 'Profile'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                    : 'text-gray-800 bg-slate-300'
                  } hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors mx-1`}
              >
                <FiUser className="mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            ) : (
              <Button
                onClick={handleLoginClick}
                className="text-gray-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors mx-1"
              >
                <FiLogIn className="mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
            <Button
              onClick={toggleMenu}
              className="lg:hidden text-gray-500 hover:bg-gray-200 hover:text-gray-900 p-2 rounded-md ml-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </Button>
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
                className={`${selectedButton === item.name
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
