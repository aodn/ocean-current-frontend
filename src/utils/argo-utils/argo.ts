import parse from 'node-html-parser';
import { ArgoProfile } from '@/types/argo';
import { argoMapImgParamsNew } from '@/constants/imageParameter';
import { ArgoDepths } from '@/constants/argo';
import { calculateOffsetByCoords } from '../geo-utils/geo';

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
      coords: calculateOffsetByCoords(coords, argoMapImgParamsNew),
      worldMeteorologicalOrgId,
      cycle,
      depth: ArgoDepths['2000M'],
      date,
    };
  });
};

export { convertHtmlToArgo };
