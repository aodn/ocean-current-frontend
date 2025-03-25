import { MapImageAreas } from '@/types/dataImage';

const parseSealCtdTagData = (input: string) => {
  const lines = input.trim().split('\n');
  const result: MapImageAreas[] = [];

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    const x1 = parseFloat(parts[1]);
    const y1 = parseFloat(parts[2]);
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
