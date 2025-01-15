import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="439  605  447  615" href="../SAM1DS/index.html" alt="SAM1DS" title="SAM1DS">
<area shape="rect" coords="309  258  318  268" href="../SAM2CP/index.html" alt="SAM2CP" title="SAM2CP">
<area shape="rect" coords="361  501  370  511" href="../SAM3MS/index.html" alt="SAM3MS" title="SAM3MS">
<area shape="rect" coords="582  609  590  619" href="../SAM4CY/index.html" alt="SAM4CY" title="SAM4CY">
<area shape="rect" coords="158  159  166  169" href="../SAM5CB/index.html" alt="SAM5CB" title="SAM5CB">
<area shape="rect" coords="521  320  529  330" href="../SAM6IS/index.html" alt="SAM6IS" title="SAM6IS">
<area shape="rect" coords="346  515  354  525" href="../SAM7DS/index.html" alt="SAM7DS" title="SAM7DS">
<area shape="rect" coords="541  250  549  260" href="../SAM8SG/index.html" alt="SAM8SG" title="SAM8SG">
<area shape="rect" coords="486  414  494  424" href="../NRSKAI/index.html" alt="NRSKAI" title="NRSKAI">
<area shape="rect" coords="479   79  528   90" href="../SAM1DS/index.html" alt="SAM1DS" title="SAM1DS">
<area shape="rect" coords="479   93  528  104" href="../SAM2CP/index.html" alt="SAM2CP" title="SAM2CP">
<area shape="rect" coords="479  106  528  117" href="../SAM3MS/index.html" alt="SAM3MS" title="SAM3MS">
<area shape="rect" coords="479  119  528  130" href="../SAM4CY/index.html" alt="SAM4CY" title="SAM4CY">
<area shape="rect" coords="479  133  528  144" href="../SAM5CB/index.html" alt="SAM5CB" title="SAM5CB">
<area shape="rect" coords="479  146  528  157" href="../SAM6IS/index.html" alt="SAM6IS" title="SAM6IS">
<area shape="rect" coords="479  159  528  170" href="../SAM7DS/index.html" alt="SAM7DS" title="SAM7DS">
<area shape="rect" coords="479  173  528  184" href="../SAM8SG/index.html" alt="SAM8SG" title="SAM8SG">
<area shape="rect" coords="479  186  528  197" href="../NRSKAI/index.html" alt="NRSKAI" title="NRSKAI">
</map>`;

export const saMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [439, 605, 447, 615], href: '../SAM1DS/index.html', alt: 'SAM1DS', name: 'SAM1DS' },
  { shape: 'rect', coords: [309, 258, 318, 268], href: '../SAM2CP/index.html', alt: 'SAM2CP', name: 'SAM2CP' },
  { shape: 'rect', coords: [361, 501, 370, 511], href: '../SAM3MS/index.html', alt: 'SAM3MS', name: 'SAM3MS' },
  { shape: 'rect', coords: [582, 609, 590, 619], href: '../SAM4CY/index.html', alt: 'SAM4CY', name: 'SAM4CY' },
  { shape: 'rect', coords: [158, 159, 166, 169], href: '../SAM5CB/index.html', alt: 'SAM5CB', name: 'SAM5CB' },
  { shape: 'rect', coords: [521, 320, 529, 330], href: '../SAM6IS/index.html', alt: 'SAM6IS', name: 'SAM6IS' },
  { shape: 'rect', coords: [346, 515, 354, 525], href: '../SAM7DS/index.html', alt: 'SAM7DS', name: 'SAM7DS' },
  { shape: 'rect', coords: [541, 250, 549, 260], href: '../SAM8SG/index.html', alt: 'SAM8SG', name: 'SAM8SG' },
  { shape: 'rect', coords: [486, 414, 494, 424], href: '../NRSKAI/index.html', alt: 'NRSKAI', name: 'NRSKAI' },
  {
    shape: 'rect',
    coords: [479, 79, 528, 90],
    href: '../SAM1DS/index.html',
    alt: 'SAM1DS',
    name: 'SAM1DS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 93, 528, 104],
    href: '../SAM2CP/index.html',
    alt: 'SAM2CP',
    name: 'SAM2CP',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 106, 528, 117],
    href: '../SAM3MS/index.html',
    alt: 'SAM3MS',
    name: 'SAM3MS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 119, 528, 130],
    href: '../SAM4CY/index.html',
    alt: 'SAM4CY',
    name: 'SAM4CY',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 133, 528, 144],
    href: '../SAM5CB/index.html',
    alt: 'SAM5CB',
    name: 'SAM5CB',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 146, 528, 157],
    href: '../SAM6IS/index.html',
    alt: 'SAM6IS',
    name: 'SAM6IS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 159, 528, 170],
    href: '../SAM7DS/index.html',
    alt: 'SAM7DS',
    name: 'SAM7DS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 173, 528, 184],
    href: '../SAM8SG/index.html',
    alt: 'SAM8SG',
    name: 'SAM8SG',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [479, 186, 528, 197],
    href: '../NRSKAI/index.html',
    alt: 'NRSKAI',
    name: 'NRSKAI',
    isText: true,
  },
];

export default regionArr;
