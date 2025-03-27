import { MapImageAreas } from '@/types/dataImage';

// these don't change and are the same for every graph image
const offY = [101, 181, 261, 341, 421, 501, 581, 661, 741, 821, 901];
const normalY = [51, 136, 221, 306, 391, 476, 561, 646, 731, 816, 901];

const parseSealCtdTagData = (input: string) => {
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

export { parseSealCtdTagData };
