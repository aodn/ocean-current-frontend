export const apiConfig = {
  backendURL: import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8080/api/v1',
  proxyURL: import.meta.env.VITE_API_PROXY_URL || '/api',
};
