import { useCallback, useEffect, useRef, useState } from 'react';
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

  const retryCount = useRef(0);

  const updateCurrentDate = useCallback((newDate: Dayjs) => {
    setCurrentDate(newDate);
    setDate(newDate);
  }, []);

  useEffect(() => {
    setLoading(true);
    setCurrentDate(useDate);
    setArgoProfiles([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDate.format('YYYYMMDD')]);

  useEffect(() => {
    const fetchData = async (date: Dayjs) => {
      if (retryCount.current >= MAXIMUM_RETRIES) {
        console.error('Failed to fetch argo profiles after 5 attempts');
        setLoading(false);
        return;
      }

      try {
        const response = await getArgoProfilesByDate(date);
        const data = convertHtmlToArgo(response.data);
        setArgoProfiles(data);
        setLoading(false);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          const previousDay = currentDate.subtract(1, 'day');
          updateCurrentDate(previousDay);
          retryCount.current += 1;
        } else {
          setLoading(false);
        }
        // TODO: Handle error, return error to UI, render notification/warning
      }
    };

    if (loading) {
      fetchData(currentDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, currentDate.format('YYYYMMDD'), updateCurrentDate]);

  useEffect(() => {
    if (argoProfiles.length === 0) return;
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
  }, [argoProfiles]);

  const features = argoProfiles.map(({ coords, worldMeteorologicalOrgId, cycle, depth, date }) => {
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
  });

  const argoGeoCollection = {
    type: 'FeatureCollection',
    features: features,
  } as ArgoProfileFeatureCollection;

  return { argoData: argoGeoCollection };
};

export default useArgoAsProductData;
