
// src/api/axiosInstance.ts

import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosRetry(axiosInstance, {
  retries: 2,
  retryCondition: (error) => !error.response || error.response.status >= 500,
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
  return response.data.accessToken;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        localStorage.setItem('authToken', newToken);

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login or handle logout
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;



















// // src/api/axiosInstance.ts
// import axios from 'axios';
// import axiosRetry from 'axios-retry';

// import { API_BASE_URL } from '../utils/constants';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,  // Adjust as needed
// //   timeout: 10000, // for the timeout to each request
// });

// axiosRetry(axiosInstance, {
//   retries: 2  , // Number of retry attempts
//   retryCondition: (error) => {
//     // Retry on network errors or 5xx responses
//     return !error.response || error.response.status >= 500;
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('Response:', response);
//     return response.data;
//   },
//   (error) => {
// console.log('Error:', error.response.data);

// if (error.response && error.response.data && error.response.data.error) {
//   console.error('Error:', error.response.data.error);
//   if (error.response.data.error === 'jwt expired') {
//     // Refresh token logic
//     // const newToken = await refreshToken();
//     // localStorage.setItem('authToken', newToken);
//     localStorage.removeItem('authToken');
//   }
// } else {
//   return Promise.reject(error.response.data);
// }
    
//     // Handle specific error cases here
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

