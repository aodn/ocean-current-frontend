import { useMemo } from 'react';
import { calculateAreaFromCoords, convertAreaCoordsToGeoJsonCoordinates } from '@/utils/geo-utils/geo';
import { stringToHash } from '@/utils/math-utils/math';
import { RegionPolygonFeatureCollection } from '@/types/geo';
import { Region } from '../types/map.types';
import useRegionFromProduct from './useRegionFromProduct';

const useRegionPolygons = () => {
  const { regions } = useRegionFromProduct();

  const features = useMemo(() => {
    const sortedRegions = regions.sort((a, b) => {
      const areaA = calculateAreaFromCoords(a.coords);
      const areaB = calculateAreaFromCoords(b.coords);
      return areaB - areaA;
    });

    return sortedRegions.map(({ title, code, coords }: Region) => {
      return {
        type: 'Feature',
        id: stringToHash(title),
        properties: {
          name: title,
          code,
        },
        geometry: {
          type: 'Polygon',
          coordinates: convertAreaCoordsToGeoJsonCoordinates(coords),
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(regions)]);

  const regionGeoJsonData = {
    type: 'FeatureCollection',
    features: features,
  } as RegionPolygonFeatureCollection;

  return regionGeoJsonData;
};

export default useRegionPolygons;
