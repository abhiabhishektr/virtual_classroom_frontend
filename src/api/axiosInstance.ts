import axios from 'axios';
// import axiosRetry from 'axios-retry';

import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,  // Adjust as needed
//   timeout: 10000, // for the timeout to each request
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    
    return response.data;
  },
  (error) => {
// console.log('Error:', error);

if (error.response && error.response.data && error.response.data.error) {
  console.error('Error:', error.response.data.error);
  if (error.response.data.error === 'jwt expired') {
    // Refresh token logic
    // const newToken = await refreshToken();
    // localStorage.setItem('authToken', newToken);
    localStorage.removeItem('authToken');
  }
} else {
  console.error('Error:', error.message);
}
    
    // Handle specific error cases here
    return Promise.reject(error);
  }
);

export default axiosInstance;


// import axios from 'axios';
// import { API_BASE_URL } from '../utils/constants';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Function to refresh the token
// const refreshToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken'); // Assuming you store refresh token in localStorage
//     const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
//     return response.data.accessToken;
// };

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
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is due to an invalid token (401) and we haven't retried yet
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Attempt to refresh the token
//         const newToken = await refreshToken();
        
//         // Update the token in localStorage
//         localStorage.setItem('authToken', newToken);

//         // Update the Authorization header
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;

//         // Retry the original request with the new token
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // If refreshing fails, clear tokens and redirect to login
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('refreshToken');
//         // Redirect to login page or dispatch a logout action
//         // window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;