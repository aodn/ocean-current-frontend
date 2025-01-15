import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="438  161  442  171" href="../POLYNYA1/index.html" alt="POLYNYA1" title="POLYNYA1">
<area shape="rect" coords="312  616  343  627" href="../POLYNYA1/index.html" alt="POLYNYA1" title="POLYNYA1">
</map>`;

export const polynyaMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [438, 161, 442, 171], href: '../POLYNYA1/index.html', alt: 'POLYNYA1', name: 'POLYNYA1' },
  {
    shape: 'rect',
    coords: [312, 616, 343, 627],
    href: '../POLYNYA1/index.html',
    alt: 'POLYNYA1',
    name: 'POLYNYA1',
    isText: true,
  },
];

export default regionArr;
