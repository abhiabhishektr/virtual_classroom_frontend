// src/api/authApi.ts
import axiosInstance from './axiosInstance';
import { AUTH_ENDPOINT } from '../utils/constants';
// import { ErrorResponse } from '../utils/constants';

interface RegisterUserInput {
    email: string;
    password: string;
    name: string;
}

interface RegisterUserResponse {
    message: string;
    // other possible fields
}


export async function registerUser({ email, password, name }: RegisterUserInput): Promise<RegisterUserResponse> {
    try {
      const response = await axiosInstance.post<RegisterUserResponse>(`${AUTH_ENDPOINT}/register`, { email, password, name });
      console.log('User registration successful:', response);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error('User registration failed:', error.response.data);
        return error.response.data; // Return the error response to handle in the calling function
      }
      console.error('User registration failed:', error);
      throw new Error('An unexpected error occurred'); // Return a generic error message
    }
  }


export const verifyOTP = async (email: string, otp: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`${AUTH_ENDPOINT}/verify-otp`, { email, otp });
        return response; // Assuming backend sends back some data on successful verification
    } catch (error) {
        console.error('OTP verification failed:', error);
        throw error;
    }
};

export const Userlogin = async (email: string, password: string): Promise<any> => {
    try {
      const response = await axiosInstance.post(`${AUTH_ENDPOINT}/login`, { email, password });
      console.log('Login successful:', response);
      return response; // Assuming backend sends back some data on successful login
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };