import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="348  312  356  322" href="../BMP070/index.html" alt="BMP070" title="BMP070">
<area shape="rect" coords="382  311  390  321" href="../BMP090/index.html" alt="BMP090" title="BMP090">
<area shape="rect" coords="448  326  456  336" href="../BMP120/index.html" alt="BMP120" title="BMP120">
<area shape="rect" coords="122  262  171  273" href="../BMP070/index.html" alt="BMP070" title="BMP070">
<area shape="rect" coords="122  275  171  286" href="../BMP090/index.html" alt="BMP090" title="BMP090">
<area shape="rect" coords="122  289  171  300" href="../BMP120/index.html" alt="BMP120" title="BMP120">
</map>`;

export const bmpMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [348, 312, 356, 322], href: '../BMP070/index.html', alt: 'BMP070', name: 'BMP070' },
  { shape: 'rect', coords: [382, 311, 390, 321], href: '../BMP090/index.html', alt: 'BMP090', name: 'BMP090' },
  { shape: 'rect', coords: [448, 326, 456, 336], href: '../BMP120/index.html', alt: 'BMP120', name: 'BMP120' },
  {
    shape: 'rect',
    coords: [122, 262, 171, 273],
    href: '../BMP070/index.html',
    alt: 'BMP070',
    name: 'BMP070',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [122, 275, 171, 286],
    href: '../BMP090/index.html',
    alt: 'BMP090',
    name: 'BMP090',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [122, 289, 171, 300],
    href: '../BMP120/index.html',
    alt: 'BMP120',
    name: 'BMP120',
    isText: true,
  },
];

export default regionArr;
