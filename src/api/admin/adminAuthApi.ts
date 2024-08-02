// src/api/adminAuthApi.ts
import adminAxiosInstance from './adminAxiosInstance';
import { AUTH_ENDPOINT } from '../../utils/constants';

// interface AdminRegisterInput {
//   email: string;
//   password: string;
//   name: string;
// }

// interface AdminRegisterResponse {
//   message: string;
//   // other possible fields
// }

// export async function registerAdmin({ email, password, name }: AdminRegisterInput): Promise<AdminRegisterResponse> {
//   try {
//     const response = await adminAxiosInstance.post<AdminRegisterResponse>(`${AUTH_ENDPOINT}/admin/register`, { email, password, name });
//     console.log('Admin registration successful:', response);
//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.data) {
//       console.error('Admin registration failed:', error.response.data);
//       return error.response.data; // Return the error response to handle in the calling function
//     }
//     console.error('Admin registration failed:', error);
//     throw new Error('An unexpected error occurred'); // Return a generic error message
//   }
// }

// export const verifyAdminOTP = async (email: string, otp: string): Promise<any> => {
//   try {
//     const response = await adminAxiosInstance.post(`${AUTH_ENDPOINT}/admin/verify-otp`, { email, otp });
//     return response; // Assuming backend sends back some data on successful verification
//   } catch (error) {
//     console.error('Admin OTP verification failed:', error);
//     throw error;
//   }
// };

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
