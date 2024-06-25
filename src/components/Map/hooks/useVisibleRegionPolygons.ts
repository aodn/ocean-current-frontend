import { useState, useEffect } from 'react';
import { LngLatBounds } from 'react-map-gl';
import { BoundingBoxCoords } from '@/types/map';
import { calculateAreaFromCoords, convertAreaCoordsToGeoJsonCoordinates } from '../utils/regionUtils';
import { isPolygonWithinBounds } from '../utils/mapUtils';
import useRegionFromProduct from './useRegionFromProduct';

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

    const boundCoords = [bounds.getWest(), bounds.getEast(), bounds.getSouth(), bounds.getNorth()] as BoundingBoxCoords;

    const sortedRegions = regions.sort((a, b) => {
      const areaA = calculateAreaFromCoords(a.coords);
      const areaB = calculateAreaFromCoords(b.coords);
      return areaB - areaA;
    });
    const visibleRegions = sortedRegions.filter(({ coords }) =>
      isPolygonWithinBounds(coords, boundCoords, minThresholdPercentage, maxThresholdPercentage),
    );

    const features: GeoJSON.Feature[] = visibleRegions.map(({ title, coords }, index) => ({
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
