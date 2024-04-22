import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API || '/api',
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
