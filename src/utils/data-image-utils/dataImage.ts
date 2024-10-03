import { ImageMapArea } from '@/types/dataImage';

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

const scaleImageMapAreaCoordinates = <T extends ImageMapArea>(
  originalAreas: T[],
  scaleX: number,
  scaleY: number,
): T[] => {
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

const scaleImageMapAreas = <T extends ImageMapArea>(
  originalWidth: number,
  originalHeight: number,
  displayWidth: number,
  displayHeight: number,
  originalAreas: T[],
) => {
  const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, displayWidth, displayHeight);
  const convertedCoords = scaleImageMapAreaCoordinates(originalAreas, scaleX, scaleY);

  return convertedCoords;
};

export { calculateImageScales, scaleImageMapAreaCoordinates, scaleImageMapAreas };
