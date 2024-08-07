import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import DateSlider from '@/components/DateSlider/DateSlider';
import { useDateRange } from '@/hooks';
import { ToggleButton } from '@/components/Shared';
import VideoIcon from '@/assets/icons/video-icon.svg';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import ShareIcon from '@/assets/icons/share-icon.svg';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import VideoCreation from '@/components/VideoCreation/VideoCreation';
import { ProductNavbarProps } from './types/productNavbarProps.types';

const ProductNavbar: React.FC<ProductNavbarProps> = ({ setShowVideo }) => {
  const [copyButtonText, setCopyButtonText] = useState<string>(TEXT_CONSTANT.SHARE_PERMLINK);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setLocalShowVideo] = useState(false);

  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    allDates,
    selectedDateIndex,
    handleSliderChange,
    handleYearDateChange,
    handleDateChange,
    modifyDate,
    steps,
    isLastMonthOfTheYear,
    isFourHourSst,
    isYearRange,
    disableVideoCreation,
    isSurfaceWaves,
    resetDateRange,
  } = useDateRange();

  const handleCopyLink = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyButtonText('Copied!');

    timeoutRef.current = setTimeout(() => {
      setCopyButtonText(TEXT_CONSTANT.SHARE_PERMLINK);
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
    resetDateRange();
  };

  return (
    <div className="mb-2 rounded-md bg-[#FAFAFA] p-3 ">
      <div className="mb-2 flex items-center justify-between ">
        <div className="flex h-11 items-center justify-center rounded-md border border-[#3A6F8F] p-2">
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
            isFourHourSst={isFourHourSst}
            isSurfaceWaves={isSurfaceWaves}
            isYearRange={isYearRange}
          />
        </div>

        <div
          onClick={() => handleReset()}
          aria-hidden
          className="flex h-11 w-1/12 cursor-pointer items-center justify-center rounded-md border border-[#3A6F8F] p-2"
        >
          <img src={ResetIcon} alt="" srcSet="" />
        </div>
        <div className="flex h-11 w-1/5 items-center justify-center rounded-md border border-[#3A6F8F] p-3">
          <img src={VideoIcon} alt="video icon" />
          <p className="mx-3 text-imos-sea-blue">Video</p>
          <ToggleButton disabled={disableVideoCreation()} isOn={showVideo} onToggle={handleToggle} />
        </div>
        <div className="w-1/6">
          <div
            onClick={() => handleCopyLink()}
            aria-hidden
            className="flex h-11 cursor-pointer items-center justify-between rounded-md border border-[#3A6F8F] p-3 "
          >
            <img className="mr-6 h-6 w-6" src={ShareIcon} alt="share icon" />
            <p className="flex-grow text-center font-medium text-imos-grey">{copyButtonText}</p>
            <div className="w-6"></div>
          </div>
        </div>
        <div className="w-1/6">
          <VideoCreation />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <DateSlider
          isYearRange={isYearRange}
          allDates={allDates}
          selectedDateIndex={selectedDateIndex}
          handleSliderChange={handleSliderChange}
          steps={steps}
        />
      </div>
    </div>
  );
};

export default ProductNavbar;
