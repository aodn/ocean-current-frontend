import { MapboxGeoJSONFeature, MapMouseEvent, MapRef } from 'react-map-gl';
import { isNotNullOrUndefined } from '@/utils/general';
import { BoundingBox } from '@/types/map';
import { calculateAreaFromCoords } from '@/utils/geo';

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

const isPolygonWithinBounds = (
  polygonCoords: BoundingBox,
  boundsCoords: BoundingBox,
  minThresholdPercentage: number,
  maxThresholdPercentage: number,
): boolean => {
  const polygonArea = calculateAreaFromCoords(polygonCoords);
  const boundsArea = calculateAreaFromCoords(boundsCoords);

  const polygonPercentageOfBounds = (polygonArea / boundsArea) * 100;
  return polygonPercentageOfBounds >= minThresholdPercentage && polygonPercentageOfBounds <= maxThresholdPercentage;
};

export { extractPropertyFromFeatures, getPropertyFromMapFeatures, isPolygonWithinBounds };
