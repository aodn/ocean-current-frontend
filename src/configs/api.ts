export const apiConfig = {
  backendURL: import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8080/api/v1',
  ec2ProxyURL: import.meta.env.VITE_API_EC2_PROXY_URL || '/ec2',
  s3ProxyURL: import.meta.env.VITE_API_S3_PROXY_URL || '/s3',
};
