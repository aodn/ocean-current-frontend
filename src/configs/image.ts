export const imageBaseUrl = 'https://oceancurrent.aodn.org.au';

export const imageUrlConfig = {
  imageBaseUrl,
  imageS3BaseUrl: import.meta.env.VITE_API_S3_PROXY_URL || '/s3',
};
