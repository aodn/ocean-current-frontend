import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { ProductID } from '@/types/product';
import { API_ENABLED_PRODUCTS, FIXED_DATA_PRODUCTS } from '@/configs/products';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { ImageFile, ImageListResponse } from '@/types/imageList';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { ArgoProfileCycle } from '@/types/argo';
import { DateItem, OceanColourDateItem } from '@/types/date';
import useProductStore from '@/stores/product-store/productStore';
import useArgoStore from '@/stores/argo-store/argoStore';
import { buildProductImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { RegionScope } from '@/constants/region';
import { sharedQueryConfig } from '@/configs/query';
import { useRegionLatestDates } from '@/services/hooks';
import { removeDuplicatesByKey } from '@/utils/array-utils';
import { useArgoProductValidQueryParams } from '../useArgoProductValidQueryParams/useArgoProductValidQueryParams';
import { generateDateRange } from './mockData';

type DateRange = { startDate: Date; endDate: Date };

interface UseDateListOptions {
  productId: ProductID;
  isFreeMode?: boolean;
}

const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

// Shared, precompiled regex for SealCTD graph filenames like T_2014_p3.gif or S_2023_2024_p0.gif
const SEAL_CTD_FILENAME_REGEX = /^(?:T|S)_(\d{4})(?:_(\d{4}))?_p\d+\.gif$/i;

const processArgoDateList = (data: ArgoProfileCycle[]): DateItem[] => {
  if (!data || data.length === 0) {
    return [];
  }

  return data.map((cycle: ArgoProfileCycle) => ({ date: cycle.date }));
};

const mergeFiles = (files: ImageListResponse[]) =>
  files.reduce((p, c) => {
    return [...p, ...c['files']];
  }, [] as ImageFile[]);

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

  return files.map((file) => ({ date: extractDateFromFilename(file.name) })).filter(({ date }) => /^\d+$/.test(date));
};

const processOceanColourFilesToDateList = (imageGroups: ImageListResponse[]): OceanColourDateItem[] => {
  if (!imageGroups || imageGroups.length === 0) {
    return [];
  }

  const dateList: OceanColourDateItem[] = [];

  // Process all groups (both with and without year folders)
  imageGroups.forEach((group) => {
    if (group.files && group.files.length > 0) {
      group.files.forEach((file) => {
        const date = extractDateFromFilename(file.name);
        if (/^\d+$/.test(date)) {
          dateList.push({ date, path: group.path });
        }
      });
    }
  });

  const uniqueDateList = dateList
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((item, index, array) => index === 0 || item.date !== array[index - 1].date);

  return uniqueDateList;
};

const shouldUseSealCtdProcessor = (productId: ProductID, files: ImageFile[]): boolean => {
  const isSealCtdTimeseriesProduct =
    productId === 'sealCtd-timeseriesTemperature' || productId === 'sealCtd-timeseriesSalinity';

  if (isSealCtdTimeseriesProduct) return true;

  // Fallback heuristic by filename pattern (T_YYYY_pN.gif or S_YYYY[_YYYY]_pN.gif)
  return files?.some(({ name }) => SEAL_CTD_FILENAME_REGEX.test(name)) || false;
};

const useDateList = ({ productId, isFreeMode = false }: UseDateListOptions) => {
  const shouldUseApi = API_ENABLED_PRODUCTS.includes(productId) && !FIXED_DATA_PRODUCTS.includes(productId);

  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const regionCodeFromStore = useProductStore((state) => state.productParams.regionCode);
  const region = regionCodeFromStore;
  const metaData = useArgoStore((state) => state);
  const wmoId = metaData.selectedArgoParams.worldMeteorologicalOrgId;

  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);

  const { isArgoValid } = useArgoProductValidQueryParams();
  const isArgo = productId === 'argo';

  // In free mode, disable all queries
  const argoQuery = useQuery({
    queryKey: ['argoDateList', wmoId],
    queryFn: () => fetchArgoProfileCyclesByWmoId(wmoId),
    enabled: !isFreeMode && isArgo && !!wmoId,
    ...sharedQueryConfig,
  });

  const standardQuery = useQuery({
    queryKey: ['dateList', productId, region],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region!),
    enabled: !isFreeMode && shouldUseApi && !isArgo && Boolean(region),
    ...sharedQueryConfig,
  });

  const { data: latestArgoLocationsData, isLoading: isLatestArgoLocationsDataLoading } = useRegionLatestDates(
    productId,
    !isFreeMode && isArgo && !isArgoValid,
  );

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
      //TODO: no need to create DateItem[] using generateDateRange to specify date range for date picker, we can
      // pass startdate and enddate to datepicker, enddate can be grabbed from new api point(expect to be created)
      // to get latest date, like what has been done for dateRange when isArgo && !isArgoValid like below.
    },
    enabled: !isFreeMode && !isArgo && !shouldUseApi && productId === 'monthlyMeans-anomalies' && Boolean(region),
    ...sharedQueryConfig,
  });

  let dateList: DateItem[] = [];
  let dateRange: DateRange | undefined; //only exists when isArgo && !isArgoValid or isFreeMode

  // Constants for date range
  const defaultStartDate = dayjs('2010-01-01').toDate();

  // Helper to get Argo end date (Argo always uses DAY format)
  const getArgoEndDate = () =>
    dayjs(
      latestArgoLocationsData?.regionLatestDates[0].latestDate || dayjs().subtract(1, 'day').format('YYYYMMDD'),
    ).toDate();

  // If in free mode, return early with empty dateList and date range mode
  if (isFreeMode) {
    // Special case: For Argo in free mode, use latestArgoLocationsData or fallback to yesterday
    const endDate = isArgo ? getArgoEndDate() : new Date();

    dateRange = { startDate: defaultStartDate, endDate };
    return { isLoading: false, dateList: [], error: null, dateRange };
  }

  if (shouldUseApi && data) {
    if (isArgo) {
      dateList = processArgoDateList(data as ArgoProfileCycle[]);
    } else {
      // Special case for ocean colour products that may have year folders
      if (productId === 'oceanColour-chlA') {
        // Process all groups to capture both regular and year-based files
        dateList = processOceanColourFilesToDateList(data as ImageListResponse[]);
      } else {
        /**
         * products comes here:
         * 1. 4-hour-sst 2.daily-sst 3.adjusted-sea-level 4.surface-wave 5. tidal-currents 6. sealCtd 7. eac-mooring
         *
         * NOTICE!!!!!!!
         * For tidal current with region = kingsound, it has data of 2011 which exists in data source. we can remove it
         * if necessary in the future by filter it out from the fileList.
         */
        const allFiles = mergeFiles(data as ImageListResponse[]);
        const fileList = removeDuplicatesByKey(allFiles, (file) => file.name);

        if (shouldUseSealCtdProcessor(productId, fileList)) {
          dateList = processSealCtdDateList(fileList);
        } else {
          dateList = processFilesToDateList(fileList);
        }
      }
    }
  }

  if (dateList.length === 0) {
    if (!isArgo && !shouldUseApi && productId === 'monthlyMeans-anomalies') {
      const mockData = (monthlyMeansMockQuery.data as DateItem[] | undefined) || [];
      if (mockData.length > 0) {
        dateList = mockData;
      }
    }
    if (isArgo && !isArgoValid) {
      dateRange = { startDate: defaultStartDate, endDate: getArgoEndDate() };
    } else {
      dateList = generateDateRange(productId, dateFormat, regionScope);
    }
  }

  const combinedLoading = isArgo
    ? argoQuery.isLoading || isLatestArgoLocationsDataLoading
    : shouldUseApi
      ? standardQuery.isLoading
      : monthlyMeansMockQuery.isLoading;
  const combinedError = isArgo ? argoQuery.error : shouldUseApi ? standardQuery.error : monthlyMeansMockQuery.error;

  return { isLoading: combinedLoading, dateList, error: combinedError, dateRange };
};

export default useDateList;
