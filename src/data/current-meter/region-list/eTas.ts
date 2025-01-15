import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="459  214  466  224" href="../NRSMAI/index.html" alt="NRSMAI" title="NRSMAI">
<area shape="rect" coords="241  128  285  139" href="../NRSMAI/index.html" alt="NRSMAI" title="NRSMAI">
</map>`;

export const eTasMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [459, 214, 466, 224], href: '../NRSMAI/index,.html', alt: 'NRSMAI', name: 'NRSMAI' },
  {
    shape: 'rect',
    coords: [241, 128, 285, 139],
    href: '../NRSMAI/index,.html',
    alt: 'NRSMAI',
    name: 'NRSMAI',
    isText: true,
  },
];

export default regionArr;
