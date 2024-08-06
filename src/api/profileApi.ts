// src/api/profileApi.ts
import axiosInstance from './axiosInstance';
import { Profile,TeacherRequestResponse } from '../types/profileTypes';
import { PROFILE_ENDPOINT } from '../utils/constants';
import { AxiosResponse } from 'axios';


export const getProfile = async (): Promise<object> => {
  const response = await axiosInstance.get<Profile>(`${PROFILE_ENDPOINT}`);
  console.log('Profile :', response);
  
  return response;
};

export const updateProfile = async (profileData: Profile): Promise<Profile> => {
  const response = await axiosInstance.put<Profile>(`${PROFILE_ENDPOINT}`, profileData);
  return response.data;
};


interface TeacherRequestData {
  qualification: string;
  experience: string;
  subjectsToTeach: string;
  bio: string;
}

interface TeacherRequestStatusResponse {
  request: {
    highestQualification: string;
    yearsOfTeachingExperience: number;
    subjects: string;
    bio: string;
  };
  status: string;
}

export const registerAsTeacher = async (data: TeacherRequestData): Promise<TeacherRequestResponse> => {  
  const response = await axiosInstance.post<TeacherRequestResponse>(`${PROFILE_ENDPOINT}/teacher-request`, data);
  return response.data; // Accessing the data property of the response
};

export const getTeacherRequestStatus = async (): Promise<AxiosResponse<TeacherRequestStatusResponse>> => {  
  const response = await axiosInstance.get<TeacherRequestStatusResponse>(`${PROFILE_ENDPOINT}/teacher-request-status`);
  return response; // Returning the full response
};

interface ChangePasswordResponse {
  success: boolean;
  message: string;
  // Add other fields if necessary
}


export const updatePassword = async (curr: string, newPass: string): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post<ChangePasswordResponse>(`${PROFILE_ENDPOINT}/change-password`, {
    currentPassword: curr,
    newPassword: newPass
  });
  return response.data;
};