import { argoTagFilePaths } from '@/constants/argoTagPath';
import { ArgoTagMapArea, ArgoTag, StateLocalPathValue } from '@/types/argo';

const getArgoTagFilePathByProductId = (productId: string): StateLocalPathValue | undefined => {
  return argoTagFilePaths[productId];
};

const checkProductHasArgoTags = (productId: string): boolean => {
  return !!argoTagFilePaths[productId];
};

const parseArgoTagDataFromText = (input: string): ArgoTag[] => {
  const lines = input.trim().split('\n');
  const result: ArgoTag[] = [];

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
    }
  }

  return result;
};

const convertCoordsBasedOnImageScale = (
  originalCoords: ArgoTagMapArea[],
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
  parseArgoTagDataFromText,
  convertCoordsBasedOnImageScale,
};
