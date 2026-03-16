import { argoTagFilePaths } from '@/constants/argo';
import { ImageTagMapArea, ImageTag, StateLocalPathValue } from '@/types/argo';
import { MapImageAreas } from '@/types/dataImage';
import { ProductID } from '@/types/product';

const getArgoTagFilePathByProductId = (productId: ProductID): StateLocalPathValue | undefined => {
  return argoTagFilePaths[productId];
};

const checkProductHasArgoTags = (productId: ProductID): boolean => {
  return !!argoTagFilePaths[productId];
};

const parseImageTagsFromText = (input: string): ImageTag[] => {
  const lines = input.trim().split('\n');
  const result: ImageTag[] = [];

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    const type = parts[0];

    if (type === 'Argo' && parts.length >= 7) {
      result.push({
        type,
        coordX: parseFloat(parts[1]),
        coordY: parseFloat(parts[2]),
        wmoId: parseInt(parts[3]),
        cycle: parseInt(parts[4]),
        institution: parts[5],
        dataSource: parts[6],
      });
    } else if (type === 'SOOP' && parts.length >= 4) {
      result.push({
        type,
        coordX: parseFloat(parts[1]),
        coordY: parseFloat(parts[2]),
        shipName: parts[3],
      });
    }
  }

  return result;
};

const convertCoordsBasedOnImageScale = (
  originalCoords: MapImageAreas[] | ImageTagMapArea[],
  scaleX: number,
  scaleY: number,
  originalHeight: number,
) => {
  return originalCoords.map((area) => ({
    ...area,
    coords: area.coords.map((coord, index) => (index % 2 === 0 ? coord * scaleX : (originalHeight - coord) * scaleY)),
  }));
};

export {
  getArgoTagFilePathByProductId,
  checkProductHasArgoTags,
  parseImageTagsFromText,
  convertCoordsBasedOnImageScale,
};
