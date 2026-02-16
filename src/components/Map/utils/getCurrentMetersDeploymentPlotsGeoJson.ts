import { CurrentMetersProfileFeature, CurrentMetersProfileFeatureCollection } from '@/types/geo';
import { currentMetersMapDataPointsFlat } from '@/data/current-meter/mapDataPoints';
import {
  deepADCPDeploymentPlotsData,
  deepADVDeploymentPlotsData,
  mooredInstrumentArrayDeploymentPlotsData,
  shelfDeploymentPlotsData,
  southernOceanDeploymentPlotsData,
} from '@/data/current-meter/sidebarOptions';
import { CurrentMetersSubProductsKey } from '@/constants/currentMeters';
import { SubProduct } from '@/types/product';

const getCurrentMetersDeploymentPlotsGeoJson = (subProduct: SubProduct | null) => {
  // filter out deployment points available for selected subproduct
  const dataSetbySubProduct = currentMetersMapDataPointsFlat.filter((point) => {
    switch (subProduct?.key) {
      case CurrentMetersSubProductsKey.SHELF:
        return shelfDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
      case CurrentMetersSubProductsKey.DEEP_ADCP:
        return deepADCPDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
      case CurrentMetersSubProductsKey.DEEP_ADV:
        return deepADVDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
      case CurrentMetersSubProductsKey.SOUTHERN_OCEAN:
        return southernOceanDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
      default:
        return mooredInstrumentArrayDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
    }
  });

  const deploymentPlotsMapFeatures = dataSetbySubProduct.map(({ name, region, coords }, index) => {
    return {
      type: 'Feature',
      id: index,
      properties: {
        title: name,
        region: region,
      },
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
    };
  });

  const currentMetersMapPointsGeoJson: CurrentMetersProfileFeatureCollection = {
    type: 'FeatureCollection',
    features: deploymentPlotsMapFeatures as CurrentMetersProfileFeature[],
  };

  return currentMetersMapPointsGeoJson;
};

export default getCurrentMetersDeploymentPlotsGeoJson;
