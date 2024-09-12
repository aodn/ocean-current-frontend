import { calculateOffsetByCoords, convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="845  241  855  251" href="../NWSLYN/index.html" alt="NWSLYN" title="NWSLYN">
<area shape="rect" coords="871  481  881  491" href="../DARBGF/index.html" alt="DARBGF" title="DARBGF">
<area shape="rect" coords="541  227  551  237" href="../ITFTIS/index.html" alt="ITFTIS" title="ITFTIS">
<area shape="rect" coords="590  358  599  368" href="../ITFMHB/index.html" alt="ITFMHB" title="ITFMHB">
<area shape="rect" coords="695  648  705  658" href="../ITFJBG/index.html" alt="ITFJBG" title="ITFJBG">
<area shape="rect" coords="642  501  651  511" href="../ITFFTB/index.html" alt="ITFFTB" title="ITFFTB">
<area shape="rect" coords="885  507  895  517" href="../NRSDAR/index.html" alt="NRSDAR" title="NRSDAR">
<area shape="rect" coords="508  137  518  147" href="../ITFTNS/index.html" alt="ITFTNS" title="ITFTNS">
<area shape="rect" coords="520  167  530  177" href="../ITFTSL/index.html" alt="ITFTSL" title="ITFTSL">
<area shape="rect" coords="502  121  512  131" href="../ITFTIN/index.html" alt="ITFTIN" title="ITFTIN">
<area shape="rect" coords="270   84  280   94" href="../ITFOMB/index.html" alt="ITFOMB" title="ITFOMB">
<area shape="rect" coords="508  127  518  137" href="../ITFTNS/index.html" alt="ITFTNS" title="ITFTNS">
<area shape="rect" coords="520  157  530  167" href="../ITFTSL/index.html" alt="ITFTSL" title="ITFTSL">
<area shape="rect" coords="502  111  512  121" href="../ITFTIN/index.html" alt="ITFTIN" title="ITFTIN">
<area shape="rect" coords="270   74  280   84" href="../ITFOMB/index.html" alt="ITFOMB" title="ITFOMB">
<area shape="rect" coords="126  354  185  365" href="../NWSLYN/index.html" alt="NWSLYN" title="NWSLYN">
<area shape="rect" coords="126  367  185  378" href="../DARBGF/index.html" alt="DARBGF" title="DARBGF">
<area shape="rect" coords="126  380  185  391" href="../ITFTIS/index.html" alt="ITFTIS" title="ITFTIS">
<area shape="rect" coords="126  394  185  405" href="../ITFMHB/index.html" alt="ITFMHB" title="ITFMHB">
<area shape="rect" coords="126  407  185  418" href="../ITFJBG/index.html" alt="ITFJBG" title="ITFJBG">
<area shape="rect" coords="126  420  185  431" href="../ITFFTB/index.html" alt="ITFFTB" title="ITFFTB">
<area shape="rect" coords="126  434  185  445" href="../NRSDAR/index.html" alt="NRSDAR" title="NRSDAR">
<area shape="rect" coords="126  447  185  458" href="../ITFTNS/index.html" alt="ITFTNS" title="ITFTNS">
<area shape="rect" coords="126  460  185  471" href="../ITFTSL/index.html" alt="ITFTSL" title="ITFTSL">
<area shape="rect" coords="126  474  185  485" href="../ITFTIN/index.html" alt="ITFTIN" title="ITFTIN">
<area shape="rect" coords="126  487  185  498" href="../ITFOMB/index.html" alt="ITFOMB" title="ITFOMB">
<area shape="rect" coords="126  500  185  511" href="../ITFTNS/index.html" alt="ITFTNS" title="ITFTNS">
<area shape="rect" coords="126  513  185  524" href="../ITFTSL/index.html" alt="ITFTSL" title="ITFTSL">
<area shape="rect" coords="126  527  185  538" href="../ITFTIN/index.html" alt="ITFTIN" title="ITFTIN">
<area shape="rect" coords="126  540  185  551" href="../ITFOMB/index.html" alt="ITFOMB" title="ITFOMB">
</map>`;

export const timorMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr = [
  {
    shape: 'rect',
    coords: [845, 241, 855, 251],
    href: '../NWSLYN/index.html',
    alt: 'NWSLYN',
    title: 'NWSLYN',
  },
  {
    shape: 'rect',
    coords: [871, 481, 881, 491],
    href: '../DARBGF/index.html',
    alt: 'DARBGF',
    title: 'DARBGF',
  },
  {
    shape: 'rect',
    coords: [541, 227, 551, 237],
    href: '../ITFTIS/index.html',
    alt: 'ITFTIS',
    title: 'ITFTIS',
  },
  {
    shape: 'rect',
    coords: [590, 358, 599, 368],
    href: '../ITFMHB/index.html',
    alt: 'ITFMHB',
    title: 'ITFMHB',
  },
  {
    shape: 'rect',
    coords: [695, 648, 705, 658],
    href: '../ITFJBG/index.html',
    alt: 'ITFJBG',
    title: 'ITFJBG',
  },
  {
    shape: 'rect',
    coords: [642, 501, 651, 511],
    href: '../ITFFTB/index.html',
    alt: 'ITFFTB',
    title: 'ITFFTB',
  },
  {
    shape: 'rect',
    coords: [885, 507, 895, 517],
    href: '../NRSDAR/index.html',
    alt: 'NRSDAR',
    title: 'NRSDAR',
  },
  {
    shape: 'rect',
    coords: [508, 137, 518, 147],
    href: '../ITFTNS/index.html',
    alt: 'ITFTNS',
    title: 'ITFTNS',
  },
  {
    shape: 'rect',
    coords: [520, 167, 530, 177],
    href: '../ITFTSL/index.html',
    alt: 'ITFTSL',
    title: 'ITFTSL',
  },
  {
    shape: 'rect',
    coords: [502, 121, 512, 131],
    href: '../ITFTIN/index.html',
    alt: 'ITFTIN',
    title: 'ITFTIN',
  },
  {
    shape: 'rect',
    coords: [270, 84, 280, 94],
    href: '../ITFOMB/index.html',
    alt: 'ITFOMB',
    title: 'ITFOMB',
  },
  {
    shape: 'rect',
    coords: [508, 127, 518, 137],
    href: '../ITFTNS/index.html',
    alt: 'ITFTNS',
    title: 'ITFTNS',
  },
  {
    shape: 'rect',
    coords: [520, 157, 530, 167],
    href: '../ITFTSL/index.html',
    alt: 'ITFTSL',
    title: 'ITFTSL',
  },
  {
    shape: 'rect',
    coords: [502, 111, 512, 121],
    href: '../ITFTIN/index.html',
    alt: 'ITFTIN',
    title: 'ITFTIN',
  },
  {
    shape: 'rect',
    coords: [270, 74, 280, 84],
    href: '../ITFOMB/index.html',
    alt: 'ITFOMB',
    title: 'ITFOMB',
  },
  {
    shape: 'rect',
    coords: [126, 354, 185, 365],
    href: '../NWSLYN/index.html',
    alt: 'NWSLYN',
    title: 'NWSLYN',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 367, 185, 378],
    href: '../DARBGF/index.html',
    alt: 'DARBGF',
    title: 'DARBGF',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 380, 185, 391],
    href: '../ITFTIS/index.html',
    alt: 'ITFTIS',
    title: 'ITFTIS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 394, 185, 405],
    href: '../ITFMHB/index.html',
    alt: 'ITFMHB',
    title: 'ITFMHB',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 407, 185, 418],
    href: '../ITFJBG/index.html',
    alt: 'ITFJBG',
    title: 'ITFJBG',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 420, 185, 431],
    href: '../ITFFTB/index.html',
    alt: 'ITFFTB',
    title: 'ITFFTB',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 434, 185, 445],
    href: '../NRSDAR/index.html',
    alt: 'NRSDAR',
    title: 'NRSDAR',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 447, 185, 458],
    href: '../ITFTNS/index.html',
    alt: 'ITFTNS',
    title: 'ITFTNS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 460, 185, 471],
    href: '../ITFTSL/index.html',
    alt: 'ITFTSL',
    title: 'ITFTSL',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 474, 185, 485],
    href: '../ITFTIN/index.html',
    alt: 'ITFTIN',
    title: 'ITFTIN',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 487, 185, 498],
    href: '../ITFOMB/index.html',
    alt: 'ITFOMB',
    title: 'ITFOMB',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 500, 185, 511],
    href: '../ITFTNS/index.html',
    alt: 'ITFTNS',
    title: 'ITFTNS',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 513, 185, 524],
    href: '../ITFTSL/index.html',
    alt: 'ITFTSL',
    title: 'ITFTSL',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 527, 185, 538],
    href: '../ITFTIN/index.html',
    alt: 'ITFTIN',
    title: 'ITFTIN',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [126, 540, 185, 551],
    href: '../ITFOMB/index.html',
    alt: 'ITFOMB',
    title: 'ITFOMB',
    isText: true,
  },
];

const convertedToGeo = regionArr.map((region) => {
  const { coords } = region;

  const timorPImgParams = {
    imageWidth: 1006,
    imageHeight: 760,
    imageBounds: [123.1, 131.8, -14.5, -7.7],
  };

  const coordsOffset = calculateOffsetByCoords(coords, timorPImgParams);

  return {
    ...region,
    coords: coordsOffset,
  };
});

export default convertedToGeo;
