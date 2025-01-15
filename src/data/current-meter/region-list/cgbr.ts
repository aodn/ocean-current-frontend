import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="382  269  391  279" href="../GBRPPS/index.html" alt="GBRPPS" title="GBRPPS">
<area shape="rect" coords="440  238  449  248" href="../GBRMYR/index.html" alt="GBRMYR" title="GBRMYR">
<area shape="rect" coords="530  610  539  620" href="../NRSYON/index.html" alt="NRSYON" title="NRSYON">
<area shape="rect" coords="72  616  128  627" href="../GBRPPS/index.html" alt="GBRPPS" title="GBRPPS">
<area shape="rect" coords="72  629  128  640" href="../GBRMYR/index.html" alt="GBRMYR" title="GBRMYR">
<area shape="rect" coords="72  642  128  653" href="../NRSYON/index.html" alt="NRSYON" title="NRSYON">
</map>`;

export const cgbrMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [382, 269, 391, 279], href: '../GBRPPS/index.html', alt: 'GBRPPS', name: 'GBRPPS' },
  { shape: 'rect', coords: [440, 238, 449, 248], href: '../GBRMYR/index.html', alt: 'GBRMYR', name: 'GBRMYR' },
  { shape: 'rect', coords: [530, 610, 539, 620], href: '../NRSYON/index.html', alt: 'NRSYON', name: 'NRSYON' },
  {
    shape: 'rect',
    coords: [72, 616, 128, 627],
    href: '../GBRPPS/index.html',
    alt: 'GBRPPS',
    name: 'GBRPPS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [72, 629, 128, 640],
    href: '../GBRMYR/index.html',
    alt: 'GBRMYR',
    name: 'GBRMYR',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [72, 642, 128, 653],
    href: '../NRSYON/index.html',
    alt: 'NRSYON',
    name: 'NRSYON',
    isText: true,
  },
];

export default regionArr;
