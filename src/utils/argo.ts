import parse from 'node-html-parser';
import { ArgoProfile } from '@/types/argo';

/**
 * <map  name=imap>\n
 *   <area shape="rect" coords="446  347  451  353" href="../1901741/20240415_1901741_192.html" target="_blank" alt="1901741">\n
 * </map>
 */
const convertHtmlToArgo = (html: string): ArgoProfile[] => {
  const root = parse(html.replace(/(\r\n|\n|\r)/gm, ''));
  const areas = root!.querySelectorAll('area');

  return areas.map((area) => {
    const coords = area
      .getAttribute('coords')!
      .split(/\s+/)
      .map((coord) => parseFloat(coord));
    const wmoid = parseInt(area.getAttribute('alt') || '0');
    const cycle = parseInt(area.getAttribute('href')!.split('_')[2]);
    return {
      coords: calculateOffsetByCoords(coords),
      wmoid,
      cycle,
      depth: 0,
    };
  });
};

const calculateCenterByCoords = (coords: number[]): number[] => {
  const [x1, y1, x2, y2] = coords;
  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

const calculateOffsetByCoords = (coords: number[]): number[] => {
  const imageWidth = 650;
  const imageHeight = 438;
  const imageBounds = [90, 220, -68, 10]; // [left, right, bottom, top]
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
