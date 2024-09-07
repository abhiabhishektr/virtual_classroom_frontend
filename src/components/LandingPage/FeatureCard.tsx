// components/LandingPage/FeatureCard.jsx
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string; 
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center">
          <i className={`fas fa-${icon} text-white text-2xl`}></i> 
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
