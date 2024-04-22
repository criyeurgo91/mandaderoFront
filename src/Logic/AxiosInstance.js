import axios from 'axios';
import apiUrl from '../config/apiConfig';
import { setAuthTokens } from '../Helpers/auth'

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post('/token/refresh/', {
          refresh: localStorage.getItem('refresh_token')
        });
        if (response.status === 200) {
          setAuthTokens(response.data);
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        // Handle refresh token failure
      }
    }
    return Promise.reject(error);
});

export default axiosInstance;
