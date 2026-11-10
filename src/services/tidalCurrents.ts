import { ContentType } from '@/constants/request';
import { ec2ProxyClient } from './httpClient';

const createTagsObjArray = (areaMatches: RegExpStringIterator<RegExpExecArray>) => {
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
};

const getTidalCurrentsTagsData = async (tagFileUrl: string) => {
  if (!tagFileUrl) {
    console.error('The Tidal Currents TAG file url is required.');
    return [];
  }

  try {
    const htmlString = await ec2ProxyClient.get<string>(tagFileUrl, {
      headers: {
        'Content-Type': ContentType.TEXT,
      },
    });

    const areaMatches = htmlString.data.matchAll(/<area\s+([^>]+)>/g);

    return createTagsObjArray(areaMatches);
  } catch (error) {
    console.error('Error fetching and parsing Tidal Currents TAG data - ', error);
    throw new Error('Error fetching and parsing Tidal Currents TAG data');
  }
};

export { getTidalCurrentsTagsData, createTagsObjArray };
