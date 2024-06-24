import { useState, useEffect } from 'react';
import { LngLatBounds } from 'react-map-gl';
import { calculateAreaFromCoords, convertAreaCoordsToGeoJsonCoordinates } from '../utils/regionUtils';
import useRegionFromProduct from './useRegionFromProduct';

const isPolygonWithinBounds = (
  coords: [number, number, number, number],
  bounds: LngLatBounds,
  minThresholdPercentage: number,
  maxThresholdPercentage: number,
): boolean => {
  const polygonArea = calculateAreaFromCoords(coords);

  const boundCoords = [bounds.getWest(), bounds.getEast(), bounds.getSouth(), bounds.getNorth()];
  const boundsArea = calculateAreaFromCoords(boundCoords);

  const polygonPercentageOfBounds = (polygonArea / boundsArea) * 100;
  return polygonPercentageOfBounds >= minThresholdPercentage && polygonPercentageOfBounds <= maxThresholdPercentage;
};

const useVisibleRegionPolygons = (
  bounds: LngLatBounds | null,
  minThresholdPercentage = 0.1,
  maxThresholdPercentage = 100,
) => {
  const { regions } = useRegionFromProduct();

  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection>({
    type: 'FeatureCollection',
    features: [] as GeoJSON.Feature[],
  });

  useEffect(() => {
    if (!bounds) return;
    const sortedRegions = regions.sort((a, b) => {
      const areaA = calculateAreaFromCoords(a.coords);
      const areaB = calculateAreaFromCoords(b.coords);
      return areaB - areaA;
    });
    const newV = sortedRegions.filter(({ coords }) =>
      isPolygonWithinBounds(coords, bounds, minThresholdPercentage, maxThresholdPercentage),
    );

    const features: GeoJSON.Feature[] = newV.map(({ title, coords }, index) => ({
      type: 'Feature',
      id: index,
      properties: {
        name: title,
      },
      geometry: {
        type: 'Polygon',
        coordinates: convertAreaCoordsToGeoJsonCoordinates(coords),
      },
    }));

    setGeoJsonData({
      type: 'FeatureCollection',
      features,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, minThresholdPercentage, maxThresholdPercentage, JSON.stringify(regions)]);

  return geoJsonData;
};

export default useVisibleRegionPolygons;
