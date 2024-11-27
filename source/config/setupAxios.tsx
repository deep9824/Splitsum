import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL, tokenExpiredflagChange} from '../utils/commonUtils';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Optional: Set a timeout for requests (10 seconds here)
});

axiosInstance.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('Verify_Token');
    if (token) {
      config.headers.Authorization = token ? `${token}` : null;
    }
    console.log('Request details:', config); // Log the request details
  } catch (error) {
    console.log('error', error);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      tokenExpiredflagChange(true);
    }
    return Promise.reject(error);
  },
);

export {axiosInstance};
