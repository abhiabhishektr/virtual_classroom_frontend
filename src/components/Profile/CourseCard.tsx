import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { saveCourseToWishlist, unsaveCourseFromWishlist } from '../../api/userCourseApi';

import { Course } from '../../pages/Users/Bookmarks'

interface CourseCardProps {
  course: Course;
  onBookmarkChange?: (courseId: string, isBookmarked: boolean) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onBookmarkChange }) => {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked || false);

  useEffect(() => {
    setIsBookmarked(course.isBookmarked || false);
  }, [course.isBookmarked]); // Update state if isBookmarked prop changes

  const handleBookmarkClick = async () => {
    if (!course.isPurchased) {
      setIsBookmarked(!isBookmarked); // Optimistically update the UI

      try {
        if (isBookmarked) { // If it was bookmarked, now unsave
          await unsaveCourseFromWishlist(course.id);
          onBookmarkChange && onBookmarkChange(course.id, false); // Notify parent
        } else { // If it wasn't bookmarked, now save
          await saveCourseToWishlist(course.id);
          onBookmarkChange && onBookmarkChange(course.id, true); // Notify parent
        }
      } catch (error) {
        console.error("Error updating wishlist:", error);
        setIsBookmarked(!isBookmarked); // Revert UI update on error
      }
    }
  };


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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {course.title}
          </h2>
          {course.isPurchased ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <button
              onClick={handleBookmarkClick}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
            >
              {course.isBookmarked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
            </button>
          )}
        </div>
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