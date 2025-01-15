import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="159  364  163  374" href="../TOTTEN1/index.html" alt="TOTTEN1" title="TOTTEN1">
<area shape="rect" coords="590  110  594  120" href="../TOTTEN2/index.html" alt="TOTTEN2" title="TOTTEN2">
<area shape="rect" coords="538  332  542  342" href="../TOTTEN3/index.html" alt="TOTTEN3" title="TOTTEN3">
<area shape="rect" coords="553  677  581  688" href="../TOTTEN1/index.html" alt="TOTTEN1" title="TOTTEN1">
<area shape="rect" coords="553  690  581  701" href="../TOTTEN2/index.html" alt="TOTTEN2" title="TOTTEN2">
<area shape="rect" coords="553  703  581  714" href="../TOTTEN3/index.html" alt="TOTTEN3" title="TOTTEN3">
</map>`;

export const tottenMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [159, 364, 163, 374], href: '../TOTTEN1/index.html', alt: 'TOTTEN1', name: 'TOTTEN1' },
  { shape: 'rect', coords: [590, 110, 594, 120], href: '../TOTTEN2/index.html', alt: 'TOTTEN2', name: 'TOTTEN2' },
  { shape: 'rect', coords: [538, 332, 542, 342], href: '../TOTTEN3/index.html', alt: 'TOTTEN3', name: 'TOTTEN3' },
  {
    shape: 'rect',
    coords: [553, 677, 581, 688],
    href: '../TOTTEN1/index.html',
    alt: 'TOTTEN1',
    name: 'TOTTEN1',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [553, 690, 581, 701],
    href: '../TOTTEN2/index.html',
    alt: 'TOTTEN2',
    name: 'TOTTEN2',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [553, 703, 581, 714],
    href: '../TOTTEN3/index.html',
    alt: 'TOTTEN3',
    name: 'TOTTEN3',
    isText: true,
  },
];

export default regionArr;
