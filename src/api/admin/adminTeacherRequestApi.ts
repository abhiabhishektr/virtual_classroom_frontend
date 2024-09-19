import adminAxiosInstance from './adminAxiosInstance';
import { ADMIN_ENDPOINT } from '../../utils/constants';

interface TeacherRequest {
    _id: string;
    userId: string;
    highestQualification: string;
    yearsOfTeachingExperience: number;
    subjects: string;
    bio: string;
    status: 'pending' | 'approved' | 'rejected';
  }


// Fetch all teacher requests
export const getAllTeacherRequests = async () => {
  const response = await adminAxiosInstance.get<TeacherRequest[]>(`${ADMIN_ENDPOINT}/teacher-requests`);
  return response;
};

// Update teacher request status
export const updateTeacherRequestStatus = async (id: string, status: 'approved' | 'rejected') => {
  const response = await adminAxiosInstance.put<TeacherRequest>(`${ADMIN_ENDPOINT}/teacher-requests/${id}/status`, { status });
  return response;
};

// Delete teacher request
export const deleteTeacherRequest = async (id: string) => {
  const response = await adminAxiosInstance.delete(`${ADMIN_ENDPOINT}/teacher-requests/${id}`);
  
  return response;
};
