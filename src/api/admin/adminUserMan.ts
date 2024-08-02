// src/api/adminAuthApi.ts
import adminAxiosInstance from './adminAxiosInstance';
import { ADMIN_ENDPOINT } from '../../utils/constants';

// interface User {
//   id: number;
//   // Define other user properties as needed
// }

export const allusers = async (): Promise<any> => {
  try {
    const response = await adminAxiosInstance.get(`${ADMIN_ENDPOINT}/getUsers`);
    console.log('Fetched all users successfully:', response);
    return response; // Assuming backend sends back some data on successful fetch
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const  blockUser = async (userId: string): Promise<void> => {
  try {
    console.log(`Blocking user with ID ${userId}`);
    
    const response = await adminAxiosInstance.put(`${ADMIN_ENDPOINT}/block/${userId}`);
    console.log(`User with ID ${userId} blocked successfully:`, response);
  } catch (error) {
    console.error(`Failed to block user with ID ${userId}:`, error);
    throw error;
  }
};

export const unblockUser = async (userId: string): Promise<void> => {
  try {
    const response = await adminAxiosInstance.put(`${ADMIN_ENDPOINT}/admin/users/${userId}/unblock`);
    console.log(`User with ID ${userId} unblocked successfully:`, response);
  } catch (error) {
    console.error(`Failed to unblock user with ID ${userId}:`, error);
    throw error;
  }
};
