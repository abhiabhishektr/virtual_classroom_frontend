import React, { useEffect, useState } from 'react';
import { getAllTeacherRequests, updateTeacherRequestStatus, deleteTeacherRequest } from '../../api/admin/userRequestApi';
import { showToast } from '../../utils/toast';
import { AxiosError } from 'axios';

interface User {
  name: string;
  email: string;
}

interface TeacherRequest {
  _id: string;
  user: User;
  highestQualification: string;
  yearsOfTeachingExperience: number;
  subjects: string;
  bio: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminTeacherRequests: React.FC = () => {
  const [requests, setRequests] = useState<TeacherRequest[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getAllTeacherRequests();
      console.log('Response:', response);
      
      const requests: TeacherRequest[] = response.data.map((request: any) => ({
        _id: request._id,
        user: request.user ?? { name: '', email: '' }, // Ensure user is always defined
        highestQualification: request.highestQualification,
        yearsOfTeachingExperience: request.yearsOfTeachingExperience,
        subjects: request.subjects,
        bio: request.bio,
        status: request.status
      }));
      console.log('Requests:', requests);
      
      setRequests(requests);
    } catch (error) {
      showToast('Failed to fetch requests. Please try again.', 'error');
    }
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateTeacherRequestStatus(id, status);
      showToast(`Request ${status} successfully!`, 'success');
      fetchRequests();
    } catch (error) {
      showToast('Failed to update status. Please try again.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeacherRequest(id);
      showToast('Request deleted successfully!', 'success');
      fetchRequests();
    } catch (error) {
        // Type guard for AxiosError
        if (error instanceof AxiosError) {
          // Extract error details from the response
          const axiosError = error.response?.data as { message: string } | undefined;
          const errorMessage = axiosError?.message || 'Failed to delete request. Please try again.';
          
          showToast(errorMessage, 'info');
        } else {
          // Handle other types of errors
          showToast('Failed to delete request. Please try again.', 'error');
        }
      }
    };

  return (
<div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md overflow-x-auto">
<h2 className="text-2xl font-bold mb-6 text-center">Teacher Requests</h2>
  {requests.length === 0 ? (
    <p className="text-center text-gray-500">No requests found.</p>
  ) : (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {requests.map((request) => (
          <tr key={request._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.highestQualification}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.yearsOfTeachingExperience}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.subjects}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.bio}</td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${request.status === 'pending' ? 'text-yellow-500' : request.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
              {request.status}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
              <button
                onClick={() => handleStatusChange(request._id, 'approved')}
                className="text-green-600 hover:text-green-900"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(request._id, 'rejected')}
                className="text-red-600 hover:text-red-900"
              >
                Reject
              </button>
              <button
                onClick={() => handleDelete(request._id)}
                className="text-gray-600 hover:text-gray-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  );
};

export default AdminTeacherRequests;
