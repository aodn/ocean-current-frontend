import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createGIF, CreateGIFOptions, CreateGIFObject } from 'gifshot';
import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';
import { buildProductImageUrl, getTargetRegionScopPath } from '@/utils/data-image-builder-utils/dataImgBuilder';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import { RegionScope } from '@/constants/region';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { Button, Dropdown } from '@/components/Shared';
import DownloadIcon from '@/assets/icons/download-icon.svg';
import ArrowIcon from '@/assets/icons/Arrow';
import cross from '@/assets/icons/cross-icon.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import { useDateRange, useOutsideClick } from '@/hooks';
import useDateStore from '@/stores/date-store/dateStore';
import 'react-datepicker/dist/react-datepicker.css';

const VideoCreation = () => {
  const { allDates, isFourHourSst } = useDateRange();
  const gifOptionsRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showGifOptions, setShowGifOptions] = useState<boolean>(false);
  const [selectedFrameRate, setSelectedFrameRate] = useState<number>(3);
  const [gifWidth, setGifWidth] = useState<number>(500);
  const [gifHeight, setGifHeight] = useState<number>(500);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();

  const formatDate = isFourHourSst ? 'YYYYMMDDHH' : 'YYYYMMDD';

  const useDate = useDateStore((state) => state.date);

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  const regionPath = region?.code;

  const subProductImgPath = subProduct?.imgPath;

  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [allDatesVideoGeneration, setAllDatesVideoGeneration] = useState(allDates);
  const [startDate, setStartDate] = useState(allDates[0]?.date || dayjs().toDate());
  const [endDate, setEndDate] = useState(allDates[allDates.length - 1]?.date || dayjs().subtract(1, 'month').toDate());

  useEffect(() => {
    if (allDates && allDates.length > 0) {
      setAllDatesVideoGeneration(allDates);
      setStartDate(new Date(allDates[0].date));
      setEndDate(new Date(allDates[allDates.length - 1].date));
    }
  }, [allDates]);

  useOutsideClick<HTMLDivElement>(gifOptionsRef, () => {
    setShowGifOptions(false);
  });

  const frameRateOptions = Array.from({ length: 13 }, (_, i) => i + 3).map((rate) => ({
    id: rate.toString(),
    label: `${rate} frames`,
    value: rate,
  }));

  const customInput = (date: Date) => (
    <div className="flex w-48 cursor-pointer items-center justify-between rounded bg-white p-2 px-3">
      <p>{dayjs(date).format('MMM DD, YYYY')}</p>
      <img className="h-6 w-6" src={calendarIcon} alt="calendar icon" />
    </div>
  );

  const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = url;
    });
  };

  const getProductImageSize = async () => {
    const imageUrl = buildProductImageUrl(
      mainProduct!.key,
      subProductImgPath,
      regionPath!,
      targetPathRegion,
      useDate.toString(),
    );

    try {
      const { width, height } = await getImageDimensions(imageUrl);
      setGifWidth(width);
      setGifHeight(height);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  useEffect(() => {
    getProductImageSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGifOptions]);

  const loadImage = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  };

  const generateImageArray = async (): Promise<string[]> => {
    const imagePromises = allDatesVideoGeneration.map(({ date }, index) => {
      const formattedDate = dayjs(date).format(formatDate);
      const imageUrl = buildProductImageUrl(
        mainProduct!.key,
        subProductImgPath,
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
  };

  const fileName = () => {
    const formattedDateStart = dayjs(allDatesVideoGeneration[0].date).format(formatDate);
    const formattedDateEnd = dayjs(allDatesVideoGeneration[allDatesVideoGeneration.length - 1].date).format(formatDate);

    return `${mainProduct!.key}_${subProductImgPath}_${regionPath!}_${formattedDateStart}_${formattedDateEnd}.gif`;
  };

  const toggleGifOptions = () => {
    setShowGifOptions(!showGifOptions);
  };

  const handleClick = async () => {
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
        numWorkers: 5,
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
          link.href = obj.image;
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
  };

  const handleFrameRateChange = useCallback((selectedElement: DropdownElement): void => {
    const element = selectedElement as { id: string; label: string; value: number };
    setSelectedFrameRate(element.value);
  }, []);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setGifWidth(value);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setGifHeight(value);
    }
  };

  const updateAllDatesVideoGeneration = (start: Date, end: Date) => {
    const newAllDatesVideoGeneration = allDates.filter((dateObj) => {
      const adjustedEndDate = dayjs(end).add(1, 'day').toDate();
      return dateObj.date >= start && dateObj.date < adjustedEndDate;
    });
    setAllDatesVideoGeneration(newAllDatesVideoGeneration);
  };

  const handleStartDateChange = (date: Date) => {
    if (date <= endDate) {
      setStartDate(date);
      updateAllDatesVideoGeneration(date, endDate);
    } else {
      setErrorMessage('Start date cannot be after end date');
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (date >= startDate) {
      setEndDate(date);
      updateAllDatesVideoGeneration(startDate, date);
    } else {
      setErrorMessage('End date cannot be before start date');
    }
  };

  return (
    <div ref={gifOptionsRef}>
      <div
        aria-hidden
        onClick={() => toggleGifOptions()}
        className="flex h-11 cursor-pointer items-center justify-between rounded-md border border-[#3A6F8F] p-3"
      >
        <img className=" h-6 w-6" src={DownloadIcon} alt="share icon" />
        <p className=" font-medium text-imos-grey">Download</p>
        <ArrowIcon
          className={`h-3 w-3 transform transition-transform duration-300 ${showGifOptions ? 'rotate-180' : ''}`}
          stroke="#3B6E8F"
        />
      </div>
      {showGifOptions && (
        <div className="absolute right-0 z-50 mr-4 mt-3 w-3/12 rounded-md bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div></div>
            <p className="font-semibold">Customize Video</p>
            <img
              aria-hidden
              onClick={() => toggleGifOptions()}
              className="h-7 w-7 cursor-pointer"
              src={cross}
              alt="cross icon"
            />
          </div>
          <div className="rounded bg-[#E5EEF5] p-2">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[#3A6F8F]">Start Date</p>
              <ReactDatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                customInput={customInput(startDate)}
              />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[#3A6F8F]">End Date</p>
              <ReactDatePicker selected={endDate} onChange={handleEndDateChange} customInput={customInput(endDate)} />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className=" text-[#3A6F8F]">Frame Rate</p>
              <div className="w-48">
                <Dropdown
                  elements={frameRateOptions}
                  selectedId={selectedFrameRate.toString()}
                  onChange={handleFrameRateChange}
                  showIcons={false}
                  smallDropdown
                />
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[#3A6F8F]">Width (px)</p>
              <input
                type="number"
                value={gifWidth}
                onChange={handleWidthChange}
                className="w-48 rounded bg-white p-2 px-3"
                min="1"
                max={2000}
              />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[#3A6F8F]">Height (px)</p>
              <input
                type="number"
                value={gifHeight}
                onChange={handleHeightChange}
                className="w-48 rounded bg-white p-2 px-3"
                min="1"
                max={2000}
              />
            </div>
          </div>

          {isLoading && (
            <div className="my-4 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#52BDEC] transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="text-black">{`${progress}%`}</span>
            </div>
          )}

          {errorMessage && <p className="mt-2 text-center text-red-500">{errorMessage}</p>}

          <div className="mt-6 flex items-center justify-center">
            <Button type="primary" borderRadius="small" onClick={handleClick} disabled={isLoading}>
              Download Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCreation;
