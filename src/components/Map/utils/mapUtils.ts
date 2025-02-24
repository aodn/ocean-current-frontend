import { MapboxGeoJSONFeature, MapMouseEvent, MapRef } from 'react-map-gl';
import { isNotNullOrUndefined } from '@/utils/general-utils/general';
import { CurrentMetersSubproductsKey } from '@/constants/currentMeters';
import {
  deepADCPDeploymentPlotsData,
  deepADVDeploymentPlotsData,
  mooredInstrumentArrayDeploymentPlotsData,
  shelfDeploymentPlotsData,
  southernOceanDeploymentPlotsData,
} from '@/data/current-meter/sidebarOptions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractPropertyFromFeatures = <T extends Record<string, any>>(
  features: MapboxGeoJSONFeature[],
  propNames: (keyof T)[],
): T => {
  const result: Partial<T> = {};

  if (features.length > 0 && features[0].properties) {
    for (const propName of propNames) {
      const propValue = features[0].properties[propName as string];
      if (!isNotNullOrUndefined(propValue)) {
        throw new Error(`Property ${propValue} is not found in the features`);
      }
      result[propName] = propValue;
    }
  } else {
    throw new Error('Features are empty or properties are not found in the features');
  }

  return result as T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPropertyFromMapFeatures = <T extends Record<string, any>>(
  map: MapRef,
  event: MapMouseEvent,
  layerId: string,
  propName: (keyof T)[],
): T => {
  const features = map.queryRenderedFeatures(event.point, { layers: [layerId] }) as MapboxGeoJSONFeature[];

  return extractPropertyFromFeatures<T>(features, propName);
};

const getDeploymentPlotsBySubProduct = (subProductKey: string) => {
  if (!subProductKey) return mooredInstrumentArrayDeploymentPlotsData;

  switch (subProductKey) {
    case CurrentMetersSubproductsKey.SHELF:
      return shelfDeploymentPlotsData;
    case CurrentMetersSubproductsKey.DEEP_ADCP:
      return deepADCPDeploymentPlotsData;
    case CurrentMetersSubproductsKey.DEEP_ADV:
      return deepADVDeploymentPlotsData;
    case CurrentMetersSubproductsKey.SOUTHERN_OCEAN:
      return southernOceanDeploymentPlotsData;
    default:
      return mooredInstrumentArrayDeploymentPlotsData;
  }
};

export { extractPropertyFromFeatures, getPropertyFromMapFeatures, getDeploymentPlotsBySubProduct };
