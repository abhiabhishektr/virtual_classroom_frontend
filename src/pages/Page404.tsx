import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Json/NotFound.json'; // Adjust path as per your project structure

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[87vh] w-screen">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '30%', height: '30%' }} // Adjust size as needed
        />
        <h1 className="text-4xl font-bold mt-8 text-center">404 - Page Not Found</h1>
        <p className="text-gray-600 text-lg mt-4 text-center">Oops! The page you are looking for does not exist.</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 text-center">Go back to home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
