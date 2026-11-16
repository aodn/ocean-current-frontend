import type { Feature, FeatureCollection, Polygon } from 'geojson';
import { GLIDERS_DEFAULT_LAYER } from '@/configs/products/gliders-map';
import type { GliderDeployment, GliderDeploymentProperties, GliderYearmap } from '@/types/gliders';
import { convertAreaCoordsToGeoJsonCoordinates } from '@/utils/geo-utils/geo';

/**
 * Picks a map for the requested year/type (latest year by default),
 * preferring near-real-time maps and the default variable/window.
 */
export function selectGliderYearmap(
  maps: GliderYearmap[],
  year?: number,
  platform?: GliderYearmap['platform'],
): GliderYearmap | undefined {
  const latestYear = year ?? Math.max(...maps.map(({ year }) => year));
  const latest = maps.filter((map) => map.year === latestYear && (!platform || map.platform === platform));
  const candidates = latest.some(({ is_nrt }) => is_nrt) ? latest.filter(({ is_nrt }) => is_nrt) : latest;
  return (
    candidates.find(
      ({ variable, window }) => variable === GLIDERS_DEFAULT_LAYER.variable && window === GLIDERS_DEFAULT_LAYER.window,
    ) ?? candidates[0]
  );
}

/** Builds one polygon per deployment from its published bbox. Deployments without bounds are skipped. */
export function buildGliderDeployments(
  deployments: GliderDeployment[],
): FeatureCollection<Polygon, GliderDeploymentProperties> {
  return {
    type: 'FeatureCollection',
    features: deployments.flatMap<Feature<Polygon, GliderDeploymentProperties>>(({ mission_name, bbox }) =>
      bbox === null
        ? []
        : [
            {
              type: 'Feature',
              id: mission_name,
              properties: { id: mission_name, label: mission_name },
              geometry: { type: 'Polygon', coordinates: convertAreaCoordsToGeoJsonCoordinates(bbox) },
            },
          ],
    ),
  };
}

export const GLIDERS_DEPLOYMENTS_URL = '/map/gliders?view=table';

/** Only same-app Gliders map URLs written by the deployments view are followed. */
export function getGlidersReturnTo(state: unknown): string | undefined {
  const returnTo = (state as { glidersReturnTo?: unknown } | null)?.glidersReturnTo;
  return typeof returnTo === 'string' && returnTo.startsWith('/map/gliders?') ? returnTo : undefined;
}
