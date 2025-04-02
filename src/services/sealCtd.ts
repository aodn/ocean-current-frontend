import { apiConfig } from '@/configs/api';
import { ContentType } from '@/constants/request';
import { proxyClient } from './httpClient';

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

const getSealCtdGraphTags = async (imageUrl: string) => {
  const tagUrl = imageUrl.replace('timeseries', 'timeseries_tag').replace('gif', 'txt');

  try {
    const response = await proxyClient.get<string>(tagUrl, {
      headers: {
        'Content-Type': ContentType.Text,
      },
    });

    if (response.data && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch SealCTD graph image TAG file.');
  }
};

export { validateSealCtdImgUrl, getSealCtdGraphTags };
