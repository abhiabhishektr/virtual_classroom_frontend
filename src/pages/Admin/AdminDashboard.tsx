// src/components/AdminDashboard.tsx

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// For smooth animations
import { motion } from 'framer-motion';
import { getDashboardData, DashboardData } from '../../api/admin/adminUserMan';
import moment from 'moment';
import { useApiQuery } from '../../hooks/useApiQuery';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Chart Options
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Course Sales',
    },
  },
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'New Teacher Registrations',
    },
  },
};


const AdminDashboard: React.FC = () => {


  const { data: dashboardData, error, isLoading } = useApiQuery<DashboardData>(
    getDashboardData,
    ['dashboardData'],
  );


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;


  const barChartData = dashboardData ? {
    labels: dashboardData.monthlyCourseSales.map(sale => sale.month),
    datasets: [
      {
        label: 'Total Sales',
        data: dashboardData.monthlyCourseSales.map(sale => sale.totalSales),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  } : {
    labels: [], // Default empty array for labels
    datasets: [] // Default empty array for datasets
  };

  const lineChartData = dashboardData ? {
    labels: dashboardData.newTeacherRegistrations.map(reg => reg.month),
    datasets: [
      {
        label: 'Total Requests',
        data: dashboardData.newTeacherRegistrations.map(reg => reg.totalRequests),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Pending Requests',
        data: dashboardData.newTeacherRegistrations.map(reg => reg.pendingRequests),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Approved Requests',
        data: dashboardData.newTeacherRegistrations.map(reg => reg.approvedRequests),
        borderColor: 'rgb(75, 192, 192)', // Choose a color for approved requests
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Choose a color for approved requests
      },
    ],
  } : {
    labels: [], // Default empty array for labels
    datasets: [] // Default empty array for datasets
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-4"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        E-Learning Admin Dashboard
      </h1>

      {/* Top Row: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Total Courses
          </h2>
          <p className="text-4xl font-bold text-blue-500">
            {dashboardData?.totalCourses || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Total Students
          </h2>
          <p className="text-4xl font-bold text-green-500">
            {dashboardData?.totalStudents || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Total Teachers
          </h2>
          <p className="text-4xl font-bold text-indigo-500">
            {dashboardData?.totalTeachers || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Pending Applications
          </h2>
          <p className="text-4xl font-bold text-red-500">
            {dashboardData?.pendingApplications || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Estimated Profit
          </h2>
          <p className="text-4xl font-bold text-yellow-500">
            {dashboardData
              ? (dashboardData.monthlyCourseSales.reduce((sum, sale) => sum + sale.totalSales, 0) * 0.1).toFixed(2)
              : 0}
          </p>
        </motion.div>
      </div>

      {/* Second Row: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Course Sales Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-md rounded-lg p-6 h-96"
        >
          <Bar options={barChartOptions} data={barChartData} />
        </motion.div>

        {/* Teacher Registrations Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-md rounded-lg p-6 h-96"
        >
          <Line options={lineChartOptions} data={lineChartData} />
        </motion.div>
      </div>

      {/* Third Row: Recent Teacher Applications (Table) */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Teacher Applications
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboardData?.recentApplications.map((application) => (
              <tr key={application.createdAt.toString()}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(application.createdAt).format('YYYY-MM-DD')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${application.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : application.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'}`}
                  >
                    {application.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;