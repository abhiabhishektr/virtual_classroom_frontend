import React, { useEffect, useState } from 'react';
import { getAllTeacherRequests, updateTeacherRequestStatus, deleteTeacherRequest } from '../../api/admin/adminTeacherRequestApi';
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
      <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Teacher Requests</h2>
        {requests.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No requests found.</p>
        ) : (
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-700 text-white">
              <tr>
                {['Name', 'Qualification', 'Experience', 'Subjects', 'Bio', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.reverse().map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{request.user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.highestQualification}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.yearsOfTeachingExperience}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.subjects}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.bio}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${
                    request.status === 'pending' ? 'text-yellow-500' :
                    request.status === 'approved' ? 'text-green-500' :
                    'text-red-500'
                  }`}>
                    {request.status}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleStatusChange(request._id, 'approved')}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full hover:from-green-500 hover:to-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(request._id, 'rejected')}
                      className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-full hover:from-red-500 hover:to-red-700 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="bg-gradient-to-r from-gray-300 to-gray-500 text-gray-700 px-4 py-2 rounded-full hover:from-gray-400 hover:to-gray-600 transition-colors"
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
