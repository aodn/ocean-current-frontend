import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="212  196  220  206" href="../CH070/index.html" alt="CH070" title="CH070">
<area shape="rect" coords="256  192  264  202" href="../CH100/index.html" alt="CH100" title="CH100">
<area shape="rect" coords="57   92  100  103" href="../CH070/index.html" alt="CH070" title="CH070">
<area shape="rect" coords="57  105  100  116" href="../CH100/index.html" alt="CH100" title="CH100">
</map>`;

export const coffsMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [212, 196, 220, 206], href: '../CH070/index.html', alt: 'CH070', name: 'CH070' },
  { shape: 'rect', coords: [256, 192, 264, 202], href: '../CH100/index.html', alt: 'CH100', name: 'CH100' },
  { shape: 'rect', coords: [57, 92, 100, 103], href: '../CH070/index.html', alt: 'CH070', name: 'CH070', isText: true },
  {
    shape: 'rect',
    coords: [57, 105, 100, 116],
    href: '../CH100/index.html',
    alt: 'CH100',
    name: 'CH100',
    isText: true,
  },
];

export default regionArr;
