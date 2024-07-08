import parse from 'node-html-parser';
import { ArgoProfile } from '@/types/argo';
import { argoMapImgParamsNew } from '@/constants/argo';

const convertHtmlToArgo = (html: string): ArgoProfile[] => {
  const rootElement = parse(html.replace(/(\r\n|\n|\r)/gm, ''));
  const areaElements = rootElement!.querySelectorAll('area');

  return areaElements.map((area) => {
    const coords = area
      .getAttribute('coords')!
      .split(/\s+/)
      .map((coord) => parseFloat(coord));

    const hrefAttrAry = area.getAttribute('href')!.split('_');
    const worldMeteorologicalOrgId = hrefAttrAry[1];
    const cycle = hrefAttrAry[2].split('.')[0];
    const date = hrefAttrAry[0].split('/')[2];

    return {
      coords: calculateOffsetByCoords(coords),
      worldMeteorologicalOrgId,
      cycle,
      depth: '0',
      date,
    };
  });
};

const calculateCenterByCoords = (coords: number[]): number[] => {
  const [x1, y1, x2, y2] = coords;
  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

const calculateOffsetByCoords = (coords: number[]): number[] => {
  const { imageWidth, imageHeight, imageBounds } = argoMapImgParamsNew;
  const imageToGeo = (x: number, y: number) => {
    const longitude = imageBounds[0] + (x / imageWidth) * (imageBounds[1] - imageBounds[0]);
    const latitude = imageBounds[3] + (y / imageHeight) * (imageBounds[2] - imageBounds[3]);
    return { longitude, latitude };
  };
  const [x1, y1, x2, y2] = coords;
  const topLeftGeo = imageToGeo(x1, y1);
  const bottomRightGeo = imageToGeo(x2, y2);
  return [topLeftGeo.longitude, topLeftGeo.latitude, bottomRightGeo.longitude, bottomRightGeo.latitude];
};

export { convertHtmlToArgo, calculateCenterByCoords, calculateOffsetByCoords };
