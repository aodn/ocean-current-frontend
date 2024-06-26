import { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { isAxiosError } from 'axios';
import { getArgoProfilesByDate } from '@/services/argo';
import { calculateCenterByCoords, convertHtmlToArgo } from '@/utils/argo';
import { ArgoProfile } from '@/types/argo';
import { setArgoMetaData } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';

const useArgoAsProductData = () => {
  const useDate = useDateStore((state) => state.date);

  const [latestDate, setLatestDate] = useState<Dayjs>(useDate);
  const [argoProfiles, setArgoProfiles] = useState<ArgoProfile[]>([]);

  const retryCount = useRef(0);

  useEffect(() => {
    const fetchData = async (date: Dayjs) => {
      try {
        const response = await getArgoProfilesByDate(date);
        const data = convertHtmlToArgo(response.data);
        setArgoProfiles(data);
        setLatestDate(date);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404 && retryCount.current < 5) {
          retryCount.current += 1;
          const newDate = dayjs(date).subtract(1, 'day');
          if (newDate.isAfter(dayjs())) return;
          fetchData(newDate);
        }
        if (retryCount.current >= 5) {
          console.error('Failed to fetch argo profiles after 5 attempts');
        }
        // TODO: Handle error, return error to UI, render notification/warning
      }
    };
    retryCount.current = 0;
    fetchData(useDate);
  }, [useDate]);

  useEffect(() => {
    if (latestDate === useDate) return;
    setDate(latestDate);
  }, [latestDate, useDate]);

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
    const center = calculateCenterByCoords(coords);
    return {
      type: 'Feature',
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
  } as GeoJSON.FeatureCollection;

  return { argoData: argoGeoCollection };
};

export default useArgoAsProductData;
