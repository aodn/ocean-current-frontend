import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { isAxiosError } from 'axios';
import { getArgoProfilesByDate } from '@/services/argo';
import { calculateCenterByCoords, convertHtmlToArgo } from '@/utils/argo';
import { ArgoProfile } from '@/types/argo';
import useProductStore, { setDate } from '@/stores/product-store/productStore';

const useArgoAsProductData = () => {
  const useDate = useProductStore((state) => state.date);

  const [latestDate, setLatestDate] = useState<string>(useDate);
  const [argoProfiles, setArgoProfiles] = useState<ArgoProfile[]>([]);

  useEffect(() => {
    const fetchData = async (date: string) => {
      try {
        const response = await getArgoProfilesByDate(date);
        const data = convertHtmlToArgo(response.data);
        setArgoProfiles(data);
        setLatestDate(date);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          const newDate = dayjs(date).subtract(1, 'day').format('YYYYMMDD');
          fetchData(newDate);
        }
        // TODO: Handle error, return error to UI, render notification/warning
      }
    };

    fetchData(useDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDate(latestDate);
  }, [latestDate]);

  const features = argoProfiles.map((data, index) => {
    const center = calculateCenterByCoords(data.coords);
    return {
      type: 'Feature',
      properties: {
        id: index,
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
