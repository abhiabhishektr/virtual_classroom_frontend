// src/pages/Teacher/Courses-listing.tsx
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import CourseCard from '../../components/Profile/CourseCard';
import SortBy from '../../components/Shared/SortBy';
import SearchBar from '../../components/Shared/SearchBar';
import Pagination from '../../components/Shared/Pagination';
import { getUserCourses } from '../../api/userCourseApi';
import { motion, AnimatePresence } from 'framer-motion';

import { courseListingDTO as Course } from '../../types/courseListingDTO';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Filter from '../../components/Profile/Filter';
// import FeaturedCoursesBanner from '../../components/user/FeaturedCoursesBanner';

// Define the type for the filters state


const CourseListing: React.FC = () => {
  const dispatch = useDispatch();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [showMyLearnings, setShowMyLearnings] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log("totalPages: ", totalPages);
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage] = useState<number>(8);

  const [category, setCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');

  const fetchCourses = useCallback(
    debounce(async (search: string, sort: string, currentPage: number, showMyLearnings: boolean) => {
      try {
        dispatch(setLoading(true));
        const response = await getUserCourses(showMyLearnings, search, sort, currentPage, undefined, category, priceRange);
        setFilteredCourses(response.courses);
        setTotalPages(response.totalPages);
        setLoadingSkeleton(false);
      } catch (err) {
        setError('Failed to fetch courses.');
        setLoadingSkeleton(false);
      } finally {
        dispatch(setLoading(false));
      }
    }, 600),
    [dispatch, category, priceRange]
  );

  const handleBookmarkChange = (courseId: string, isBookmarked: boolean) => {
    setFilteredCourses(filteredCourses.map(course =>
      course.id === courseId ? { ...course, isBookmarked } : course
    ));
  };

  useEffect(() => {
    fetchCourses(searchTerm, sortOption, currentPage, showMyLearnings);
  }, [searchTerm, sortOption, currentPage, showMyLearnings, category, priceRange, fetchCourses]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const handleCheckboxChange = () => {
    setShowMyLearnings(prev => !prev);
  };

  const handleFilterChange = (newCategory: string, newPriceRange: string) => {
    setCategory(newCategory);
    setPriceRange(newPriceRange);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 grid lg:grid-cols-6 gap-4">

      {/* <FeaturedCoursesBanner/> */}

      <motion.div
        className="lg:col-span-1"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Filter onFilterChange={handleFilterChange} />
      </motion.div>

      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="w-64">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showMyLearnings}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`relative h-6 w-11 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out ${showMyLearnings ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`absolute top-0 left-0 h-6 w-6 bg-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out ${showMyLearnings ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium text-sm">My Learnings</span>
            </label>
            <div className="w-48">
              <SortBy onSort={handleSort} disabled={showMyLearnings} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            {loadingSkeleton ? (
              Array.from({ length: coursesPerPage }).map((_, index) => (
                <Skeleton key={index} height={150} width="100%" />
              ))
            ) : (
              currentCourses.map(course => (
                <motion.div key={course.id}>
                  <CourseCard
                    course={course}
                    onBookmarkChange={handleBookmarkChange}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {
            totalPages &&
            (<div className='flex items-center justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>)
          }
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CourseListing;
