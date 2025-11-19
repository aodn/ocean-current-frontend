import parse from 'node-html-parser';
import { ArgoProfile } from '@/types/argo';
import { argoMapImgParamsNew } from '@/constants/imageParameter';
import { ArgoDepths } from '@/constants/argo';
import { calculateOffsetByCoords } from '../geo-utils/geo';

const convertHtmlToArgo = (html: string): ArgoProfile[] => {
  const rootElement = parse(html.replace(/(\r\n|\n|\r)/gm, ''));
  const areaElements = rootElement!.querySelectorAll('area');

  // Check if any area element has data-maptype attribute, it added by external server
  const hasMapTypeAttribute = areaElements.some((area) => area.hasAttribute('data-maptype'));

  const filteredAreaElements = hasMapTypeAttribute
    ? areaElements.filter((area) => area.getAttribute('data-maptype') === 'Argo')
    : areaElements;

  return filteredAreaElements
    .map((area): ArgoProfile | null => {
      const coordsAttr = area.getAttribute('coords');
      const hrefAttr = area.getAttribute('href');

      if (!coordsAttr || !hrefAttr) {
        console.warn('Missing required attributes (coords or href) for area element', area);
        return null;
      }

      const coords = coordsAttr.split(/\s+/).map((coord) => parseFloat(coord));

      const hrefAttrAry = hrefAttr.split('_');
      if (hrefAttrAry.length < 3) {
        console.warn('Invalid href format for area element', hrefAttr);
        return null;
      }

      const datePathParts = hrefAttrAry[0].split('/');
      if (datePathParts.length < 3) {
        console.warn('Invalid date path format in href', hrefAttrAry[0]);
        return null;
      }

      const cycleParts = hrefAttrAry[2].split('.');
      if (cycleParts.length === 0) {
        console.warn('Invalid cycle format in href', hrefAttrAry[2]);
        return null;
      }

      const worldMeteorologicalOrgId = hrefAttrAry[1];
      const cycle = cycleParts[0];
      const date = datePathParts[2];

      return {
        coords: calculateOffsetByCoords(coords, argoMapImgParamsNew),
        worldMeteorologicalOrgId,
        cycle,
        depth: ArgoDepths['2000M'],
        date,
      };
    })
    .filter((profile): profile is ArgoProfile => profile !== null);
};

export { convertHtmlToArgo };
