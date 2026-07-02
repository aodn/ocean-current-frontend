import React from 'react';
import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';
import { DownloadIcon, ArrowIcon, CrossIcon, CalendarIcon } from '@/components/Shared/Icons';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Dropdown } from '@/components/Shared';
import { GeneralText, ProductMenubarText } from '@/constants/textConstant';
import { UseVideoCreationReturn } from '@/hooks/useVideoCreation/types/useVideoCreation.types';
import { VideoCreationUIProps } from '../types/videoCreationUI.types';

const defaultVideoCreationProps: UseVideoCreationReturn = {
  isLoading: false,
  progress: 0,
  errorMessage: '',
  selectedFrameRate: 1,
  gifWidth: 640,
  gifHeight: 480,
  startDate: new Date(),
  endDate: new Date(),
  handleGifDownload: async () => {},
  setSelectedFrameRate: () => {},
  setGifWidth: () => {},
  setGifHeight: () => {},
  handleWidthChange: () => {},
  handleHeightChange: () => {},
  handleStartDateChange: () => {},
  handleEndDateChange: () => {},
  resetState: () => {},
};

const VideoCreation: React.FC<VideoCreationUIProps> = ({
  disabled = false,
  showGifOptions = false,
  toggleGifOptions = () => {},
  handleFrameRateChange = () => {},
  gifOptionsRef = { current: null },
  frameRateOptions = [],
  videoCreationProps = defaultVideoCreationProps,
}) => {
  const {
    isLoading = false,
    progress = 0,
    errorMessage = '',
    selectedFrameRate = 1,
    gifWidth = 640,
    gifHeight = 480,
    startDate = new Date(),
    endDate = new Date(),
    handleGifDownload = () => {},
    handleWidthChange = () => {},
    handleHeightChange = () => {},
    handleStartDateChange = () => {},
    handleEndDateChange = () => {},
  } = videoCreationProps;

  const customInput = (date: Date): JSX.Element => (
    <div className="border-imos-calypso-blue/50 flex w-48 cursor-pointer items-center justify-between rounded-sm border-2 bg-white p-2 px-3">
      <p>{dayjs(date).format('MMM DD, YYYY')}</p>
      <CalendarIcon color="imos-deep-blue" size="sm" />
    </div>
  );

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, dimension: 'width' | 'height'): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      if (dimension === 'width') {
        handleWidthChange(value);
      } else {
        handleHeightChange(value);
      }
    }
  };

  return (
    <div ref={gifOptionsRef} className="h-full w-full">
      <div
        aria-hidden
        onClick={toggleGifOptions}
        data-testid="product-menu-bar-download-option"
        className={`flex h-full items-center justify-between rounded-md bg-white md:p-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <DownloadIcon color="imos-deep-blue" size="lg" />
        <p className="text-imos-deep-blue md:text-imos-dark-grey ml-1 text-sm font-medium md:ml-2 md:text-base">
          {ProductMenubarText.DOWNLOAD}
        </p>
        <ArrowIcon
          className={`hidden h-3 w-3 transform transition-transform duration-300 md:inline-block ${showGifOptions ? 'rotate-180' : ''}`}
        />
      </div>
      {showGifOptions && (
        <div className="absolute right-0 z-50 mt-5 mr-4 w-11/12 rounded-md bg-white p-4 md:mt-3 md:w-[27%]">
          <div className="mb-4 flex items-center justify-between">
            <div></div>
            <p className="font-semibold">{ProductMenubarText.CUSTOMISE_GIF}</p>
            <CrossIcon
              onClick={toggleGifOptions}
              className="h-7 w-7 cursor-pointer"
              color="imos-deep-blue"
              size="base"
              aria-label="Close"
              role="button"
            />
          </div>

          <div className="rounded-sm bg-[#E5EEF5] p-2">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-imos-calypso-blue">{GeneralText.START_DATE}</p>
              <ReactDatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                customInput={customInput(startDate)}
              />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-imos-calypso-blue">{GeneralText.END_DATE}</p>
              <ReactDatePicker selected={endDate} onChange={handleEndDateChange} customInput={customInput(endDate)} />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-imos-calypso-blue">{ProductMenubarText.ANIMATION_SPEED}</p>
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
              <p className="text-imos-calypso-blue">Width (px)</p>
              <input
                title="Width"
                type="number"
                value={gifWidth}
                onChange={(e) => handleDimensionChange(e, 'width')}
                className="border-imos-calypso-blue/50 w-48 rounded-sm border-2 bg-white p-2 px-3"
                min="1"
                max={2000}
              />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-imos-calypso-blue">Height (px)</p>
              <input
                title="Height"
                type="number"
                value={gifHeight}
                onChange={(e) => handleDimensionChange(e, 'height')}
                className="border-imos-calypso-blue/50 w-48 rounded-sm border-2 bg-white p-2 px-3"
                min="1"
                max={2000}
              />
            </div>
          </div>

          {isLoading && (
            <div data-testid="progressbar" className="my-4 h-2 w-full rounded-full bg-gray-200">
              <div
                className="bg-imos-sea-blue h-full rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {errorMessage && <p className="mt-2 text-center text-red-500">{errorMessage}</p>}

          <div className="mt-6 flex items-center justify-center">
            <Button type="primary" borderRadius="small" onClick={handleGifDownload} disabled={isLoading}>
              {ProductMenubarText.DOWNLOAD_GIF}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCreation;
