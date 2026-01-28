import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export function useUrlParams() {
  const [searchParams] = useSearchParams();

  // URL parameters
  const urlParams = useMemo(
    () => ({
      buoyRegion: searchParams.get('region'),
      point: searchParams.get('point'),
      sealCtdTag: searchParams.get('sealId'),
      deploymentPlot: searchParams.get('deploymentPlot'),
    }),
    [searchParams],
  );

  const hasSelectedParams = useMemo(
    () => ({
      buoyRegion: !!urlParams.buoyRegion,
      point: !!urlParams.point,
      sealCtdTag: !!urlParams.sealCtdTag,
      deploymentPlot: !!urlParams.deploymentPlot,
    }),
    [urlParams],
  );

  return { urlParams, hasSelectedParams };
}
