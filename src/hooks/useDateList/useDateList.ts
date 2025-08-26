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
import { sharedQueryConfig } from '@/configs/query';
import { generateDateRange } from './mockData';

const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

// Shared, precompiled regex for SealCTD graph filenames like T_2014_p3.gif or S_2023_2024_p0.gif
const SEAL_CTD_FILENAME_REGEX = /^(?:T|S)_(\d{4})(?:_(\d{4}))?_p\d+\.gif$/i;

const processArgoDateList = (data: ArgoProfileCycle[]): DateItem[] => {
  if (!data || data.length === 0) {
    return [];
  }

  return data.map((cycle: ArgoProfileCycle) => ({
    date: cycle.date,
  }));
};

const processSealCtdDateList = (files: ImageFile[]): DateItem[] => {
  if (!files || files.length === 0) {
    return [];
  }
  const yearSet = new Set<string>();
  files.forEach((file) => {
    const match = SEAL_CTD_FILENAME_REGEX.exec(file.name);
    if (match) {
      const year = match[1]; // always use the first year (e.g., 2023 from S_2023_2024_p0.gif)
      if (year) yearSet.add(year);
    }
  });

  return Array.from(yearSet)
    .sort((a, b) => Number(a) - Number(b))
    .map((year) => ({ date: year }));
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

const shouldUseSealCtdProcessor = (productId: ProductID, files: ImageFile[]): boolean => {
  const isSealCtdTimeseriesProduct =
    productId === 'sealCtd-timeseriesTemperature' || productId === 'sealCtd-timeseriesSalinity';

  if (isSealCtdTimeseriesProduct) return true;

  // Fallback heuristic by filename pattern (T_YYYY_pN.gif or S_YYYY[_YYYY]_pN.gif)
  return files.some(({ name }) => SEAL_CTD_FILENAME_REGEX.test(name));
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
      const fileList = (files[0]?.files as ImageFile[]) || [];

      dateList = shouldUseSealCtdProcessor(productId, fileList)
        ? processSealCtdDateList(fileList)
        : processFilesToDateList(fileList);
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
