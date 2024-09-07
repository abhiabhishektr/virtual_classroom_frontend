import React, { useState, useCallback } from 'react';
import CourseCard from '../../components/Profile/CourseCard';
import { wishlistlistCourses ,removePurchasedItemsFromWishlist } from '../../api/userCourseApi';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import debounce from 'lodash.debounce';
import { Button } from '../../components/ui/button';

// Define the Course type (if not already defined elsewhere)
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fees: number;
  isPurchased?: boolean;
  isBookmarked?: boolean;
}

// Define the BookmarkPage component
const BookmarkPage: React.FC = () => {
  const dispatch = useDispatch();

  const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>([]);

  const fetchCourses = useCallback(
    debounce(async () => {
      try {
        dispatch(setLoading(true));
        const response = await wishlistlistCourses();
        setBookmarkedCourses(response);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        dispatch(setLoading(false));
      }
    }, 600),
    [dispatch]
  );

  React.useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleBookmarkChange = (courseId: string, isBookmarked: boolean) => {
    setBookmarkedCourses(
      bookmarkedCourses.map((course) =>
        course.id === courseId ? { ...course, isBookmarked } : course
      )
    );
  };

  const handleClearPurchasedCourses = async () => {
    try {
      dispatch(setLoading(true));
      await removePurchasedItemsFromWishlist();
      fetchCourses(); // Refresh the list after clearing
    } catch (err) {
      console.error('Error clearing purchased courses:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <motion.div // Wrap the container with motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation on mount
      transition={{ duration: 0.5, ease: "easeInOut" }} // Animation timing
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Bookmarked Courses</h1>

      <motion.div // Add motion to the grid container 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }} // Slight delay
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {bookmarkedCourses.length > 0 ? (
          bookmarkedCourses.map((course) => (
            <motion.div // Add motion to individual course cards
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
            >
              <CourseCard 
                course={course}
                onBookmarkChange={handleBookmarkChange}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookmarked courses yet.</p>
        )}
      </motion.div>

      {/* Button with hover effect */}
      <motion.div
        whileHover={{ scale: 1.05 }} // Scale up on hover
        whileTap={{ scale: 0.95 }}  // Scale down on click
      >
        <Button 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg"
          onClick={handleClearPurchasedCourses}
        >
          Clear Purchased Courses
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BookmarkPage;