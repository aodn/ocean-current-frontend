import { apiConfig } from '@/configs/api';

// this is only temporary and can be removed when the API is implemented
// at the moment, there is no way of checking if the urls are valid other than attempt fetching
const validateSealCtdImgUrl = async (urls: string[]): Promise<string[]> => {
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(apiConfig.proxyURL + url, { method: 'HEAD' });
        if (response.ok) {
          return url;
        } else {
          return '';
        }
      } catch (error) {
        console.error(error);
        return '';
      }
    }),
  );

  return results.filter((url) => url);
};
export { validateSealCtdImgUrl };
