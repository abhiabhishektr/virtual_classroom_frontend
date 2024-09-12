// src/api/adminAuthApi.ts
import adminAxiosInstance from './adminAxiosInstance';
import { AUTH_ENDPOINT } from '../../utils/constants';

export const  adminLogin = async (email: string, password: string): Promise<any> => {
  try {
    const response = await adminAxiosInstance.post(`${AUTH_ENDPOINT}/adminlogin`, { email, password });
    return response; // Assuming backend sends back some data on successful login
  } catch (error) {
    console.error('Admin login failed:', error);
    throw error;
  }
};

export const  allusers = async (email: string, password: string): Promise<any> => {
  try {
    const response = await adminAxiosInstance.post(`${AUTH_ENDPOINT}/adminlogin`, { email, password });
    return response; // Assuming backend sends back some data on successful login
  } catch (error) {
    console.error('Admin login failed:', error);
    throw error;
  }
};
