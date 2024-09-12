// src/api/authApi.ts
import axiosInstance from './axiosInstance';
import { AUTH_ENDPOINT ,PROFILE_ENDPOINT} from '../utils/constants';
// import { ErrorResponse } from '../utils/constants';

interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
  otp: string;
}

interface RegisterUserResponse {
  message: string;
  // other possible fields
}


export async function registerUser({ email, password, name, otp }: RegisterUserInput): Promise<any> {
  try {
    const response = await axiosInstance.post<RegisterUserResponse>(`${AUTH_ENDPOINT}/register`, { email, password, name, otp });
    return response;
  } catch (error: any) {

    if (error.message && error.message === 'Invalid OTP') {
      return error.message;
    }
    console.error('User registration failed:', error);
    throw new Error('An unexpected error occurred'); // Return a generic error message
  }
}



export const sendEmailForOTP = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ENDPOINT}/send-otp`, { email });
    return response; // Assuming backend sends back some data on successful OTP request
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw error;
  }
};


export const reSendOTP = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ENDPOINT}/resend-otp`, { email });
    return response; // Assuming backend sends back some data on successful OTP request
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw error;
  }
};




export const Userlogin = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ENDPOINT}/login`, { email, password });
    return response; // Assuming backend sends back some data on successful login
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


export const forgotPasswordOTP = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ENDPOINT}/forgot-passwordOTP`, { email });
    return response; // Assuming backend sends back some data on successful login
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string, password: string, otp: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ENDPOINT}/forgot-password`, { email, password ,otp});
    return response; // Assuming backend sends back some data on successful login
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const signOut = async (): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${PROFILE_ENDPOINT}/logout`);
    return response; // Assuming backend sends back some data on successful login
  } catch (error) {
    console.error('logout failed:', error);
    throw error;
  }
};