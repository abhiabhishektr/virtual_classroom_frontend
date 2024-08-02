import React, { useState } from 'react';
import CourseCard from '../../components/Profile/CourseCard';
import SortBy from '../../components/Shared/SortBy';
import SearchBar from '../../components/Shared/SearchBar';

const sampleCourses = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React.js in this comprehensive course.',
    imageUrl: 'https://via.placeholder.com/190x100',
    fees: 299.99
  },
  {
    id: '2',
    title: 'Advanced Node.js',
    description: 'Deep dive into advanced Node.js concepts and applications.',
    imageUrl: 'https://via.placeholder.com/190x100',
    fees: 399.99
  }
  ,{
    id: '3',
    title: 'Full Stack MERN',
    description: 'Build full-stack applications with MongoDB, Express, React, and Node.js.',
    imageUrl: 'https://via.placeholder.com/190x100',
    fees: 499.99
  }
  ,{
    id: '3',
    title: 'Full Stack MERN',
    description: 'Build full-stack applications with MongoDB, Express, React, and Node.js.',
    imageUrl: 'https://via.placeholder.com/190x100',
    fees: 499.99
  }
  ,{
    id: '3',
    title: 'Full Stack MERN',
    description: 'Build full-stack applications with MongoDB, Express, React, and Node.js.',
    imageUrl: 'https://via.placeholder.com/190x100',
    fees: 499.99
  }
  ,{
    id: '3',
    title: 'Full Stack MERN',
    description: 'Build full-stack applications with MongoDB, Express, React, and Node.js.',
    imageUrl: 'https://via.placeholder.com/190x100',
    fees: 499.99
  }
];


const CourseListing: React.FC = () => {
    const [courses, setCourses] = useState(sampleCourses);
    const [filteredCourses, setFilteredCourses] = useState(sampleCourses);
  
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
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    );
  };
  
  export default CourseListing;