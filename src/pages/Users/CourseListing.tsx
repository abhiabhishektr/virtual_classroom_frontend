import React, { useState, useEffect } from 'react';
import CourseCard from '../../components/Profile/CourseCard';
import SortBy from '../../components/Shared/SortBy';
import SearchBar from '../../components/Shared/SearchBar';
import { getUserCourses } from '../../api/userCourseApi'; // Import your API function
import { courseListingDTO as Course } from '../../types/courseListingDTO';

const CourseListing: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getUserCourses();
        setCourses(response);
        setFilteredCourses(response);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSort = (sortOption: string) => {
    const sorted = [...filteredCourses].sort((a, b) => {
      switch (sortOption) {
        case 'priceLowToHigh':
          return a.fees - b.fees;
        case 'priceHighToLow':
          return b.fees - a.fees;
        default:
          return 0;
      }
    });
    setFilteredCourses(sorted);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="w-64">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-48">
          <SortBy onSort={handleSort} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div>No courses found.</div>
        )}
      </div>
    </div>
  );
};

export default CourseListing;
