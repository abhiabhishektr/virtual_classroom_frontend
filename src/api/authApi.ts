// src/api/authApi.ts
import axiosInstance from './axiosInstance';

interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
}

export async function registerUser({ email, password, name }: RegisterUserInput): Promise<void> {
  try {
    const response = await axiosInstance.post('/users/register', { email, password, name });
    console.log('User registered successfully:', response);
  } catch (error) {
    console.error('User registration failed:', error);
    throw error;
  }
}
