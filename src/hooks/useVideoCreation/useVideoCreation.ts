import { useState, useCallback, useEffect, useRef } from 'react';
import { createGIF, CreateGIFOptions, CreateGIFObject } from 'gifshot';
import dayjs from 'dayjs';
import { buildProductImageUrl, getTargetRegionScopePath } from '@/utils/data-image-builder-utils/dataImgBuilder';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import { RegionScope } from '@/constants/region';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { useDateRange } from '@/hooks';
import useDateStore from '@/stores/date-store/dateStore';
import { ImageDimensions, DateObject, UseVideoCreationReturn } from './types/useVideoCreation.types';

const useVideoCreation = (): UseVideoCreationReturn => {
  const { allDates, formatDate } = useDateRange();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFrameRate, setSelectedFrameRate] = useState<number>(3);
  const [gifWidth, setGifWidth] = useState<number>(500);
  const [gifHeight, setGifHeight] = useState<number>(500);
  const [allDatesVideoGeneration, setAllDatesVideoGeneration] = useState<DateObject[]>(allDates);
  const [startDate, setStartDate] = useState<Date>(allDates[0]?.date || dayjs().toDate());
  const [endDate, setEndDate] = useState<Date>(
    allDates[allDates.length - 1]?.date || dayjs().subtract(1, 'month').toDate(),
  );

  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();
  const useDate = useDateStore((state) => state.date);

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopePath(region?.scope || RegionScope.Au);
  const regionPath = region?.code;
  const subProductImgPath = subProduct?.imgPath;
  const aspectRatioRef = useRef<number>(1);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setErrorMessage('');
    setSelectedFrameRate(3);
    setAllDatesVideoGeneration(allDates);
    setStartDate(allDates[0]?.date || dayjs().toDate());
    setEndDate(allDates[allDates.length - 1]?.date || dayjs().subtract(1, 'month').toDate());
  }, [allDates]);

  useEffect(() => {
    resetState();
  }, [resetState, mainProduct, subProduct, regionPath]);

  useEffect(() => {
    if (allDates && allDates.length > 0) {
      setAllDatesVideoGeneration(allDates);
      setStartDate(new Date(allDates[0].date));
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
    if (!mainProduct || !regionPath || !targetPathRegion || !useDate) {
      return;
    }

    const imageUrl = buildProductImageUrl(
      mainProduct.key,
      subProductImgPath,
      regionPath,
      targetPathRegion,
      useDate.toString(),
    );

    try {
      const { width, height } = await getImageDimensions(imageUrl);
      setGifWidth(width);
      setGifHeight(height);
      aspectRatioRef.current = width / height;
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }, [mainProduct, subProductImgPath, regionPath, targetPathRegion, useDate, getImageDimensions]);

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
      const formattedDate = dayjs(date).format(formatDate);
      const imageUrl = buildProductImageUrl(
        mainProduct!.key,
        subProductImgPath!,
        regionPath!,
        targetPathRegion,
        formattedDate,
        true,
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
  }, [allDatesVideoGeneration, formatDate, mainProduct, subProductImgPath, regionPath, targetPathRegion, loadImage]);

  const fileName = useCallback((): string => {
    const formattedDateStart = dayjs(allDatesVideoGeneration[0].date).format(formatDate);
    const formattedDateEnd = dayjs(allDatesVideoGeneration[allDatesVideoGeneration.length - 1].date).format(formatDate);
    return `${mainProduct!.key}_${subProductImgPath}_${regionPath}_${formattedDateStart}_${formattedDateEnd}.gif`;
  }, [allDatesVideoGeneration, formatDate, mainProduct, subProductImgPath, regionPath]);

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
    (date: Date) => {
      if (date <= endDate) {
        setStartDate(date);
        updateAllDatesVideoGeneration(date, endDate);
      } else {
        setErrorMessage('Start date cannot be after end date');
      }
    },
    [endDate, updateAllDatesVideoGeneration],
  );

  const handleEndDateChange = useCallback(
    (date: Date) => {
      if (date >= startDate) {
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
