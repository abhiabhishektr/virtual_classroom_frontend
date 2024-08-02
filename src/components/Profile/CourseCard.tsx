import React from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fees: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative group">
        <div
          className="h-40 w-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${course.imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
            Buy Now
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-700">${course.fees.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
