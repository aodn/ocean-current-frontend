import { LngLatBoundsLike } from 'mapbox-gl';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import { validateCoords } from '@/utils/validators/map';

const calculateAreaFromCoords = (coords: BoundingBox, shouldValidate: boolean = true) => {
  if (shouldValidate) {
    validateCoords(coords);
  }
  const [westLongitude, southLatitude, eastLongitude, northLatitude] = coords;
  return Math.abs((eastLongitude - westLongitude) * (northLatitude - southLatitude));
};

/**
 * Converts a list of four coordinates representing the corners of a bounding box
 * into a GeoJSON Polygon representation.
 *
 * @param {BoundingBox} coords An array of four numbers representing the coordinates
 * of the bounding box in the order [west, south, east, north].
 * @returns {GeoJsonPolygon} A GeoJSON Polygon object as an array of arrays, representing
 * the bounding box defined by the input coordinates.
 */
const convertAreaCoordsToGeoJsonCoordinates = (coords: BoundingBox): GeoJsonPolygon => {
  const [westLongitude, southLatitude, eastLongitude, northLatitude] = coords;

  return [
    [
      [westLongitude, northLatitude],
      [eastLongitude, northLatitude],
      [eastLongitude, southLatitude],
      [westLongitude, southLatitude],
      [westLongitude, northLatitude],
    ],
  ];
};

const convertGeoJsonCoordinatesToBBox = (geoJsonPolygon: GeoJsonPolygon): BoundingBox => {
  const coordinates = geoJsonPolygon[0];

  if (coordinates.length < 5) {
    throw new Error('Invalid GeoJsonPolygon: must contain at least 5 coordinate pairs');
  }

  const [westLongitude, northLatitude] = coordinates[0];
  const [eastLongitude] = coordinates[1];
  const [, southLatitude] = coordinates[2];

  return [westLongitude, southLatitude, eastLongitude, northLatitude];
};

const convertOldOceanCurrentCoordsToBBox = (coords: number[]): BoundingBox => {
  const [westLongitude, eastLongitude, southLatitude, northLatitude] = coords;
  return [westLongitude, southLatitude, eastLongitude, northLatitude];
};

const calculateOffsetByCoords = (
  coords: number[],
  imageParameter: {
    imageWidth: number;
    imageHeight: number;
    imageBounds: number[];
  },
): number[] => {
  const { imageWidth, imageHeight, imageBounds } = imageParameter;
  const imageToGeo = (x: number, y: number) => {
    const longitude = imageBounds[0] + (x / imageWidth) * (imageBounds[1] - imageBounds[0]);
    const latitude = imageBounds[3] + (y / imageHeight) * (imageBounds[2] - imageBounds[3]);
    return { longitude, latitude };
  };
  const [x1, y1, x2, y2] = coords;
  const topLeftGeo = imageToGeo(x1, y1);
  const bottomRightGeo = imageToGeo(x2, y2);
  return [topLeftGeo.longitude, topLeftGeo.latitude, bottomRightGeo.longitude, bottomRightGeo.latitude];
};

const calculateCenterByCoords = (coords: number[]): number[] => {
  const [x1, y1, x2, y2] = coords;
  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

const getBoundsFromCoordsArray = (coordinates: [number, number][]): LngLatBoundsLike => {
  if (!coordinates.length) {
    throw new Error('Coordinates array cannot be empty');
  }
  const bounds = {
    minLng: coordinates[0][0],
    maxLng: coordinates[0][0],
    minLat: coordinates[0][1],
    maxLat: coordinates[0][1],
  };

  coordinates.forEach(([lng, lat]) => {
    bounds.minLng = Math.min(bounds.minLng, lng);
    bounds.maxLng = Math.max(bounds.maxLng, lng);
    bounds.minLat = Math.min(bounds.minLat, lat);
    bounds.maxLat = Math.max(bounds.maxLat, lat);
  });

  return [
    [bounds.minLng, bounds.minLat],
    [bounds.maxLng, bounds.maxLat],
  ];
};

// ============================================================================
// Mercator projection utilities
// ============================================================================

/**
 * Converts degrees to radians.
 */
const toRadians = (deg: number): number => (deg * Math.PI) / 180;

/**
 * Converts radians to degrees.
 */
const toDegrees = (rad: number): number => (rad * 180) / Math.PI;

/**
 * Converts a latitude (in degrees) to Web Mercator Y coordinate.
 * This is useful for calculating visually balanced margins on a Mercator map.
 */
const latitudeToMercatorY = (lat: number): number => {
  return Math.log(Math.tan(Math.PI / 4 + toRadians(lat) / 2));
};

/**
 * Converts a Web Mercator Y coordinate back to latitude (in degrees).
 */
const mercatorYToLatitude = (y: number): number => {
  return toDegrees(2 * Math.atan(Math.exp(y)) - Math.PI / 2);
};

// ============================================================================
// Bounds expansion utilities
// ============================================================================

/** Default base expansion factor (20% of the span) */
const DEFAULT_EXPANSION_FACTOR = 0.2;

/** Default multiplier for longitude expansion relative to base factor */
const DEFAULT_LNG_EXPANSION_MULTIPLIER = 1.2;

/** Default minimum longitude margin in degrees */
const DEFAULT_MIN_LNG_MARGIN = 5;

interface ExpandBoundsOptions {
  /** Base expansion factor (default: DEFAULT_EXPANSION_FACTOR = 0.2 = 20%) */
  expansionFactor?: number;
  /** Multiplier for longitude expansion relative to base factor (default: DEFAULT_LNG_EXPANSION_MULTIPLIER = 1.2) */
  lngExpansionMultiplier?: number;
  /** Minimum longitude margin in degrees (default: DEFAULT_MIN_LNG_MARGIN = 5) */
  minLngMargin?: number;
}

/**
 * Expands bounds by a percentage, using Mercator-aware latitude expansion
 * for visually balanced margins on a Web Mercator map.
 *
 * @param bounds - The original bounds as [[minLng, minLat], [maxLng, maxLat]]
 * @param options - Expansion options
 * @returns Expanded bounds
 */
const expandBoundsWithMercatorMargin = (
  bounds: LngLatBoundsLike,
  options: ExpandBoundsOptions = {},
): LngLatBoundsLike => {
  const {
    expansionFactor = DEFAULT_EXPANSION_FACTOR,
    lngExpansionMultiplier = DEFAULT_LNG_EXPANSION_MULTIPLIER,
    minLngMargin = DEFAULT_MIN_LNG_MARGIN,
  } = options;

  const [[minLng, minLat], [maxLng, maxLat]] = bounds as [[number, number], [number, number]];

  // Calculate longitude margin with minimum threshold
  const lngSpan = maxLng - minLng || 1;
  const lngExpansionFactor = expansionFactor * lngExpansionMultiplier;
  const lngMargin = Math.max(lngSpan * lngExpansionFactor, minLngMargin);

  // Calculate latitude margin in Mercator space for visual balance
  const yMin = latitudeToMercatorY(minLat);
  const yMax = latitudeToMercatorY(maxLat);
  const ySpan = yMax - yMin || 1;
  const yMargin = ySpan * expansionFactor;

  const expandedMinLat = mercatorYToLatitude(yMin - yMargin);
  const expandedMaxLat = mercatorYToLatitude(yMax + yMargin);

  return [
    [minLng - lngMargin, expandedMinLat],
    [maxLng + lngMargin, expandedMaxLat],
  ];
};

export {
  calculateAreaFromCoords,
  convertAreaCoordsToGeoJsonCoordinates,
  convertGeoJsonCoordinatesToBBox,
  convertOldOceanCurrentCoordsToBBox,
  calculateOffsetByCoords,
  calculateCenterByCoords,
  getBoundsFromCoordsArray,
  toRadians,
  toDegrees,
  latitudeToMercatorY,
  mercatorYToLatitude,
  expandBoundsWithMercatorMargin,
  DEFAULT_EXPANSION_FACTOR,
  DEFAULT_LNG_EXPANSION_MULTIPLIER,
  DEFAULT_MIN_LNG_MARGIN,
};

export type { ExpandBoundsOptions };
