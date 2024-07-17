import React from 'react';
import '../../styles/loader.css'; // Import your CSS file for styling

const Loader = () => {
  return (
    // <div  className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="loader">
      <span className="loader-text">Loading</span>
      <span className="load"></span>
    </div>
    // </div>
  );
};

export default Loader;
