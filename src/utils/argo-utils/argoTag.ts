import { argoTagFilePaths } from '@/constants/argo';
import {
  ImageTagMapArea,
  ImageTag,
  ArgoImageTag,
  SoopImageTag,
  StateLocalPathValue,
  FishSoopImageTag,
  ANMNImageTag,
} from '@/types/argo';
import { MapImageAreas } from '@/types/dataImage';
import { ProductID } from '@/types/product';

const getArgoTagFilePathByProductId = (productId: ProductID): StateLocalPathValue | undefined => {
  return argoTagFilePaths[productId];
};

const checkProductHasArgoTags = (productId: ProductID): boolean => {
  return !!argoTagFilePaths[productId];
};

const parseLine = (line: string): ImageTag | null => {
  const parts = line.trim().split(/\s+/);
  const type = parts[0];

  if (type === 'Argo' && parts.length >= 7) {
    return {
      type: 'Argo',
      coordX: parseFloat(parts[1]),
      coordY: parseFloat(parts[2]),
      wmoId: parseInt(parts[3]),
      cycle: parseInt(parts[4]),
      institution: parts[5],
      dataSource: parts[6],
    } as ArgoImageTag;
  }
  if (type === 'SOOP' && parts.length >= 4) {
    return {
      type: 'SOOP',
      coordX: parseFloat(parts[1]),
      coordY: parseFloat(parts[2]),
      shipName: parts[3],
    } as SoopImageTag;
  }
  if (type === 'FishSOOP' && parts.length >= 7) {
    const [region, year, date] = parts[3].split('/');
    return {
      type: 'FishSOOP',
      coordX: parseFloat(parts[1]),
      coordY: parseFloat(parts[2]),
      region,
      year,
      date,
    } as FishSoopImageTag;
  }
  if (type === 'ANMN' && parts.length >= 4) {
    return {
      type: 'ANMN',
      coordX: parseFloat(parts[1]),
      coordY: parseFloat(parts[2]),
      shipName: parts[3],
    } as ANMNImageTag;
  }
  return null;
};

const parseImageTagsFromText = (input: string): ImageTag[] => {
  return input
    .trim()
    .split('\n')
    .map(parseLine)
    .filter((tag): tag is ImageTag => tag !== null);
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
