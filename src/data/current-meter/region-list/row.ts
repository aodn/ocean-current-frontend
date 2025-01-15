import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { calculateOffsetByCoords, convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="495  174  504  184" href="../NWSROW/index.html" alt="NWSROW" title="NWSROW">
<area shape="rect" coords="852  498  909  509" href="../NWSROW/index.html" alt="NWSROW" title="NWSROW">
</map>`;

export const rowMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  {
    shape: 'rect',
    coords: [495, 174, 504, 184],
    href: '../NWSROW/index.html',
    alt: 'NWSROW',
    name: 'NWSROW',
  },
  {
    shape: 'rect',
    coords: [852, 498, 909, 509],
    href: '../NWSROW/index.html',
    alt: 'NWSROW',
    name: 'NWSROW',
    isText: true,
  },
];

export const convertedToGeo = regionArr.map((region) => {
  const coords = calculateOffsetByCoords(region.coords, {
    imageWidth: 1032,
    imageHeight: 760,
    imageBounds: [117.25, 122.75, -20.7, -16.85],
  });

  return {
    ...region,
    coords,
  };
});

export default regionArr;
