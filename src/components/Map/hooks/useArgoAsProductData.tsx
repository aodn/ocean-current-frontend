import { useEffect, useMemo, useState } from 'react';
import { Dayjs } from 'dayjs';
import { isAxiosError } from 'axios';
import { getArgoProfilesByDate } from '@/services/argo';
import { convertHtmlToArgo } from '@/utils/argo-utils/argo';
import { ArgoProfile } from '@/types/argo';
import { setArgoMetaData } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import { ArgoProfileFeatureCollection } from '@/types/geo';
import { calculateCenterByCoords } from '@/utils/geo-utils/geo';

const MAXIMUM_RETRIES = 5;

const useArgoAsProductData = () => {
  const useDate = useDateStore((state) => state.date);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Dayjs>(useDate);
  const [argoProfiles, setArgoProfiles] = useState<ArgoProfile[]>([]);

  const formattedDate = useDate.format('YYYYMMDD');

  useEffect(() => {
    if (!useDate.isSame(currentDate, 'day')) {
      setLoading(true);
      setCurrentDate(useDate);
    }
  }, [currentDate, formattedDate, useDate]);

  useEffect(() => {
    const fetchData = async () => {
      let retryCount = 0;
      let profiles: ArgoProfile[] = [];

      while (retryCount < MAXIMUM_RETRIES) {
        try {
          const response = await getArgoProfilesByDate(currentDate);
          profiles = convertHtmlToArgo(response.data);
          break; // Stop retrying if successful
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 404) {
            retryCount += 1;
            const newDate = currentDate.subtract(1, 'day');
            setCurrentDate((prevDate) => (prevDate.isSame(newDate, 'day') ? prevDate : newDate));
            setDate(newDate);
          } else {
            break; // Stop retrying on non-404 errors
          }
        }
      }

      if (retryCount >= MAXIMUM_RETRIES) {
        console.error('Failed to fetch Argo profiles after 5 attempts');
        // TODO: Handle error, return error to UI, render notification/warning
      }

      setArgoProfiles(profiles);
      setLoading(false);
    };

    if (loading) {
      fetchData();
    }
  }, [currentDate, loading]);

  useEffect(() => {
    if (argoProfiles.length > 0) {
      const argoMetaData = argoProfiles.map((data) => {
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
    }
  }, [argoProfiles]);

  const features = useMemo(
    () =>
      argoProfiles.map(({ coords, worldMeteorologicalOrgId, cycle, depth, date }) => {
        const center = calculateCenterByCoords(coords).map((coord) => Math.round(coord));
        return {
          type: 'Feature',
          id: worldMeteorologicalOrgId,
          properties: {
            worldMeteorologicalOrgId,
            cycle,
            depth,
            date,
          },
          geometry: {
            type: 'Point',
            coordinates: [center[0], center[1]],
          },
        };
      }),
    [argoProfiles],
  );

  const argoGeoCollection = useMemo(
    () => ({
      type: 'FeatureCollection',
      features,
    }),
    [features],
  ) as ArgoProfileFeatureCollection;

  return { argoData: argoGeoCollection };
};

export default useArgoAsProductData;
