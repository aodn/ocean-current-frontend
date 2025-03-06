import { Dayjs } from 'dayjs';
import { ContentType } from '@/constants/request';
import { buildTidalCurrentsTagFileUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { proxyClient } from './httpClient';

const getTidalCurrentsTagsData = async (date: Dayjs, subProduct: string, region: string) => {
  if (!subProduct || !region || !date) {
    console.error('The subProduct, region and date are required to get Tidal Currents TAG file.');
    return [];
  }

  const url = buildTidalCurrentsTagFileUrl(region, subProduct, date);

  try {
    const htmlString = await proxyClient.get<string>(url, {
      headers: {
        'Content-Type': ContentType.Text,
      },
    });

    const areaMatches = htmlString.data.matchAll(/<area\s+([^>]+)>/g);

    return Array.from(areaMatches).map((match) => {
      const attributes: Record<string, string | number[]> = {};
      const attrMatches = match[1].matchAll(/(\w+)="([^"]+)"/g);

      for (const attr of attrMatches) {
        if (attr[1] !== 'target') {
          const attrName = attr[1] === 'title' ? 'name' : attr[1];
          attributes[attrName] =
            attr[1] === 'coords'
              ? attr[2].split(/\s+/).map(Number) // Convert coords to an array of numbers
              : attr[2];
        }
      }

      attributes['type'] = 'point';
      return attributes;
    });
  } catch (error) {
    console.error('Error fetching and parsing Tidal Currents TAG data - ', error);
    throw new Error('Error fetching and parsing Tidal Currents TAG data');
  }
};

export { getTidalCurrentsTagsData };
