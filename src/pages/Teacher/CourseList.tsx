import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeacherCourses } from '../../api/teacher/courseApi';

interface Course {
  id: string; // MongoDB ObjectId as a string
  title: string;
  description: string;
  imageUrl: string;
  fees: number;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: Course[] = await getTeacherCourses();
        setCourses(response); // Access the data property here
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Existing Courses</h2>
        <Link
          to="/profile/course-registration"
          className="inline-block px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          Add Course
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course: Course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 h-12 overflow-hidden">{course.title}</h3>
              <p className="text-gray-600 mb-2 flex-grow h-24 overflow-hidden">{course.description}</p>
              <p className="text-gray-600 mb-4">Fees: ₹{course.fees}</p>
              <div className="flex justify-between items-center space-x-2 mt-auto">
                <Link
                  to={`/profile/course-edit/${course.id}`}
                  className="inline-block flex-shrink-0 flex-grow-0 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/profile/course-contents/${course.id}`}
                  className="inline-block flex-shrink-0 flex-grow-0 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                  style={{ width: '120px', textAlign: 'center' }}
                >
                  Contents
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  

};

export default CourseList;
