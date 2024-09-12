// src/api/axiosInstance.ts
import Cookies from 'js-cookie';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/`,
  withCredentials: true,
});

axiosRetry(axiosInstance, {
  retries: 0,
  retryCondition: (error) => !error.response || error.response.status >= 500,
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, { refreshToken });
  return response.data;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && token.length > 5) {
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

    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (localStorage.getItem('authToken')) {
          try {
            const newToken = await refreshToken();
            localStorage.setItem('authToken', newToken.accessToken);
            Cookies.set('refreshToken', newToken.refreshToken, { secure: true, httpOnly: true });

            originalRequest.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken.accessToken}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            Cookies.remove('refreshToken');
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }
      }

      // Handle 403 Forbidden
      if (error.response.status === 403) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        Cookies.remove('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;


// // src/api/axiosInstance.ts
// import Cookies from 'js-cookie';

// import axios from 'axios';
// import axiosRetry from 'axios-retry';
// import { API_BASE_URL  } from '../utils/constants';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// axiosRetry(axiosInstance, {
//   // retries: 2,// testing
//   retries: 1,
//   retryCondition: (error) => !error.response || error.response.status >= 500,
// });

// const refreshToken = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   const response = await axios.post(`${API_BASE_URL}api/auth/refresh-token`, { refreshToken });
//   console.log('refresh',response.data);
  
//   return response.data;
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log( 'API response:',response); // Log the entire response
//     return response.data; // Return the response data for further processing
//   },
  
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newToken = await refreshToken();
//         localStorage.setItem('authToken', newToken.accessToken);
//     Cookies.set('refreshToken', "refreshToken", { secure: true, httpOnly: true });

//         localStorage.setItem('refreshToken', newToken.refreshToken);

//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('refreshToken');
//         // Redirect to login or handle logout
//         window.location.href = '/auth/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
















