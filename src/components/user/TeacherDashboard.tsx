import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { showHotToast } from '../../utils/hotToast';
import { Button } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { getTeacherDashboardData, TeacherDashboardData } from '../../api/teacher/teacherDashboardApi';
import { useApiQuery } from '../../hooks/useApiQuery';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TeacherDashboard: React.FC = () => {
  const { name, email, profilePicture } = useSelector((state: RootState) => state.profile);

  const { data: dashboardData, error, isLoading } = useApiQuery<TeacherDashboardData>(
    getTeacherDashboardData,
    ['TeacherDashboardData'],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const courses = dashboardData?.getCourses || [];

  const earningsData = {
    labels: dashboardData?.getsales.map((sales) => sales.month),
    datasets: [
      {
        label: 'Earnings',
        data: dashboardData?.getsales.map((sales) => sales.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Corrected totalEarnings calculation
  const totalEarnings = courses.reduce((sum, course) => sum + parseFloat(course.price) * course.sales, 0);   

  const initials = name ? name.split(' ').map(n => n[0]).join('') : 'AT';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-100 min-h-screen p-8"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center mb-6">
          <div className="mr-6">
            {profilePicture ? (
              <img
                className="object-cover w-20 h-20 rounded-full border-4 border-white shadow-lg"
                src={profilePicture}
                alt="Profile"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                {initials}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, {name}!</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 relative"
        >
          <h3 className="text-xl font-semibold mb-4">Your Courses</h3>
          <div className="mx-10">
            <Carousel>
              <CarouselContent>
                {courses.map((course) => (
                  <CarouselItem key={course._id} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <Link
                      to={`/profile/course-edit/${course._id}`}
                      className="block bg-white rounded-lg shadow-md p-4 border border-gray-200 h-40"
                    >
                      <h4 className="text-lg font-medium">{course.title}</h4>
                      <p className="text-gray-600">Price:₹{course.price}</p>
                      <p className="text-gray-600">Sales: {course.sales}</p>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <Link to="/profile/course-registration">
            <Button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors">
              Create New Course
            </Button>
          </Link>
        </motion.div>

        {/* Earnings & Receive Money Sections */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Earnings Section */}
          <div className="md:w-1/2 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Earnings</h3>
            <div style={{ height: '200px' }}>
              <Bar data={earningsData} />
            </div>
            <p className="mt-4 text-lg font-medium text-green-800">Total Earnings: ₹{totalEarnings.toFixed(2)}</p>
          </div>

          {/* Receive Money Section */}
          <div className="md:w-1/2 bg-white rounded-lg shadow-md p-4 relative">
            <h3 className="text-xl font-semibold mb-4">Receive Money</h3>
            <p>Your earnings will be automatically transferred to your connected account.</p>
            <Button
              onClick={() =>
                showHotToast('Payment processing initiated!', 'custom', {
                  icon: '💸',
                  style: { background: '#333', color: '#fff' },
                  duration: 8000,
                  position: 'bottom-center',
                })
              }
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition-colors absolute bottom-4 right-4"
            >
              Receive Money
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div >
  );
};

export default TeacherDashboard;