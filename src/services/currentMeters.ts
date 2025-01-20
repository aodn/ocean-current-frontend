import httpClient from '@/services/httpClient';
import { ContentType } from '@/constants/request';

const getCurrentMetersPlots = async (subproduct: string, deploymentPlot: string, type: string) => {
  if (!subproduct || !deploymentPlot) {
    throw new Error('Mising subproduct and/or deployment plot information.');
  }

  const folder = subproduct === 'currentMeters-shelf' ? 'ANMN_P49' : 'ANMN_P48';
  const dataType = type === 'depth-time' ? 'zt' : 'xyz';

  try {
    const htmlString = await httpClient.get<string>(`timeseries/${folder}/${deploymentPlot}/${dataType}/`, {
      headers: {
        'Content-Type': ContentType.Text,
      },
    });

    const ulRegex = /<ul[^>]*>([\s\S]*?)<\/ul>/i;
    const ulMatch = htmlString.data.match(ulRegex);

    if (!ulMatch) {
      throw new Error(`No ${type} plots list for deployment plot ${deploymentPlot} for option ${subproduct} found.`);
    }

    const ulHtml = ulMatch[0];
    const listItemRegex = /<a[^>]*>(.*?)<\/a>/g;
    const listItems = [...ulHtml.matchAll(listItemRegex)].map((match) => match[1].trim().replace('.gif', ''));

    return listItems;
  } catch (error) {
    console.error('Error fetching and parsing HTML:', error);
    throw new Error('Failed to fetch or parse the HTML content.');
  }
};

export { getCurrentMetersPlots };
