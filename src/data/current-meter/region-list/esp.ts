import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="478  219  487  229" href="../NRSESP/index.html" alt="NRSESP" title="NRSESP">
<area shape="rect" coords="262  118  312  129" href="../NRSESP/index.html" alt="NRSESP" title="NRSESP">
</map>`;

export const espMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [478, 219, 487, 229], href: '../NRSESP/index.html', alt: 'NRSESP', name: 'NRSESP' },
  {
    shape: 'rect',
    coords: [262, 118, 312, 129],
    href: '../NRSESP/index.html',
    alt: 'NRSESP',
    name: 'NRSESP',
    isText: true,
  },
];

export default regionArr;
