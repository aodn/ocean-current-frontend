import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { createGIF, CreateGIFOptions, CreateGIFObject } from 'gifshot';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { buildStaticImageUrl, getTargetRegionScopePath } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
import { RegionScope } from '@/constants/region';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { useDateList } from '@/hooks';
import useDateStore from '@/stores/date-store/dateStore';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { sharedQueryConfig } from '@/configs/query';
import { processOceanColourDateList } from '@/pages/DataView/product-content/utils/oceanColourUtils';
import { ImageDimensions, DateObject, UseVideoCreationReturn } from './types/useVideoCreation.types';

const DEFAULT_VIDEO_RANGE_DAYS = 30;

/** Get the default start date: ~30 days before the last available date */
const getDefaultStartDate = (dates: DateObject[]): Date => {
  if (dates.length === 0) return dayjs().toDate();
  const lastDate = dates[dates.length - 1].date;
  const cutoff = dayjs(lastDate).subtract(DEFAULT_VIDEO_RANGE_DAYS, 'day').toDate();
  return dates.find((d) => d.date >= cutoff)?.date ?? dates[0].date;
};

/** Filter dates to only those within the default range (last 30 days) */
const getDefaultDatesInRange = (dates: DateObject[]): DateObject[] => {
  if (dates.length === 0) return [];
  const start = getDefaultStartDate(dates);
  return dates.filter((d) => d.date >= start);
};

const useVideoCreation = (): UseVideoCreationReturn => {
  const useRegionCode = useProductStore((state) => state.productParams.regionCode);
  const useProductId = useProductStore((state) => state.productParams.productId);
  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const { mainProduct, subProduct } = useProductConvert();
  const useDate = useDateStore((state) => state.date);

  const { dateList } = useDateList({ productId: useProductId });

  // Convert dateList (string dates) to DateObject[] (Date objects)
  // useDateList returns a new array reference every render, so stabilize with content-based key
  const dateListKey = dateList.map((d) => d.date).join(',');
  const allDates: DateObject[] = useMemo(
    () => dateList.map((item) => ({ date: dayjs(item.date).toDate() })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dateListKey],
  );

  const formatDate = getDateFormatByProductIdAndRegionScope(useProductId, regionScope);

  const region = getRegionByRegionCode(useRegionCode);
  const regionPath = region?.code;
  const targetPathRegion = getTargetRegionScopePath(region?.scope || RegionScope.Au);
  const subProductImgPath = subProduct?.imgPath;

  // Ocean colour date list for URL building (cached by TanStack Query)
  const isOceanColourChlA = useProductId === 'oceanColour-chlA';
  const { data: oceanColourImageData } = useQuery({
    queryKey: ['dateList', useProductId, useRegionCode],
    queryFn: () => fetchImageListByProductIdAndRegion(useProductId, useRegionCode!),
    enabled: isOceanColourChlA && Boolean(useRegionCode),
    ...sharedQueryConfig,
  });
  const oceanColourDateList = useMemo(
    () => (isOceanColourChlA ? processOceanColourDateList(oceanColourImageData) : []),
    [isOceanColourChlA, oceanColourImageData],
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFrameRate, setSelectedFrameRate] = useState<number>(3);
  const [gifWidth, setGifWidth] = useState<number>(500);
  const [gifHeight, setGifHeight] = useState<number>(500);
  const [allDatesVideoGeneration, setAllDatesVideoGeneration] = useState<DateObject[]>(
    getDefaultDatesInRange(allDates),
  );
  const [startDate, setStartDate] = useState<Date>(getDefaultStartDate(allDates));
  const [endDate, setEndDate] = useState<Date>(allDates[allDates.length - 1]?.date || dayjs().toDate());
  const aspectRatioRef = useRef<number>(1);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setErrorMessage('');
    setSelectedFrameRate(3);
    setAllDatesVideoGeneration(getDefaultDatesInRange(allDates));
    setStartDate(getDefaultStartDate(allDates));
    setEndDate(allDates[allDates.length - 1]?.date || dayjs().toDate());
  }, [allDates]);

  useEffect(() => {
    resetState();
  }, [resetState, mainProduct, subProduct, useRegionCode]);

  useEffect(() => {
    if (allDates && allDates.length > 0) {
      setAllDatesVideoGeneration(getDefaultDatesInRange(allDates));
      setStartDate(getDefaultStartDate(allDates));
      setEndDate(new Date(allDates[allDates.length - 1].date));
    }
  }, [allDates]);

  const getImageDimensions = useCallback((url: string): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = url;
    });
  }, []);

  const getProductImageSize = useCallback(async () => {
    if (!mainProduct || !useRegionCode || !targetPathRegion || !useDate) {
      return;
    }

    const imageUrl = buildStaticImageUrl(
      useProductId,
      useDate,
      regionPath ?? 'Au',
      regionScope,
      targetPathRegion,
      useRegionCode,
      { oceanColourDateList },
    );

    try {
      const { width, height } = await getImageDimensions(imageUrl);
      setGifWidth(width);
      setGifHeight(height);
      aspectRatioRef.current = width / height;
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }, [
    useProductId,
    useRegionCode,
    regionPath,
    regionScope,
    targetPathRegion,
    useDate,
    getImageDimensions,
    mainProduct,
    oceanColourDateList,
  ]);

  useEffect(() => {
    getProductImageSize();
  }, [getProductImageSize]);

  const loadImage = useCallback((url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  }, []);

  const generateImageArray = useCallback(async (): Promise<string[]> => {
    const imagePromises = allDatesVideoGeneration.map(({ date }, index) => {
      const imageUrl = buildStaticImageUrl(
        useProductId,
        dayjs(date),
        regionPath ?? 'Au',
        regionScope,
        targetPathRegion,
        useRegionCode,
        { oceanColourDateList, isProxyRequired: true },
      );
      return loadImage(imageUrl)
        .then((url) => {
          setProgress(Math.round(((index + 1) / allDatesVideoGeneration.length) * 90));
          return url;
        })
        .catch(() => null);
    });

    const results = await Promise.all(imagePromises);
    return results.filter((url): url is string => url !== null);
  }, [
    allDatesVideoGeneration,
    useProductId,
    useRegionCode,
    regionPath,
    regionScope,
    targetPathRegion,
    oceanColourDateList,
    loadImage,
  ]);

  const fileName = useCallback((): string => {
    const formattedDateStart = dayjs(allDatesVideoGeneration[0].date).format(formatDate);
    const formattedDateEnd = dayjs(allDatesVideoGeneration[allDatesVideoGeneration.length - 1].date).format(formatDate);
    return `${mainProduct!.key}_${subProductImgPath}_${useRegionCode}_${formattedDateStart}_${formattedDateEnd}.gif`;
  }, [allDatesVideoGeneration, formatDate, mainProduct, subProductImgPath, useRegionCode]);

  const handleGifDownload = useCallback(async () => {
    setIsLoading(true);
    setProgress(0);
    setErrorMessage('');
    try {
      const images = await generateImageArray();

      if (images.length === 0) {
        throw new Error('No image could be uploaded');
      }

      const options: CreateGIFOptions = {
        images: images,
        gifWidth: gifWidth,
        gifHeight: gifHeight,
        numWorkers: 10,
        frameDuration: selectedFrameRate,
        sampleInterval: 100,
        progressCallback: (captureProgress: number) => {
          setProgress(Math.round(90 + captureProgress * 0.1));
        },
      };

      createGIF(options, (obj: CreateGIFObject) => {
        if (!obj.error) {
          setProgress(100);
          const link = document.createElement('a');
          link.download = fileName();
          link.href = obj.image as string;
          link.click();
        } else {
          console.error('Error creating GIF:', obj.error);
          setErrorMessage('Error creating GIF. Please try again.');
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error generating image array:', error);
      setErrorMessage('Error generating image array. Please try again.');
      setIsLoading(false);
      setProgress(0);
    }
  }, [generateImageArray, gifWidth, gifHeight, selectedFrameRate, fileName]);

  const updateAllDatesVideoGeneration = useCallback(
    (start: Date, end: Date) => {
      const newAllDatesVideoGeneration = allDates.filter((dateObj) => {
        const adjustedEndDate = dayjs(end).add(1, 'day').toDate();
        return dateObj.date >= start && dateObj.date < adjustedEndDate;
      });
      setAllDatesVideoGeneration(newAllDatesVideoGeneration);
    },
    [allDates],
  );

  const handleStartDateChange = useCallback(
    (date: Date | null) => {
      if (date && date <= endDate) {
        setStartDate(date);
        updateAllDatesVideoGeneration(date, endDate);
      } else {
        setErrorMessage('Start date cannot be after end date');
      }
    },
    [endDate, updateAllDatesVideoGeneration],
  );

  const handleEndDateChange = useCallback(
    (date: Date | null) => {
      if (date && date >= startDate) {
        setEndDate(date);
        updateAllDatesVideoGeneration(startDate, date);
      } else {
        setErrorMessage('End date cannot be before start date');
      }
    },
    [startDate, updateAllDatesVideoGeneration],
  );

  const handleWidthChange = useCallback((newWidth: number) => {
    setGifWidth(newWidth);
    setGifHeight(Math.round(newWidth / aspectRatioRef.current));
  }, []);

  const handleHeightChange = useCallback((newHeight: number) => {
    setGifHeight(newHeight);
    setGifWidth(Math.round(newHeight * aspectRatioRef.current));
  }, []);

  return {
    isLoading,
    progress,
    errorMessage,
    selectedFrameRate,
    gifWidth,
    gifHeight,
    startDate,
    endDate,
    handleGifDownload,
    handleWidthChange,
    handleHeightChange,
    setSelectedFrameRate,
    setGifWidth,
    setGifHeight,
    handleStartDateChange,
    handleEndDateChange,
    resetState,
  };
};

export default useVideoCreation;
