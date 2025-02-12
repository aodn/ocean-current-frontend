import { CurrentMetersImageDataPoints } from '@/types/currentMeters';

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
  originalAreas: CurrentMetersImageDataPoints[],
  scaleX: number,
  scaleY: number,
): CurrentMetersImageDataPoints[] => {
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

export { isNotNullOrUndefined, calculateImageScales, scaleImageMapAreas };
