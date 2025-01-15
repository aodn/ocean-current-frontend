import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="427  213  436  223" href="../SYD100/index.html" alt="SYD100" title="SYD100">
<area shape="rect" coords="483  265  491  275" href="../SYD140/index.html" alt="SYD140" title="SYD140">
<area shape="rect" coords="300  389  309  399" href="../PH100/index.html" alt="PH100" title="PH100">
<area shape="rect" coords="373  167  382  177" href="../ORS065/index.html" alt="ORS065" title="ORS065">
<area shape="rect" coords="80  115  130  126" href="../SYD100/index.html" alt="SYD100" title="SYD100">
<area shape="rect" coords="80  128  130  139" href="../SYD140/index.html" alt="SYD140" title="SYD140">
<area shape="rect" coords="80  141  122  152" href="../PH100/index.html" alt="PH100" title="PH100">
<area shape="rect" coords="80  154  130  165" href="../ORS065/index.html" alt="ORS065" title="ORS065">
</map>`;

export const sydMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [427, 213, 436, 223], href: '../SYD100/index.html', alt: 'SYD100', name: 'SYD100' },
  { shape: 'rect', coords: [483, 265, 491, 275], href: '../SYD140/index.html', alt: 'SYD140', name: 'SYD140' },
  { shape: 'rect', coords: [300, 389, 309, 399], href: '../PH100/index.html', alt: 'PH100', name: 'PH100' },
  { shape: 'rect', coords: [373, 167, 382, 177], href: '../ORS065/index.html', alt: 'ORS065', name: 'ORS065' },
  {
    shape: 'rect',
    coords: [80, 115, 130, 126],
    href: '../SYD100/index.html',
    alt: 'SYD100',
    name: 'SYD100',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [80, 128, 130, 139],
    href: '../SYD140/index.html',
    alt: 'SYD140',
    name: 'SYD140',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [80, 141, 122, 152],
    href: '../PH100/index.html',
    alt: 'PH100',
    name: 'PH100',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [80, 154, 130, 165],
    href: '../ORS065/index.html',
    alt: 'ORS065',
    name: 'ORS065',
    isText: true,
  },
];

export default regionArr;
