import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeacherCourses } from '../../api/teacher/courseApi';
import { AxiosResponse } from 'axios';

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
        const response: AxiosResponse<Course[]> = await getTeacherCourses();
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
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="text-gray-600 mb-4">Fees: ₹{course.fees}</p>
              <Link
                to={`/profile/course-edit/${course.id}`}
                className="inline-block px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
