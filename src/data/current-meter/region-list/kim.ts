import { calculateOffsetByCoords, convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="575  179  584  189" href="../NWSBRW/index.html" alt="NWSBRW" title="NWSBRW">
<area shape="rect" coords="703  307  713  317" href="../CAM050/index.html" alt="CAM050" title="CAM050">
<area shape="rect" coords="662  195  671  205" href="../CAM100/index.html" alt="CAM100" title="CAM100">
<area shape="rect" coords="163  384  172  394" href="../KIM400/index.html" alt="KIM400" title="KIM400">
<area shape="rect" coords="188  449  198  459" href="../KIM200/index.html" alt="KIM200" title="KIM200">
<area shape="rect" coords="201  480  210  490" href="../KIM100/index.html" alt="KIM100" title="KIM100">
<area shape="rect" coords="258  627  267  637" href="../KIM050/index.html" alt="KIM050" title="KIM050">
<area shape="rect" coords="476  503  534  514" href="../NWSBRW/index.html" alt="NWSBRW" title="NWSBRW">
<area shape="rect" coords="476  516  534  527" href="../CAM050/index.html" alt="CAM050" title="CAM050">
<area shape="rect" coords="476  530  534  541" href="../CAM100/index.html" alt="CAM100" title="CAM100">
<area shape="rect" coords="476  543  534  554" href="../KIM400/index.html" alt="KIM400" title="KIM400">
<area shape="rect" coords="476  556  534  567" href="../KIM200/index.html" alt="KIM200" title="KIM200">
<area shape="rect" coords="476  570  534  581" href="../KIM100/index.html" alt="KIM100" title="KIM100">
<area shape="rect" coords="476  583  534  594" href="../KIM050/index.html" alt="KIM050" title="KIM050">
</map>`;

export const kimMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr = [
  {
    shape: 'rect',
    coords: [575, 179, 584, 189],
    href: '../NWSBRW/index.html',
    alt: 'NWSBRW',
    title: 'NWSBRW',
  },
  {
    shape: 'rect',
    coords: [703, 307, 713, 317],
    href: '../CAM050/index.html',
    alt: 'CAM050',
    title: 'CAM050',
  },
  {
    shape: 'rect',
    coords: [662, 195, 671, 205],
    href: '../CAM100/index.html',
    alt: 'CAM100',
    title: 'CAM100',
  },
  {
    shape: 'rect',
    coords: [163, 384, 172, 394],
    href: '../KIM400/index.html',
    alt: 'KIM400',
    title: 'KIM400',
  },
  {
    shape: 'rect',
    coords: [188, 449, 198, 459],
    href: '../KIM200/index.html',
    alt: 'KIM200',
    title: 'KIM200',
  },
  {
    shape: 'rect',
    coords: [201, 480, 210, 490],
    href: '../KIM100/index.html',
    alt: 'KIM100',
    title: 'KIM100',
  },
  {
    shape: 'rect',
    coords: [258, 627, 267, 637],
    href: '../KIM050/index.html',
    alt: 'KIM050',
    title: 'KIM050',
  },
  {
    shape: 'rect',
    coords: [476, 503, 534, 514],
    href: '../NWSBRW/index.html',
    alt: 'NWSBRW',
    title: 'NWSBRW',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [476, 516, 534, 527],
    href: '../CAM050/index.html',
    alt: 'CAM050',
    title: 'CAM050',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [476, 530, 534, 541],
    href: '../CAM100/index.html',
    alt: 'CAM100',
    title: 'CAM100',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [476, 543, 534, 554],
    href: '../KIM400/index.html',
    alt: 'KIM400',
    title: 'KIM400',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [476, 556, 534, 567],
    href: '../KIM200/index.html',
    alt: 'KIM200',
    title: 'KIM200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [476, 570, 534, 581],
    href: '../KIM100/index.html',
    alt: 'KIM100',
    title: 'KIM100',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [476, 583, 534, 594],
    href: '../KIM050/index.html',
    alt: 'KIM050',
    title: 'KIM050',
    isText: true,
  },
];

const convertedToGeo = regionArr.map((region) => {
  const coords = calculateOffsetByCoords(region.coords, {
    imageWidth: 875,
    imageHeight: 760,
    imageBounds: [120.3, 124.65, -17, -13.4],
  });

  return {
    ...region,
    coords,
  };
});

export default convertedToGeo;
