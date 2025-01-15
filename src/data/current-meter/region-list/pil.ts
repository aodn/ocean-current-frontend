import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="125  603  134  613" href="../NWSBAR/index.html" alt="NWSBAR" title="NWSBAR">
<area shape="rect" coords="481  168  490  178" href="../PIL200/index.html" alt="PIL200" title="PIL200">
<area shape="rect" coords="541  253  551  263" href="../PIL100/index.html" alt="PIL100" title="PIL100">
<area shape="rect" coords="635  371  644  381" href="../PIL050/index.html" alt="PIL050" title="PIL050">
<area shape="rect" coords="712  393  768  404" href="../NWSBAR/index.html" alt="NWSBAR" title="NWSBAR">
<area shape="rect" coords="712  406  768  417" href="../PIL200/index.html" alt="PIL200" title="PIL200">
<area shape="rect" coords="712  420  768  431" href="../PIL100/index.html" alt="PIL100" title="PIL100">
<area shape="rect" coords="712  433  768  444" href="../PIL050/index.html" alt="PIL050" title="PIL050">
</map>`;

export const pilMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  {
    shape: 'rect',
    coords: [125, 603, 134, 613],
    href: '../NWSBAR/index.html',
    alt: 'NWSBAR',
    name: 'NWSBAR',
  },
  {
    shape: 'rect',
    coords: [481, 168, 490, 178],
    href: '../PIL200/index.html',
    alt: 'PIL200',
    name: 'PIL200',
  },
  {
    shape: 'rect',
    coords: [541, 253, 551, 263],
    href: '../PIL100/index.html',
    alt: 'PIL100',
    name: 'PIL100',
  },
  {
    shape: 'rect',
    coords: [635, 371, 644, 381],
    href: '../PIL050/index.html',
    alt: 'PIL050',
    name: 'PIL050',
  },
  {
    shape: 'rect',
    coords: [712, 393, 768, 404],
    href: '../NWSBAR/index.html',
    alt: 'NWSBAR',
    name: 'NWSBAR',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [712, 406, 768, 417],
    href: '../PIL200/index.html',
    alt: 'PIL200',
    name: 'PIL200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [712, 420, 768, 431],
    href: '../PIL100/index.html',
    alt: 'PIL100',
    name: 'PIL100',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [712, 433, 768, 444],
    href: '../PIL050/index.html',
    alt: 'PIL050',
    name: 'PIL050',
    isText: true,
  },
];

export default regionArr;
