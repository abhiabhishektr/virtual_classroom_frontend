import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReportsAdmin, GetReportsResponse } from '../../api/user/reportApi';

const AdminUserReports: React.FC = () => {
  const { data: userReports, error, isLoading } = useQuery<GetReportsResponse>({
    queryKey: ['adminUserReports'],
    queryFn: getReportsAdmin,
  });

  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>Error loading reports: {error.message}</div>;
  }

  // Check if userReports is an array (which means it's directly the report data)
  const reportsArray = Array.isArray(userReports) ? userReports : userReports?.reports;

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Reports</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Issue Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reportsArray?.map((report, index) => (
            <tr key={report._id || index}>
              <td className="px-6 py-4 whitespace-nowrap text-center">{report.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{report.courseName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{report.issueType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{report.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {new Date(report.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserReports;
