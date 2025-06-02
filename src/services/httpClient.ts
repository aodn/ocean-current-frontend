import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '@/configs/api';

const apiClient = axios.create({
  baseURL: apiConfig.backendURL,
  timeout: 5000,
});

const ec2ProxyClient = axios.create({
  baseURL: apiConfig.ec2ProxyURL,
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
applyInterceptors(ec2ProxyClient);

export { apiClient, ec2ProxyClient };
export default apiClient;
