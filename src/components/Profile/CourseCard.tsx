import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

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
      <div className="relative group h-40">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/course/${course.id}`}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-600 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors"
          >
            See Details
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col h-48">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {course.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-blue-700">
            ₹{course.fees.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default CourseCard;
