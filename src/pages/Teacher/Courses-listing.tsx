// import React, { useState, useEffect, useCallback } from 'react';
// import debounce from 'lodash.debounce';
// import CourseCard from '../../components/Profile/CourseCard';
// import SortBy from '../../components/Shared/SortBy';
// import SearchBar from '../../components/Shared/SearchBar';
// import Pagination from '../../components/Shared/Pagination';
// import { getUserCourses } from '../../api/userCourseApi'; // Import your API function
// import { courseListingDTO as Course } from '../../types/courseListingDTO';
// import { useDispatch } from 'react-redux';
// import { setLoading } from '../../redux/slices/profileSlice';

// const CourseListing: React.FC = () => {
//   const dispatch = useDispatch();
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [sortOption, setSortOption] = useState<string>('');
//   const [showMyLearnings, setShowMyLearnings] = useState<boolean>(false);
//   const [totalPages, setTotalPages] = useState<number>(1);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [coursesPerPage] = useState<number>(8); // Number of courses per page

//   // Debounced function to handle search and sort
//   const fetchCourses = useCallback(
//     debounce(async (search: string, sort: string, currentPage: number) => {
//       try {
//         dispatch(setLoading(true));
//         const response = await getUserCourses(showMyLearnings, search, sort, currentPage);
//         setFilteredCourses(response.courses); // Initialize filteredCourses with response
//         setTotalPages(response.totalPages);
//       } catch (err) {
//         setError('Failed to fetch courses.');
//       } finally {
//         dispatch(setLoading(false));
//       }
//     }, 600), // Adjust delay as needed
//     [dispatch, showMyLearnings] // Dependencies for the debounce callback
//   );

//   // Fetch courses whenever searchTerm or sortOption changes
//   useEffect(() => {
//     fetchCourses(searchTerm, sortOption, currentPage);
//   }, [searchTerm, sortOption, fetchCourses, currentPage]);

//   // Fetch initial courses based on the checkbox state
//   useEffect(() => {
//     const fetchInitialCourses = async () => {
//       try {
//         dispatch(setLoading(true));
//         const response = await getUserCourses(showMyLearnings);
//         setFilteredCourses(response.courses);
//         // setTotalPages(1);
//         // setCurrentPage(1);
//       } catch (err) {
//         setError('Failed to fetch courses.');
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchInitialCourses();
//   }, [showMyLearnings, dispatch]);

//   const handleSearch = (term: string) => {
//     setSearchTerm(term);
//   };

//   const handleSort = (option: string) => {
//     setSortOption(option);
//   };

//   const handleCheckboxChange = () => {
//     setShowMyLearnings(prev => !prev);
//   };

//   // Pagination logic
//   const indexOfLastCourse = currentPage * coursesPerPage;
//   console.log("currentPage: ", currentPage);
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//   const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div className="w-64">
//           <SearchBar onSearch={handleSearch} />
//         </div>
//         <div className="flex items-center space-x-4">
//           <label className="flex items-center space-x-3">
//             <div className="relative">
//               <input
//                 type="checkbox"
//                 checked={showMyLearnings}
//                 onChange={handleCheckboxChange}
//                 className="sr-only"
//               />
//               <div
//                 className={`relative h-6 w-11 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out ${showMyLearnings ? 'bg-blue-600' : 'bg-gray-200'}`}
//               >
//                 <span
//                   className={`absolute top-0 left-0 h-6 w-6 bg-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out ${showMyLearnings ? 'translate-x-5' : 'translate-x-0'}`}
//                 />
//               </div>
//             </div>
//             <span className="text-gray-700 font-medium text-sm">My Learnings</span>
//           </label>

//           <div className="w-48">
//             <SortBy onSort={handleSort} disabled={showMyLearnings} />
//           </div>

//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {currentCourses.length > 0 ? (
//           currentCourses.reverse().map(course => (
//             <CourseCard key={course.id} course={course} />
//           ))
//         ) : (
//           <div>No courses found.</div>
//         )}
//       </div>
//       {!showMyLearnings && (
//         <div className="flex justify-center mt-6">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseListing;


import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import CourseCard from '../../components/Profile/CourseCard';
import SortBy from '../../components/Shared/SortBy';
import SearchBar from '../../components/Shared/SearchBar';
import Pagination from '../../components/Shared/Pagination';
import { getUserCourses } from '../../api/userCourseApi'; // Import your API function
import { courseListingDTO as Course } from '../../types/courseListingDTO';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';

const CourseListing: React.FC = () => {
  const dispatch = useDispatch();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [showMyLearnings, setShowMyLearnings] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage] = useState<number>(8); // Number of courses per page

  // Debounced function to handle search and sort
  const fetchCourses = useCallback(
    debounce(async (search: string, sort: string, currentPage: number, showMyLearnings: boolean) => {
      try {
        dispatch(setLoading(true));
        const response = await getUserCourses(showMyLearnings, search, sort, currentPage);
        setFilteredCourses(response.courses); // Initialize filteredCourses with response
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        dispatch(setLoading(false));
      }
    }, 600), // Adjust delay as needed
    [dispatch] // Dependencies for the debounce callback
  );

  // Fetch courses whenever searchTerm, sortOption, currentPage, or showMyLearnings changes
  useEffect(() => {
    fetchCourses(searchTerm, sortOption, currentPage, showMyLearnings);
  }, [searchTerm, sortOption, currentPage, showMyLearnings, fetchCourses]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const handleCheckboxChange = () => {
    setShowMyLearnings(prev => !prev);
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCourses.length > 0 ? (
          currentCourses.reverse().map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div>No courses found.</div>
        )}
      </div>
      {!showMyLearnings && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CourseListing;
