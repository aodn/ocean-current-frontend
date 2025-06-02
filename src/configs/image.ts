export const imageBaseUrl = 'https://oceancurrent.aodn.org.au';
export const imageS3BaseUrl = 'https://oceancurrent.aodn.org.au/storage';

export const imageUrlConfig = {
  imageBaseUrl,
  imageS3BaseUrl: import.meta.env.VITE_API_S3_PROXY_URL || imageS3BaseUrl,
};
