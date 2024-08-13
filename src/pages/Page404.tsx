import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Json/NotFound.json'; // Adjust path as per your project structure

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4" style={{ minHeight: 'calc(100vh - 110px)' }}>
      <div className="flex justify-center items-center w-1/2 h-1/2">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '50%', height: '50%' }}
        />
      </div>
      <h1 className="text-4xl font-bold mt-8 text-center">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mt-4 text-center">Oops! The page you are looking for does not exist.</p>
      <a href="/" className="text-blue-500 hover:underline mt-4 text-center">Go back to home</a>
    </div>
  );
};

export default NotFoundPage;
