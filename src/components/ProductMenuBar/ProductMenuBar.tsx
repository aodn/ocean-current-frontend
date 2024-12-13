import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import { useDateRange } from '@/hooks';
import { ToggleButton } from '@/components/Shared';
import VideoIcon from '@/assets/icons/video-icon.svg';
import { ProductMenubarText } from '@/constants/textConstant';
import ShareIcon from '@/assets/icons/share-icon.svg';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import VideoCreation from '@/components/VideoCreation/VideoCreation';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { resetCurrentMeterStore } from '@/stores/current-meters-store/currentMeters';
import { ProductMenuBarProps } from './types/ProductMenuBar.types';

const ProductMenuBar: React.FC<ProductMenuBarProps> = ({ setShowVideo, isMapView = false }) => {
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    allDates,
    selectedDateIndex,
    handleYearDateChange,
    handleDateChange,
    modifyDate,
    isLastMonthOfTheYear,
    isMonthRange,
    disableVideoCreation,
    resetDateRange,
    isWeekRange,
  } = useDateRange();

  const [copyButtonText, setCopyButtonText] = useState<string>(ProductMenubarText.SHARE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setLocalShowVideo] = useState(false);
  const { isArgo, isCurrentMeters } = useProductCheck();
  const shouldDisableOption = disableVideoCreation() || isArgo || isMapView || isCurrentMeters;

  const handleCopyLink = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyButtonText(`${ProductMenubarText.COPIED}!`);

    timeoutRef.current = setTimeout(() => {
      setCopyButtonText(ProductMenubarText.SHARE);
    }, 2000);
  };

  const isSelectedDayYesterdayOrLater = dayjs(allDates[selectedDateIndex]?.date).isSameOrAfter(
    dayjs().subtract(1, 'day'),
    'day',
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggle = (state: boolean) => {
    setLocalShowVideo(state);
    setShowVideo(state);
  };

  const handleReset = () => {
    if (isCurrentMeters) resetCurrentMeterStore();
    resetDateRange();
  };

  return (
    <div className="mb-2 rounded-md">
      <div className="mb-2 flex items-center justify-between gap-3 font-sans font-medium text-imos-black">
        <div className="flex h-11 grow items-center justify-between rounded-md bg-white">
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            addButtonDisabled={isSelectedDayYesterdayOrLater}
            handleDateChange={handleDateChange}
            handleYearDateChange={handleYearDateChange}
            modifyDate={modifyDate}
            selectedDate={allDates[selectedDateIndex]?.date}
            isLastMonthOfTheYear={isLastMonthOfTheYear}
            isWeekRange={isWeekRange}
            isMonthRange={isMonthRange}
          />
        </div>

        <div
          onClick={() => handleReset()}
          aria-hidden
          className="flex-center h-11 w-12 cursor-pointer rounded-md bg-white p-2"
        >
          <img src={ResetIcon} alt="" srcSet="" />
        </div>
        <div
          className={`flex-center h-11 w-1/5 rounded-md bg-white p-3 ${shouldDisableOption && 'cursor-not-allowed opacity-50'}`}
        >
          <img src={VideoIcon} alt="video icon" />
          <p className="mx-3">{ProductMenubarText.VIDEO}</p>
          <ToggleButton disabled={shouldDisableOption} isOn={showVideo} onToggle={handleToggle} />
        </div>

        <div className="w-1/6">
          <div
            onClick={() => handleCopyLink()}
            aria-hidden
            className="flex h-11 cursor-pointer items-center justify-between rounded-md bg-white p-3"
          >
            <img className="mr-6 h-6 w-6" src={ShareIcon} alt="share icon" />
            <p className="flex-grow text-center">{copyButtonText}</p>
            <div className="w-6"></div>
          </div>
        </div>
        <div className="w-1/6">
          <VideoCreation disabled={shouldDisableOption} />
        </div>
      </div>
    </div>
  );
};

export default ProductMenuBar;
