import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="294  384  300  394" href="../SOTS/index.html" alt="SOTS" title="SOTS">
<area shape="rect" coords="460  293  467  303" href="../SOFS/index.html" alt="SOFS" title="SOFS">
<area shape="rect" coords="631  524  659  535" href="../SOTS/index.html" alt="SOTS" title="SOTS">
<area shape="rect" coords="631  537  659  548" href="../SOFS/index.html" alt="SOFS" title="SOFS">
</map>`;

export const sofsMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [294, 384, 300, 394], href: '../SOTS/index.html', alt: 'SOTS', name: 'SOTS' },
  { shape: 'rect', coords: [460, 293, 467, 303], href: '../SOFS/index.html', alt: 'SOFS', name: 'SOFS' },
  { shape: 'rect', coords: [631, 524, 659, 535], href: '../SOTS/index.html', alt: 'SOTS', name: 'SOTS', isText: true },
  { shape: 'rect', coords: [631, 537, 659, 548], href: '../SOFS/index.html', alt: 'SOFS', name: 'SOFS', isText: true },
];

export default regionArr;
