import useMapStore from '@/stores/map-store/mapStore';
import { calculateAreaFromCoords, convertAreaCoordsToGeoJsonCoordinates } from '../utils/region';
import { Region } from '../types/map.types';
import useRegionFromProduct from './useRegionFromProduct';

const useRegionData = () => {
  const { zoom } = useMapStore((state) => state.mapViewState);
  const { regions } = useRegionFromProduct();

  const sortedRegions = regions.sort((a, b) => {
    const areaA = calculateAreaFromCoords(a.coords);
    const areaB = calculateAreaFromCoords(b.coords);
    // TODO: larger regions should be selected by mouse hover, check which order is correct
    return areaA - areaB;
  });

  const calculateZoomLevel = (area: number) => {
    let level;
    const areaNum: number = Math.floor(area);

    switch (true) {
      case areaNum < 20:
        level = 1;
        break;
      case areaNum >= 20 && areaNum < 60:
        level = 2;
        break;
      case areaNum >= 60 && areaNum < 100:
        level = 3;
        break;
      case areaNum >= 100 && areaNum < 200:
        level = 4;
        break;
      case areaNum >= 200 && areaNum < 700:
        level = 5;
        break;
      case areaNum >= 700:
        level = 6;
        break;
      default:
        level = 1;
    }

    const maxZoom = 5.6;
    const minZoom = 2;
    const zoomRange = maxZoom - minZoom;
    const zoomInterval = zoomRange / 6;
    const zoomLevel = maxZoom - zoomInterval * level;
    return zoomLevel;
  };

  const filterRegionsByZoom = (regions: Region[], zoom: number) => {
    return regions.filter(({ coords }) => {
      const area = calculateAreaFromCoords(coords);

      const zoomLevel = calculateZoomLevel(area);
      return zoomLevel > zoom - 1 && zoomLevel <= zoom;
    });
  };

  const filteredFeatures = filterRegionsByZoom(sortedRegions, zoom).map((area, index) => ({
    type: 'Feature',
    id: index,
    properties: {
      name: area.title,
    },
    geometry: {
      type: 'Polygon',
      coordinates: convertAreaCoordsToGeoJsonCoordinates(area.coords),
    },
  }));

  const regionGeoCollection = {
    type: 'FeatureCollection',
    features: filteredFeatures,
  } as GeoJSON.FeatureCollection;

  return { regionData: regionGeoCollection };
};

export default useRegionData;
