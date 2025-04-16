import { ArgoTagMapArea } from '@/types/argo';
import { MapImageAreas } from '@/types/dataImage';

// these don't change and are the same for every graph image
const offY = [101, 181, 261, 341, 421, 501, 581, 661, 741, 821, 901];
const normalY = [51, 136, 221, 306, 391, 476, 561, 646, 731, 816, 901];

const parseSealCtdGraphTagData = (input: string) => {
  const lines = input.trim().split('\n');
  const result: MapImageAreas[] = [];
  const secondYCoords = lines[1] && lines[1].trim().split(/\s+/)[2]; // this will the determinant if the coords are off or not

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\s+/);
    const x1 = parseFloat(parts[1]);
    const y1 = secondYCoords === '816' ? normalY[i] + 48 : offY[i] - 2;
    const x2 = x1 + parseFloat(parts[3]);
    const y2 = y1 - parseFloat(parts[4]);

    result.push({
      shape: 'rect',
      coords: [x1, y1, x2, y2],
      href: '#',
      alt: parts[0],
      name: parts[0],
      type: 'graph',
    });
  }

  return result;
};

const parseArgoAndSealLocationsTagData = (input: string) => {
  const lines = input.trim().split('\n');
  const argoTags: ArgoTagMapArea[] = [];
  const sealTags: MapImageAreas[] = [];

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\s+/);
    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);

    if (parts[0] === 'Argo') {
      argoTags.push({
        shape: 'circle',
        coords: [x, y, 5],
        href: '#',
        wmoId: parseFloat(parts[3]),
        cycle: parseFloat(parts[4]),
      });
    }

    if (parts[0] === 'SealCTD') {
      sealTags.push({
        shape: 'circle',
        coords: [x, y, 5],
        href: '#',
        alt: parts[3],
        name: parts[3],
        type: 'seal-tag',
      });
    }
  }

  return { argoTags, sealTags };
};

export { parseSealCtdGraphTagData, parseArgoAndSealLocationsTagData };
