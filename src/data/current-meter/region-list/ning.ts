import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="354  348  363  358" href="../TAN100/index.html" alt="TAN100" title="TAN100">
<area shape="rect" coords="370  355  379  365" href="../NRSNIN/index.html" alt="NRSNIN" title="NRSNIN">
<area shape="rect" coords="595  680  651  691" href="../TAN100/index.html" alt="TAN100" title="TAN100">
<area shape="rect" coords="595  693  651  704" href="../NRSNIN/index.html" alt="NRSNIN" title="NRSNIN">
</map>`;

export const ningMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  {
    shape: 'rect',
    coords: [354, 348, 363, 358],
    href: '../TAN100/index.html',
    alt: 'TAN100',
    name: 'TAN100',
  },
  {
    shape: 'rect',
    coords: [370, 355, 379, 365],
    href: '../NRSNIN/index.html',
    alt: 'NRSNIN',
    name: 'NRSNIN',
  },
  {
    shape: 'rect',
    coords: [595, 680, 651, 691],
    href: '../TAN100/index.html',
    alt: 'TAN100',
    name: 'TAN100',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [595, 693, 651, 704],
    href: '../NRSNIN/index.html',
    alt: 'NRSNIN',
    name: 'NRSNIN',
    isText: true,
  },
];

export default regionArr;
