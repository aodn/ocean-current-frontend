import { useEffect, useMemo, useRef, useState } from 'react';
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
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { sharedQueryConfig } from '@/configs/query';

const MAXIMUM_RETRIES = 5;

const useArgoAsProductData = () => {
  const useDate = useDateStore((state) => state.date);
  const [retryDate, setRetryDate] = useState<Dayjs>(useDate);
  const retryCountRef = useRef(0);
  const maxRetriesReachedRef = useRef(false);
  const { isArgo } = useProductCheck();

  const {
    data: argoProfiles = [],
    isLoading,
    error,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['argoProfiles', retryDate.format('YYYYMMDD')],
    queryFn: async () => {
      const response = await fetchArgoProfilesByDate(retryDate);
      return convertHtmlToArgo(response.data);
    },
    ...sharedQueryConfig,
    enabled: isArgo,
    retry: false, // disable automatic retries to implement custom retry logic
  });

  useEffect(() => {
    if (isSuccess) {
      retryCountRef.current = 0;
      maxRetriesReachedRef.current = false;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && isAxiosError(error) && error.response?.status === 404 && !maxRetriesReachedRef.current) {
      if (retryCountRef.current < MAXIMUM_RETRIES) {
        const previousDay = dayjs(retryDate).subtract(1, 'day');
        setRetryDate(previousDay);
        retryCountRef.current = retryCountRef.current + 1;
      } else {
        console.error('Failed to fetch argo profiles after maximum retries');
        maxRetriesReachedRef.current = true;
      }
    }
  }, [error, retryDate]);

  useEffect(() => {
    if (!useDate.isValid() || retryDate.isSame(useDate, 'day')) return;
    setRetryDate(useDate);
    retryCountRef.current = 0;
    maxRetriesReachedRef.current = false;
  }, [retryDate, useDate]);

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
