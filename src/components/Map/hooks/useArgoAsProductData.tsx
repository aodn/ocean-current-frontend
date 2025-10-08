import { useEffect, useMemo, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchArgoProfilesByDate } from '@/services/argo';
import { convertHtmlToArgo } from '@/utils/argo-utils/argo';
import { ArgoProfile } from '@/types/argo';
import { setArgoMetaData } from '@/stores/argo-store/argoStore';
import useDateStore from '@/stores/date-store/dateStore';
import { ArgoProfileFeatureCollection } from '@/types/geo';
import { calculateCenterByCoords } from '@/utils/geo-utils/geo';
import { sharedQueryConfig } from '@/configs/query';

const MAXIMUM_RETRIES = 5;

type UseArgoAsProductDataProps = { enabled?: boolean };

const useArgoAsProductData = ({ enabled = true }: UseArgoAsProductDataProps) => {
  const useDate = useDateStore((state) => state.date);
  const attemptDateRef = useRef<Dayjs>(useDate);
  const retryCountRef = useRef(0);

  useEffect(() => {
    attemptDateRef.current = useDate;
    retryCountRef.current = 0;
  }, [useDate]);

  const {
    data: argoProfiles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['argoProfiles', useDate.format('YYYYMMDD')],
    queryFn: async () => {
      const response = await fetchArgoProfilesByDate(attemptDateRef.current);
      return convertHtmlToArgo(response.data);
    },
    ...sharedQueryConfig,
    enabled: enabled && useDate.isValid(),
    retry: false,
  });

  useEffect(() => {
    if (error && isAxiosError(error) && error.response?.status === 404) {
      if (retryCountRef.current < MAXIMUM_RETRIES) {
        retryCountRef.current = retryCountRef.current + 1;
        attemptDateRef.current = dayjs(attemptDateRef.current).subtract(1, 'day');
        refetch();
      }
    }
  }, [error, refetch]);

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

export default useArgoAsProductData;
