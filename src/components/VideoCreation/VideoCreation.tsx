import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';
import DownloadIcon from '@/assets/icons/download-icon.svg';
import ArrowIcon from '@/assets/icons/Arrow';
import cross from '@/assets/icons/cross-icon.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import { useOutsideClick, useVideoCreation } from '@/hooks';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Dropdown } from '@/components/Shared';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import { DropdownElement } from '../Shared/Dropdown/types/dropdown.types';

type FrameRateOption = {
  id: string;
  label: string;
};

const VideoCreation: React.FC = () => {
  const gifOptionsRef = useRef<HTMLDivElement>(null);
  const [showGifOptions, setShowGifOptions] = useState<boolean>(false);

  const {
    isLoading,
    progress,
    errorMessage,
    selectedFrameRate,
    gifWidth,
    gifHeight,
    startDate,
    endDate,
    handleClick,
    setSelectedFrameRate,
    setGifWidth,
    setGifHeight,
    handleStartDateChange,
    handleEndDateChange,
  } = useVideoCreation();

  useOutsideClick(gifOptionsRef, () => setShowGifOptions(false));

  const toggleGifOptions = (): void => setShowGifOptions(!showGifOptions);

  const frameRateOptions: FrameRateOption[] = Array.from({ length: 13 }, (_, i) => i + 3).map((rate) => ({
    id: rate.toString(),
    label: `${rate} frames`,
  }));

  const customInput = (date: Date): JSX.Element => (
    <div className="flex w-48 cursor-pointer items-center justify-between rounded bg-white p-2 px-3">
      <p>{dayjs(date).format('MMM DD, YYYY')}</p>
      <img className="h-6 w-6" src={calendarIcon} alt="calendar icon" />
    </div>
  );

  const handleFrameRateChange = (selectedElement: DropdownElement): void => {
    setSelectedFrameRate(Number(selectedElement.id));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, dimension: 'width' | 'height'): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      dimension === 'width' ? setGifWidth(value) : setGifHeight(value);
    }
  };

  return (
    <div ref={gifOptionsRef}>
      <div
        aria-hidden
        onClick={toggleGifOptions}
        className="flex h-11 cursor-pointer items-center justify-between rounded-md border border-[#3A6F8F] p-3"
      >
        <img className="h-6 w-6" src={DownloadIcon} alt="share icon" />
        <p className="font-medium text-imos-grey">Download</p>
        <ArrowIcon
          className={`h-3 w-3 transform transition-transform duration-300 ${showGifOptions ? 'rotate-180' : ''}`}
          stroke="#3B6E8F"
        />
      </div>
      {showGifOptions && (
        <div className="absolute right-0 z-50 mr-4 mt-3 w-3/12 rounded-md bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div></div>
            <p className="font-semibold">{TEXT_CONSTANT.CUSTOMIZE_GIF}</p>
            <img
              aria-hidden
              onClick={toggleGifOptions}
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
              <p className="text-[#3A6F8F]">Frame Rate</p>
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
                onChange={(e) => handleDimensionChange(e, 'width')}
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
                onChange={(e) => handleDimensionChange(e, 'height')}
                className="w-48 rounded bg-white p-2 px-3"
                min="1"
                max={2000}
              />
            </div>
          </div>

          {isLoading && (
            <div data-testid="progressbar" className="my-4 h-2 w-full rounded-full bg-gray-200">
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
