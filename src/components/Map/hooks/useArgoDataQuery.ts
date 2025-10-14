import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { fetchArgoProfilesByDate } from '@/services/argo';
import { convertHtmlToArgo } from '@/utils/argo-utils/argo';
import { ArgoProfile } from '@/types/argo';
import { setArgoMetaData } from '@/stores/argo-store/argoStore';
import { ArgoProfileFeatureCollection } from '@/types/geo';
import { calculateCenterByCoords } from '@/utils/geo-utils/geo';
import { sharedQueryConfig } from '@/configs/query';

type UseArgoDataQueryProps = { enabled?: boolean; queryKey: [string, Dayjs] };

const useArgoDataQuery = ({ enabled = true, queryKey }: UseArgoDataQueryProps) => {
  const {
    data: argoProfiles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [queryKey[0], queryKey[1].format('YYYYMMDD')],
    queryFn: async () => {
      const response = await fetchArgoProfilesByDate(queryKey[1]);
      return convertHtmlToArgo(response.data);
    },
    ...sharedQueryConfig,
    enabled: enabled,
  });

  useEffect(() => {
    if (!argoProfiles.length) return;

    const argoMetaData = argoProfiles.map((data: ArgoProfile) => {
      const { coords, ...rest } = data;
      const center = calculateCenterByCoords(coords);
      return {
        ...rest,
        position: {
          latitude: center[1],
          longitude: center[0],
        },
      };
    });

    setArgoMetaData(argoMetaData);
  }, [argoProfiles]);

  const argoGeoCollection = useMemo(() => {
    const features = argoProfiles.map(({ coords, worldMeteorologicalOrgId, cycle, depth, date }: ArgoProfile) => {
      const [lon, lat] = calculateCenterByCoords(coords);
      return {
        type: 'Feature' as const,
        id: worldMeteorologicalOrgId,
        properties: { worldMeteorologicalOrgId, cycle, depth, date },
        geometry: { type: 'Point' as const, coordinates: [lon, lat] },
      };
    });
    return { type: 'FeatureCollection' as const, features } as ArgoProfileFeatureCollection;
  }, [argoProfiles]);

  return {
    argoData: argoGeoCollection,
    isLoading,
    error,
    refetch,
  };
};

export default useArgoDataQuery;
