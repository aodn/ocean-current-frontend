import { apiConfig } from './api';

export const imageBaseUrl = 'https://oceancurrent.aodn.org.au';

export const imageUrlConfig = {
  imageBaseUrl,
  imageS3BaseUrl: apiConfig.s3ProxyURL,
};
