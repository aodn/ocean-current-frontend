import { useState, useEffect, useMemo } from 'react';
import { LngLatBounds } from 'react-map-gl';
import { BoundingBox } from '@/types/map';
import { calculateAreaFromCoords, convertAreaCoordsToGeoJsonCoordinates } from '@/utils/geo';
import { isPolygonWithinBounds } from '../utils/mapUtils';
import useRegionFromProduct from './useRegionFromProduct';

const useVisibleRegionPolygons = (
  mapBounds: LngLatBounds | null,
  minThresholdPercentage = 0.1,
  maxThresholdPercentage = 100,
) => {
  const { regions } = useRegionFromProduct();

  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection>({
    type: 'FeatureCollection',
    features: [] as GeoJSON.Feature[],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedRegions = useMemo(() => regions, [JSON.stringify(regions)]);

  useEffect(() => {
    if (!mapBounds) return;

    const mapBoundCoords = [
      mapBounds.getWest(),
      mapBounds.getSouth(),
      mapBounds.getEast(),
      mapBounds.getNorth(),
    ] as BoundingBox;

    const sortedRegions = memoizedRegions.sort((a, b) => {
      const areaA = calculateAreaFromCoords(a.coords);
      const areaB = calculateAreaFromCoords(b.coords);
      return areaB - areaA;
    });
    const visibleRegions = sortedRegions.filter(({ coords: regionCoords }) =>
      isPolygonWithinBounds(regionCoords, mapBoundCoords, minThresholdPercentage, maxThresholdPercentage),
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
  }, [mapBounds, minThresholdPercentage, maxThresholdPercentage, memoizedRegions]);

  return geoJsonData;
};

export default useVisibleRegionPolygons;
