import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { isAxiosError } from 'axios';
import { getArgoProfilesByDate } from '@/services/argo';
import { calculateCenterByCoords, convertHtmlToArgo } from '@/utils/argo';
import { ArgoProfile } from '@/types/argo';
import useArgoStore, { setArgoMetaData, setDate } from '@/stores/argo-store/argoStore';

const useArgoAsProductData = () => {
  const useDate = useArgoStore((state) => state.date);

  const [latestDate, setLatestDate] = useState<Dayjs>(useDate);
  const [argoProfiles, setArgoProfiles] = useState<ArgoProfile[]>([]);

  useEffect(() => {
    const fetchData = async (date: Dayjs) => {
      try {
        const response = await getArgoProfilesByDate(date);
        const data = convertHtmlToArgo(response.data);
        setArgoProfiles(data);
        setLatestDate(date);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          const newDate = dayjs(date).subtract(1, 'day');
          fetchData(newDate);
        }
        // TODO: Handle error, return error to UI, render notification/warning
      }
    };

    fetchData(useDate);
  }, [useDate]);

  useEffect(() => {
    setDate(latestDate);
  }, [latestDate]);

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

  const features = argoProfiles.map(({ coords, worldMeteorologicalOrgId }) => {
    const center = calculateCenterByCoords(coords);
    return {
      type: 'Feature',
      properties: {
        worldMeteorologicalOrgId,
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
