
// components/LandingPage/Testimonial.jsx
import React from 'react';

interface TestimonialProps {
  name: string;
  quote: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, quote, image }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
      <div className="flex items-center">
        <img 
          src={image} 
          alt={`${name}'s profile`} 
          className="w-16 h-16 rounded-full object-cover" 
        />
        <div className="ml-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">"{quote}"</p>
          <p className="mt-2 text-gray-900 dark:text-gray-100 font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
