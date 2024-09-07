import React from 'react';
import { Link } from 'react-router-dom';

interface AuthButtonsProps {
  isAuthenticated: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <>
        <Link
          to="/auth/signup"
          title="Join for free"
          className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-blue-400 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
          role="button"
        >
          Join for free
          <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
        <p className="mt-5 text-gray-600">Already joined us?
          <Link to="/auth/login" title="Log in" className="text-black transition-all duration-200 hover:underline">
            Log in
          </Link>
        </p>
      </>
    );
  } else {
    return (
      <Link
        to="/courses"
        title="Go to Courses"
        className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-blue-400 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
        role="button"
      >
        View Courses
        <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </Link>
    );
  }
};

export default AuthButtons;