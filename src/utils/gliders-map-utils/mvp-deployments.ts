import type { Feature, FeatureCollection, Polygon } from 'geojson';
import { GLIDERS_MVP_RECTANGLE_SIZES } from '@/configs/products/gliders-map-mvp';
import type { GliderMission, GliderDeploymentProperties } from '@/types/gliders';
import { convertAreaCoordsToGeoJsonCoordinates } from '@/utils/geo-utils/geo';

export function buildMvpDeployments(missions: GliderMission[]): FeatureCollection<Polygon, GliderDeploymentProperties> {
  return {
    type: 'FeatureCollection',
    features: Object.entries(GLIDERS_MVP_RECTANGLE_SIZES).flatMap<Feature<Polygon, GliderDeploymentProperties>>(
      ([name, { width, height }]) => {
        const mission = missions.find(({ mission_name }) => mission_name === name);
        if (!mission || mission.latitude === null || mission.longitude === null) return [];
        const { longitude, latitude } = mission;
        if (
          !Number.isFinite(longitude) ||
          !Number.isFinite(latitude) ||
          Math.abs(longitude) > 180 ||
          Math.abs(latitude) > 90
        )
          return [];
        const west = longitude - width / 2;
        const east = longitude + width / 2;
        const south = latitude - height / 2;
        const north = latitude + height / 2;
        return [
          {
            type: 'Feature',
            id: name,
            properties: {
              id: name,
              label: name,
            },
            geometry: {
              type: 'Polygon',
              coordinates: convertAreaCoordsToGeoJsonCoordinates([west, south, east, north]),
            },
          },
        ];
      },
    ),
  };
}
