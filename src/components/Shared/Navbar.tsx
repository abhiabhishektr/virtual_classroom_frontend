import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center">
          <span className="text-white text-lg font-semibold">Your Logo</span>
        </div>

        {/* Middle section with clickable buttons */}
        <div className="flex bg-gray-700 rounded-full p-2">
          <Link
            to="/dashboard"
            onClick={() => handleButtonClick('Dashboard')}
            className={`${
              selectedButton === 'Dashboard' ? 'bg-gray-800 text-white' : 'text-gray-300'
            } hover:bg-gray-800 hover:text-white px-5 py-2 rounded-full`}
          >
            Dashboard
          </Link>
          <Link
            to="/button2"
            onClick={() => handleButtonClick('Button 2')}
            className={`${
              selectedButton === 'Button 2' ? 'bg-gray-800 text-white' : 'text-gray-300'
            } hover:bg-gray-800 hover:text-white px-5 py-2 rounded-full`}
          >
            Button 2
          </Link>
          <Link
            to="/button3"
            onClick={() => handleButtonClick('Button 3')}
            className={`${
              selectedButton === 'Button 3' ? 'bg-gray-800 text-white' : 'text-gray-300'
            } hover:bg-gray-800 hover:text-white px-5 py-2 rounded-full`}
          >
            Button 3
          </Link>
          <Link
            to="/button4"
            onClick={() => handleButtonClick('Button 4')}
            className={`${
              selectedButton === 'Button 4' ? 'bg-gray-800 text-white' : 'text-gray-300'
            } hover:bg-gray-800 hover:text-white px-5 py-2 rounded-full`}
          >
            Button 4
          </Link>
        </div>

        {/* Right section with profile button */}
        <div className="flex items-center">
          <Link
            to="/profile"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
