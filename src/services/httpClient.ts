import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '@/configs/api';

const apiClient = axios.create({
  baseURL: apiConfig.backendURL,
  timeout: 5000,
});

const proxyClient = axios.create({
  baseURL: apiConfig.proxyURL,
  timeout: 5000,
});

const applyInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

applyInterceptors(apiClient);
applyInterceptors(proxyClient);

export { apiClient, proxyClient };
export default apiClient;
