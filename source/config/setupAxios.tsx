import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL, tokenExpiredflagChange} from '../utils/commonUtils';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000, // Increased timeout to 15 seconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('Verify_Token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Ensure 'Bearer' format if required
      }
      console.log('Request Config:', config?.url); // Log the full request details
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error('Axios Response Error:', {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      });

      // Handle specific errors
      if (error.response.status === 401) {
        tokenExpiredflagChange(true); // Trigger token expiration logic
      }
    } else {
      console.error('Network Error or Timeout:', error.message);
    }
    return Promise.reject(error);
  },
);

export {axiosInstance};
