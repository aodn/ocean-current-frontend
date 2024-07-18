import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import DateSlider from '@/components/DateSlider/DateSlider';
import VideoCreation from '@/components/VideoCreation/VideoCreation';
import useDateRange from '@/hooks/useDateRange/useDateRange';
import { Button, ToggleButton } from '@/components/Shared';
import VideoIcon from '@/assets/icons/video-icon.svg';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import ShareIcon from '@/assets/icons/share-icon.svg';
import { ProductNavbarProps } from './types/ProductNavbarProps.types';

const ProductNavbar: React.FC<ProductNavbarProps> = ({ setShowVideo }) => {
  const [copyButtonText, setCopyButtonText] = useState<string>(TEXT_CONSTANT.SHARE_PERMLINK);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setLocalShowVideo] = useState(false);

  const {
    startDate,
    endDate,
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
    setYesterdayAsSelected,
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

  const handleTodayClick = () => {
    setYesterdayAsSelected();
  };

  return (
    <div className="mb-2 bg-[#FAFAFA] p-1 shadow-lg">
      <div className="flex items-center justify-between rounded">
        <div className="w-1/3 border-r-2">
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            addButtonDisabled={isSelectedDayYesterdayOrLater}
            handleDateChange={handleDateChange}
            handleYearDateChange={handleYearDateChange}
            modifyDate={modifyDate}
            selectedDate={allDates[selectedDateIndex]?.date}
            isLastMonthOfTheYear={isLastMonthOfTheYear}
            isFourHourSst={isFourHourSst}
            isYearRange={isYearRange}
          />
        </div>
        <div className="flex w-1/5 items-center justify-center border-r-2 px-4 py-4">
          <img src={VideoIcon} alt="video icon" />
          <p className="mx-3 text-imos-sea-blue">Video</p>
          <ToggleButton isOn={showVideo} onToggle={handleToggle} />
        </div>
        <div className="w-1/5 border-r-2 px-4 py-4">
          <Button onClick={() => handleCopyLink()} size="full" borderRadius="small" type="secondary">
            <img src={ShareIcon} alt="share icon" />
            {copyButtonText}
          </Button>
        </div>
        <div className="ml-4 w-1/5">
          <VideoCreation allDates={allDates} />
        </div>
      </div>
      <div className="mb-2 flex items-center justify-center">
        <DateSlider
          isYearRange={isYearRange}
          allDates={allDates}
          selectedDateIndex={selectedDateIndex}
          handleSliderChange={handleSliderChange}
          steps={steps}
        />

        <div className="mx-2">
          <Button onClick={() => handleTodayClick()} size="auto" borderRadius="small" type="secondary">
            Latest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductNavbar;
