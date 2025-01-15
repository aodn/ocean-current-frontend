import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="361  334  370  344" href="../GBRELR/index.html" alt="GBRELR" title="GBRELR">
<area shape="rect" coords="76  581  132  592" href="../GBRELR/index.html" alt="GBRELR" title="GBRELR">
</map>`;

export const sgbr2MapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [361, 334, 370, 344], href: '../GBRELR/index.html', alt: 'GBRELR', name: 'GBRELR' },
  {
    shape: 'rect',
    coords: [76, 581, 132, 592],
    href: '../GBRELR/index.html',
    alt: 'GBRELR',
    name: 'GBRELR',
    isText: true,
  },
];

export default regionArr;
