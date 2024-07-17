// src/api/profileApi.ts
import axiosInstance from './axiosInstance';
import { Profile } from '../types/profileTypes';
import { PROFILE_ENDPOINT } from '../utils/constants';


export const getProfile = async (): Promise<object> => {
  const response = await axiosInstance.get<Profile>(`${PROFILE_ENDPOINT}`);
  console.log('Profile :', response);
  
  return response;
};

export const updateProfile = async (profileData: Profile): Promise<Profile> => {
  const response = await axiosInstance.put<Profile>(`${PROFILE_ENDPOINT}`, profileData);
  return response.data;
};
