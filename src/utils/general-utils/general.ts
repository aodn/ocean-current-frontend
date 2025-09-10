import { MapImageAreas } from '@/types/dataImage';

const isNotNullOrUndefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

const calculateImageScales = (
  originalWidth: number,
  originalHeight: number,
  displayWidth: number,
  displayHeight: number,
) => {
  const scaleX = displayWidth / originalWidth;
  const scaleY = displayHeight / originalHeight;

  return { scaleX, scaleY };
};

const scaleImageMapAreaCoordinates = (
  originalAreas: MapImageAreas[],
  scaleX: number,
  scaleY: number,
): MapImageAreas[] => {
  return originalAreas.map((area) => {
    if (area.shape === 'rect' || area.shape === 'poly')
      return {
        ...area,
        coords: area.coords.map((coord, index) => (index % 2 === 0 ? coord * scaleX : coord * scaleY)),
      };

    if (area.shape === 'circle') {
      const [x, y, r] = area.coords;
      return {
        ...area,
        coords: [x * scaleX, y * scaleY, r],
      };
    }

    return area;
  });
};

const scaleImageMapAreas = (
  originalWidth: number,
  originalHeight: number,
  displayWidth: number,
  displayHeight: number,
  originalAreas: [],
) => {
  const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, displayWidth, displayHeight);
  const convertedCoords = scaleImageMapAreaCoordinates(originalAreas, scaleX, scaleY);

  return convertedCoords;
};

/**
 * Convert a kebab-case (or mixed) string into camelCase.
 * Example: "sealCtd-sealTracks" -> "sealCtdSealTracks"
 */
function toCamelCase(input: string): string {
  return input
    .split(/[-_\s]+/)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
}

export { isNotNullOrUndefined, calculateImageScales, scaleImageMapAreas, toCamelCase };
