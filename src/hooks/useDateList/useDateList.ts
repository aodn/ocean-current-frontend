import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { ProductID } from '@/types/product';
import { API_IMAGE_LIST_ENABLED_PRODUCTS, FIXED_IMAGE_LIST_PRODUCTS } from '@/configs/products';
import { fetchImageListByProductIdAndRegion, fetchTidalCurrentsMonthPlotsByPoint } from '@/services/imageList';
import { ImageFile, ImageListResponse } from '@/types/imageList';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { ArgoProfileCycle } from '@/types/argo';
import { DateItem, OceanColourDateItem } from '@/types/date';
import useProductStore from '@/stores/product-store/productStore';
import useArgoStore from '@/stores/argo-store/argoStore';
import { buildStaticImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { RegionScope } from '@/constants/region';
import { sharedQueryConfig } from '@/configs/query';
import { useRegionLatestDates } from '@/services/hooks';
import { removeDuplicatesByKey } from '@/utils/array-utils';
import { useTidalCurrentPoint } from '@/pages/DataView/product-content/hooks/useTidalCurrentPoint';
import { useArgoProductValidQueryParams } from '../useArgoProductValidQueryParams/useArgoProductValidQueryParams';
import { generateDateRange } from './mockData';

type DateRange = { startDate: Date; endDate: Date };

interface UseDateListOptions {
  productId: ProductID;
  mode?: 'range' | 'list';
}

const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

const extractDateFromTidalCurrentsPointFilename = (filename: string): string => {
  const datePart = filename.split('.')[0];
  const parts = datePart.split('_');
  return parts.at(-1) || 'invalid date';
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

const processFilesToDateList = (files: ImageFile[], cb: (filename: string) => string): DateItem[] => {
  if (!files || files.length === 0) {
    return [];
  }
  return files.map((file) => ({ date: cb(file.name) })).filter(({ date }) => /^\d+$/.test(date));
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

const useDateList = ({ productId, mode = 'list' }: UseDateListOptions) => {
  const isRangeMode = mode === 'range';
  const shouldUseApi =
    API_IMAGE_LIST_ENABLED_PRODUCTS.includes(productId) && !FIXED_IMAGE_LIST_PRODUCTS.includes(productId);

  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const regionCodeFromStore = useProductStore((state) => state.productParams.regionCode);
  const region = regionCodeFromStore;
  const metaData = useArgoStore((state) => state);
  const wmoId = metaData.selectedArgoParams.worldMeteorologicalOrgId;
  const { isTidalCurrentsPointSelected, selectedPoint } = useTidalCurrentPoint(productId);

  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);

  const { isArgoValid } = useArgoProductValidQueryParams();
  const isArgo = productId === 'argo';

  // In free mode, disable all queries
  const argoQuery = useQuery({
    queryKey: ['argoDateList', wmoId],
    queryFn: () => fetchArgoProfileCyclesByWmoId(wmoId),
    enabled: !isRangeMode && isArgo && !!wmoId,
    ...sharedQueryConfig,
  });

  const standardQuery = useQuery({
    queryKey: ['dateList', productId, region],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region!),
    enabled: !isRangeMode && shouldUseApi && !isArgo && Boolean(region) && !isTidalCurrentsPointSelected,
    ...sharedQueryConfig,
  });

  const tidalCurrentsPointQuery = useQuery({
    queryKey: ['tidalCurrentsPointDateList', productId, selectedPoint],
    queryFn: () => fetchTidalCurrentsMonthPlotsByPoint(selectedPoint!),
    enabled: !isRangeMode && isTidalCurrentsPointSelected,
    ...sharedQueryConfig,
  });
  const { data: latestArgoLocationsData, isLoading: isLatestArgoLocationsDataLoading } = useRegionLatestDates(
    productId,
    !isRangeMode && isArgo && !isArgoValid,
  );

  let data;
  if (isArgo) {
    data = argoQuery.data;
  } else if (isTidalCurrentsPointSelected) {
    data = tidalCurrentsPointQuery.data;
  } else {
    data = standardQuery.data;
  }

  // Async mock date list for monthlyMeans-30day to validate latest available month
  const monthlyMeansMockQuery = useQuery({
    queryKey: ['mockDateList', productId, region, dateFormat, regionScope],
    queryFn: async () => {
      const today = dayjs();
      const firstCandidate = today.date() >= 15 ? today : today.subtract(1, 'month');
      const candidateDate = firstCandidate.date(15);
      const candidateUrl = buildStaticImageUrl(
        'monthlyMeans-30day',
        candidateDate,
        region!,
        RegionScope.State,
        RegionScope.State,
        region!,
      );

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
    enabled: !isRangeMode && !isArgo && !shouldUseApi && productId === 'monthlyMeans-30day' && Boolean(region),
    ...sharedQueryConfig,
  });

  let dateList: DateItem[] = [];
  let dateRange: DateRange | undefined; //only exists when isArgo && !isArgoValid or isRangeMode

  // Constants for date range
  const defaultStartDate = dayjs('2010-01-01').toDate();

  // Helper to get Argo end date (Argo always uses DAY format)
  const getArgoEndDate = () =>
    dayjs(
      latestArgoLocationsData?.regionLatestDates[0].latestDate || dayjs().subtract(1, 'day').format('YYYYMMDD'),
    ).toDate();

  // If in range mode, return early with empty dateList and date range mode
  if (isRangeMode) {
    // Special case: For Argo in range mode, use latestArgoLocationsData or fallback to yesterday
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
        } else if (isTidalCurrentsPointSelected) {
          dateList = processFilesToDateList(fileList, extractDateFromTidalCurrentsPointFilename);
        } else {
          dateList = processFilesToDateList(fileList, extractDateFromFilename);
        }
      }
    }
  }

  if (dateList.length === 0) {
    if (!isArgo && !shouldUseApi && productId === 'monthlyMeans-30day') {
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

  const getLoadingState = () => {
    if (isArgo) return argoQuery.isLoading || isLatestArgoLocationsDataLoading;
    if (isTidalCurrentsPointSelected) return tidalCurrentsPointQuery.isLoading;
    if (shouldUseApi) return standardQuery.isLoading;
    return monthlyMeansMockQuery.isLoading;
  };

  const getError = () => {
    if (isArgo) return argoQuery.error;
    if (isTidalCurrentsPointSelected) return tidalCurrentsPointQuery.error;
    if (shouldUseApi) return standardQuery.error;
    return monthlyMeansMockQuery.error;
  };

  const combinedLoading = getLoadingState();
  const combinedError = getError();

  return { isLoading: combinedLoading, dateList, error: combinedError, dateRange };
};

export default useDateList;
