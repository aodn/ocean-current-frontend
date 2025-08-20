import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { ProductID } from '@/types/product';
import { API_ENABLED_PRODUCTS, FIXED_DATA_PRODUCTS } from '@/configs/products';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { ImageFile, ImageListResponse } from '@/types/imageList';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { ArgoProfileCycle } from '@/types/argo';
import { DateItem } from '@/types/date';
import useProductStore from '@/stores/product-store/productStore';
import useArgoStore from '@/stores/argo-store/argoStore';
import { buildProductImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { RegionScope } from '@/constants/region';
import { generateDateRange } from './mockData';

const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

const processArgoDateList = (data: ArgoProfileCycle[]): DateItem[] => {
  if (!data || data.length === 0) {
    return [];
  }

  return data.map((cycle: ArgoProfileCycle) => ({
    date: cycle.date,
  }));
};

const processFilesToDateList = (files: ImageFile[]): DateItem[] => {
  if (!files || files.length === 0) {
    return [];
  }

  return files
    .map((file) => ({
      date: extractDateFromFilename(file.name),
    }))
    .filter(({ date }) => /^\d+$/.test(date));
};

const sharedQueryConfig = {
  staleTime: 6 * 60 * 60 * 1000,
  gcTime: 12 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

const useDateList = (productId: ProductID) => {
  const shouldUseApi = API_ENABLED_PRODUCTS.includes(productId) && !FIXED_DATA_PRODUCTS.includes(productId);

  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const regionCodeFromStore = useProductStore((state) => state.productParams.regionCode);
  const region = regionCodeFromStore;
  const metaData = useArgoStore((state) => state);
  const wmoId = metaData.selectedArgoParams.worldMeteorologicalOrgId;

  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);

  const isArgo = productId === 'argo';

  const argoQuery = useQuery({
    queryKey: ['argoDateList', wmoId],
    queryFn: () => fetchArgoProfileCyclesByWmoId(wmoId),
    enabled: isArgo && !!wmoId,
    ...sharedQueryConfig,
  });

  const standardQuery = useQuery({
    queryKey: ['dateList', productId, region],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region!),
    enabled: shouldUseApi && !isArgo && Boolean(region),
    ...sharedQueryConfig,
  });

  const { data } = isArgo ? argoQuery : standardQuery;

  // Async mock date list for monthlyMeans-anomalies to validate latest available month
  const monthlyMeansMockQuery = useQuery({
    queryKey: ['mockDateList', productId, region, dateFormat, regionScope],
    queryFn: async () => {
      const today = dayjs();
      const firstCandidate = today.date() >= 15 ? today : today.subtract(1, 'month');
      const candidateDateStr = firstCandidate.date(15).format('YYYYMMDD');
      const candidateUrl = buildProductImageUrl('monthlyMeans-anomalies', region!, RegionScope.State, candidateDateStr);

      const exists = await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.decoding = 'async';
        img.src = candidateUrl;
      });

      const endDateOverride = exists ? firstCandidate : firstCandidate.subtract(1, 'month');
      return generateDateRange(productId, dateFormat, regionScope, endDateOverride);
    },
    enabled: !isArgo && !shouldUseApi && productId === 'monthlyMeans-anomalies' && Boolean(region),
    ...sharedQueryConfig,
  });

  let dateList: DateItem[] = [];

  if (shouldUseApi && data) {
    if (isArgo) {
      dateList = processArgoDateList(data.data as ArgoProfileCycle[]);
    } else {
      const files = data.data as ImageListResponse[];
      dateList = processFilesToDateList(files[0]?.files as ImageFile[] | []);
    }
  }

  if (dateList.length === 0) {
    if (!isArgo && !shouldUseApi && productId === 'monthlyMeans-anomalies') {
      const mockData = (monthlyMeansMockQuery.data as DateItem[] | undefined) || [];
      if (mockData.length > 0) {
        dateList = mockData;
      }
    }
    if (dateList.length === 0) {
      dateList = generateDateRange(productId, dateFormat, regionScope);
    }
  }

  const combinedLoading = isArgo
    ? argoQuery.isLoading
    : shouldUseApi
      ? standardQuery.isLoading
      : monthlyMeansMockQuery.isLoading;
  const combinedError = isArgo ? argoQuery.error : shouldUseApi ? standardQuery.error : monthlyMeansMockQuery.error;

  return { isLoading: combinedLoading, dateList, error: combinedError };
};

export default useDateList;
