import React from 'react';
import { FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface Course {
  id: string;
  name: string;
  blocked: boolean;
}

interface ConfirmAction {
  action: 'block' | 'unblock';
  courseId: string;
}

interface CourseAdminListProps {
  courses: Course[];
  onBlockToggle: (courseId: string, currentlyBlocked: boolean) => void;
}

const CourseAdminList: React.FC<CourseAdminListProps> = ({ courses, onBlockToggle }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredCourses, setFilteredCourses] = React.useState<Course[]>(courses);
  const [confirmAction, setConfirmAction] = React.useState<ConfirmAction | null>(null);

  React.useEffect(() => {
    setFilteredCourses(
      courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, courses]);

  const confirmBlockToggle = () => {
    if (confirmAction) {
      onBlockToggle(confirmAction.courseId, confirmAction.action === 'block');
      setConfirmAction(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-4">Courses</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses"
            className="py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FiSearch />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <button
                onClick={() => setConfirmAction({
                  action: course.blocked ? 'unblock' : 'block',
                  courseId: course.id
                })}
                className={`px-3 py-1 rounded-full ${
                  course.blocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {course.blocked ? (
                  <>
                    <FiCheckCircle className="inline-block mr-1" />
                    Unblock
                  </>
                ) : (
                  <>
                    <FiXCircle className="inline-block mr-1" />
                    Block
                  </>
                )}
              </button>
            </div>
            <p className="text-sm">
              Status: {course.blocked ? 'Blocked' : 'Active'}
            </p>
          </div>
        ))}
      </div>

      {confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Confirm {confirmAction.action === 'block' ? 'Block' : 'Unblock'}
            </h3>
            <p>
              Are you sure you want to {confirmAction.action}{' '}
              {courses.find(c => c.id === confirmAction.courseId)?.name}?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setConfirmAction(null)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockToggle}
                className={`px-4 py-2 rounded text-white ${
                  confirmAction.action === 'block' ? 'bg-red-500' : 'bg-green-500'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAdminList;
