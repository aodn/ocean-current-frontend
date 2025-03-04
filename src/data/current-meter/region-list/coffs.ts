import { MapImageAreas } from '@/types/dataImage';

const regionArr: MapImageAreas[] = [
  {
    shape: 'rect',
    coords: [212, 196, 220, 206],
    href: '../CH070/index.html',
    alt: 'CH070',
    name: 'CH070',
    type: 'plot',
  },
  {
    shape: 'rect',
    coords: [256, 192, 264, 202],
    href: '../CH100/index.html',
    alt: 'CH100',
    name: 'CH100',
    type: 'plot',
  },
  { shape: 'rect', coords: [57, 92, 100, 103], href: '../CH070/index.html', alt: 'CH070', name: 'CH070', type: 'text' },
  {
    shape: 'rect',
    coords: [57, 105, 100, 116],
    href: '../CH100/index.html',
    alt: 'CH100',
    name: 'CH100',
    type: 'text',
  },
];

export default regionArr;
