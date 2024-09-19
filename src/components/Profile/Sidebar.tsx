import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signOut } from '../../api/authApi';
import { FiMenu, FiX } from 'react-icons/fi';



const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { role, profilePicture, name } = useSelector((state: RootState) => state.profile);
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    logout();
    navigate('/');
  };
  
  const closeSidebar = () => {
    setIsOpen(false);
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('') : 'AT';

  const getNavLinkClass = (path: string) =>
    location.pathname === path ? 'text-gray-700 bg-gray-100' : 'text-gray-700 hover:bg-gray-100';

  return (
    <>
      <button
        className={`md:hidden fixed top-50 left-4 z-50 p-2 mt-3 rounded-md bg-gray-300 ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu />
      </button>
      <aside
        className={`w-72 bg-white border-r border-gray-200 shadow-xl fixed h-full z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {isOpen && (
          <button
            className="absolute top-4 right-4 z-50 p-2 rounded-md bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FiX />
          </button>
        )}
        <div className="flex flex-col  ">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-14 h-14 rounded-full shadow-lg"
                />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {initials}
                </div>
              )}
              <div>
                <h2 className="text-sm font-medium text-gray-500">Welcome back,</h2>
                <p className="text-lg font-semibold text-gray-800">{name}</p>
              </div>
            </div>
          </div>
          <nav className="flex-grow py-6 px-4 space-y-1">
            <Link to="/profile" className={`flex items-center px-4 py-3 rounded-lg font-medium ${getNavLinkClass('/profile')}`} onClick={closeSidebar}>
              Overview
            </Link>
            <Link to="/profile/edit-profile" className={`flex items-center px-4 py-3 rounded-lg font-medium ${getNavLinkClass('/profile/edit-profile')}`} onClick={closeSidebar}>
              Profile Management
            </Link>
            <Link to="/profile/teacher-registration" className={`flex items-center px-4 py-3 rounded-lg font-medium ${getNavLinkClass('/profile/teacher-registration')}`} onClick={closeSidebar}>
              Register as Teacher
            </Link>
            <Link to="/profile/purchase-history" className={`flex items-center px-4 py-3 rounded-lg font-medium ${getNavLinkClass('/profile/purchase-history')}`} onClick={closeSidebar}>
              Purchase history
            </Link>
            <Link to="/profile/notifications" className={`flex items-center px-4 py-3 rounded-lg font-medium ${getNavLinkClass('/profile/notifications')}`} onClick={closeSidebar}>
              Notifications
            </Link>
            {role === 'teacher' && (
              <Link to="/profile/course-list" className={`flex items-center px-4 py-3 rounded-lg font-medium ${getNavLinkClass('/profile/course-list')}`} onClick={closeSidebar}>
                Course List
              </Link>
            )}

          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 rounded-lg font-medium transition duration-150 ease-in-out"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>

        </div>
      </aside>
    </>

  );
};

export default Sidebar;
