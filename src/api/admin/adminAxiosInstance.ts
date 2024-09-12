import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

const adminAxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/`,
  // timeout: 10000, // Optional: set timeout for each request
});

adminAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminAxiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Response:', response);
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Error:', error.response.data.error);
      if (error.response.data.error === 'jwt expired') {
        localStorage.removeItem('adminToken');
      }
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;
