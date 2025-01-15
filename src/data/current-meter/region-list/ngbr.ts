import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="427  238  437  248" href="../GBRLSL/index.html" alt="GBRLSL" title="GBRLSL">
<area shape="rect" coords="599  466  609  476" href="../GBRLSH/index.html" alt="GBRLSH" title="GBRLSH">
<area shape="rect" coords="164  628  222  639" href="../GBRLSL/index.html" alt="GBRLSL" title="GBRLSL">
<area shape="rect" coords="164  641  222  652" href="../GBRLSH/index.html" alt="GBRLSH" title="GBRLSH">
</map>`;

export const ngbrMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [427, 238, 437, 248], href: '../GBRLSL/index.html', alt: 'GBRLSL', name: 'GBRLSL' },
  { shape: 'rect', coords: [599, 466, 609, 476], href: '../GBRLSH/index.html', alt: 'GBRLSH', name: 'GBRLSH' },
  {
    shape: 'rect',
    coords: [164, 628, 222, 639],
    href: '../GBRLSL/index.html',
    alt: 'GBRLSL',
    name: 'GBRLSL',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [164, 641, 222, 652],
    href: '../GBRLSH/index.html',
    alt: 'GBRLSH',
    name: 'GBRLSH',
    isText: true,
  },
];

export default regionArr;
