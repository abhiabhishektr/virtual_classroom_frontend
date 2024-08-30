import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { unblockCourse, blockCourse, getCourses } from '../../api/admin/adminCourseManagement';

// Define your Course interface
interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  fees: number;
  isBlocked: boolean;
}

const AdminCourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleBlockUnblock = async (courseId: number, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await unblockCourse(courseId.toString());
      } else {
        await blockCourse(courseId.toString());
      }
      setCourses(prevCourses =>
        prevCourses.map(c =>
          c.id === courseId ? { ...c, isBlocked: !c.isBlocked } : c
        )
      );
    } catch (error) {
      console.error('Error blocking/unblocking course:', error);
    }
  };

  return (
    <div className='h-[87vh] w-full overflow-y-auto'>
      <div className="max-w-6xl mx-auto mt-10 p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Courses</h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {courses.map(course => (
            <div key={course.id} className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
              <div className="relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    className={`px-2 py-1 text-sm rounded ${course.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                    onClick={() => handleBlockUnblock(course.id, course.isBlocked)}
                  >
                    {course.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-2 text-sm truncate">
                  {course.description}
                </p>
                <p className="text-gray-600 text-sm mb-3">Fees: ₹{course.fees}</p>
                <div className="flex justify-between items-center mt-auto">
                  <Link
                    to={`/admin/course-details/${course.id}`}
                    className="text-indigo-600 text-sm border border-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseList;
