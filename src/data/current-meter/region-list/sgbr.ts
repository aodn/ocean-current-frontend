import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="466  147  475  157" href="../GBRCCH/index.html" alt="GBRCCH" title="GBRCCH">
<area shape="rect" coords="464  519  473  529" href="../GBRHIN/index.html" alt="GBRHIN" title="GBRHIN">
<area shape="rect" coords="452  581  462  591" href="../GBRHIS/index.html" alt="GBRHIS" title="GBRHIS">
<area shape="rect" coords="531  569  540  579" href="../GBROTE/index.html" alt="GBROTE" title="GBROTE">
<area shape="rect" coords="57  105  113  116" href="../GBRCCH/index.html" alt="GBRCCH" title="GBRCCH">
<area shape="rect" coords="57  118  113  129" href="../GBRHIN/index.html" alt="GBRHIN" title="GBRHIN">
<area shape="rect" coords="57  131  113  142" href="../GBRHIS/index.html" alt="GBRHIS" title="GBRHIS">
<area shape="rect" coords="57  145  113  156" href="../GBROTE/index.html" alt="GBROTE" title="GBROTE">
</map>`;

export const sgbrMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [466, 147, 475, 157], href: '../GBRCCH/index.html', alt: 'GBRCCH', name: 'GBRCCH' },
  { shape: 'rect', coords: [464, 519, 473, 529], href: '../GBRHIN/index.html', alt: 'GBRHIN', name: 'GBRHIN' },
  { shape: 'rect', coords: [452, 581, 462, 591], href: '../GBRHIS/index.html', alt: 'GBRHIS', name: 'GBRHIS' },
  { shape: 'rect', coords: [531, 569, 540, 579], href: '../GBROTE/index.html', alt: 'GBROTE', name: 'GBROTE' },
  {
    shape: 'rect',
    coords: [57, 105, 113, 116],
    href: '../GBRCCH/index.html',
    alt: 'GBRCCH',
    name: 'GBRCCH',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [57, 118, 113, 129],
    href: '../GBRHIN/index.html',
    alt: 'GBRHIN',
    name: 'GBRHIN',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [57, 131, 113, 142],
    href: '../GBRHIS/index.html',
    alt: 'GBRHIS',
    name: 'GBRHIS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [57, 145, 113, 156],
    href: '../GBROTE/index.html',
    alt: 'GBROTE',
    name: 'GBROTE',
    isText: true,
  },
];

export default regionArr;
