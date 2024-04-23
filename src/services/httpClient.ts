import axios from 'axios';
import { apiConfig } from '@/configs/api';

const httpClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: 5000,
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default httpClient;
