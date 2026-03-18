import { ec2ProxyClient } from '@/services/httpClient';
import { ContentType } from '@/constants/request';
import { CurrentMetersPlotPath, CurrentMetersSubProductsKeyType } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';

const getCurrentMetersPlotsList = async (
  subProductKey: CurrentMetersSubProductsKeyType,
  deploymentPlot: CurrentMetersDeploymentPlotNames,
  type: CurrentMetersPlotPath,
) => {
  if (!subProductKey || !deploymentPlot) {
    console.error('Missing sub product and/or deployment plot information.');
    return [];
  }

  const folder = subProductKey === 'currentMeters-shelf' ? 'ANMN_P49' : 'ANMN_P48';

  try {
    const htmlString = await ec2ProxyClient.get<string>(`timeseries/${folder}/${deploymentPlot}/${type}/`, {
      headers: {
        'Content-Type': ContentType.TEXT,
      },
    });

    const ulRegex = /<ul[^>]*>([\s\S]*?)<\/ul>/i;
    const ulMatch = htmlString.data.match(ulRegex);

    if (!ulMatch) {
      console.error(`No ${type} plots list for deployment plot ${deploymentPlot} for option ${subProductKey} found.`);
      return [];
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

export { getCurrentMetersPlotsList };
