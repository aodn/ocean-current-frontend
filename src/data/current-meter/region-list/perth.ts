import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="207  267  216  277" href="../WATR50/index.html" alt="WATR50" title="WATR50">
<area shape="rect" coords="258  239  267  249" href="../WATR20/index.html" alt="WATR20" title="WATR20">
<area shape="rect" coords="316  206  324  216" href="../WATR15/index.html" alt="WATR15" title="WATR15">
<area shape="rect" coords="365  176  374  186" href="../WATR10/index.html" alt="WATR10" title="WATR10">
<area shape="rect" coords="492  229  501  239" href="../WATR04/index.html" alt="WATR04" title="WATR04">
<area shape="rect" coords="380  433  389  443" href="../WACA20/index.html" alt="WACA20" title="WACA20">
<area shape="rect" coords="503  446  512  456" href="../NRSROT/index.html" alt="NRSROT" title="NRSROT">
<area shape="rect" coords="691   73  742   84" href="../WATR50/index.html" alt="WATR50" title="WATR50">
<area shape="rect" coords="691   86  742   97" href="../WATR20/index.html" alt="WATR20" title="WATR20">
<area shape="rect" coords="691  100  742  111" href="../WATR15/index.html" alt="WATR15" title="WATR15">
<area shape="rect" coords="691  113  742  124" href="../WATR10/index.html" alt="WATR10" title="WATR10">
<area shape="rect" coords="691  126  742  137" href="../WATR04/index.html" alt="WATR04" title="WATR04">
<area shape="rect" coords="691  140  742  151" href="../WACA20/index.html" alt="WACA20" title="WACA20">
<area shape="rect" coords="691  153  742  164" href="../NRSROT/index.html" alt="NRSROT" title="NRSROT">
</map>`;

export const perthMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [207, 267, 216, 277], href: '../WATR50/index.html', alt: 'WATR50', name: 'WATR50' },
  { shape: 'rect', coords: [258, 239, 267, 249], href: '../WATR20/index.html', alt: 'WATR20', name: 'WATR20' },
  { shape: 'rect', coords: [316, 206, 324, 216], href: '../WATR15/index.html', alt: 'WATR15', name: 'WATR15' },
  { shape: 'rect', coords: [365, 176, 374, 186], href: '../WATR10/index.html', alt: 'WATR10', name: 'WATR10' },
  { shape: 'rect', coords: [492, 229, 501, 239], href: '../WATR04/index.html', alt: 'WATR04', name: 'WATR04' },
  { shape: 'rect', coords: [380, 433, 389, 443], href: '../WACA20/index.html', alt: 'WACA20', name: 'WACA20' },
  { shape: 'rect', coords: [503, 446, 512, 456], href: '../NRSROT/index.html', alt: 'NRSROT', name: 'NRSROT' },
  {
    shape: 'rect',
    coords: [691, 73, 742, 84],
    href: '../WATR50/index.html',
    alt: 'WATR50',
    name: 'WATR50',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [691, 86, 742, 97],
    href: '../WATR20/index.html',
    alt: 'WATR20',
    name: 'WATR20',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [691, 100, 742, 111],
    href: '../WATR15/index.html',
    alt: 'WATR15',
    name: 'WATR15',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [691, 113, 742, 124],
    href: '../WATR10/index.html',
    alt: 'WATR10',
    name: 'WATR10',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [691, 126, 742, 137],
    href: '../WATR04/index.html',
    alt: 'WATR04',
    name: 'WATR04',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [691, 140, 742, 151],
    href: '../WACA20/index.html',
    alt: 'WACA20',
    name: 'WACA20',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [691, 153, 742, 164],
    href: '../NRSROT/index.html',
    alt: 'NRSROT',
    name: 'NRSROT',
    isText: true,
  },
];

export default regionArr;
