import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import { useDateRange } from '@/hooks';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import ShareIcon from '@/assets/icons/share-icon.svg';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import { resetCurrentMeterStore } from '@/stores/current-meters-store/currentMeters';

const CurrentMeterNavbar: React.FC = () => {
  const [copyButtonText, setCopyButtonText] = useState<string>(TEXT_CONSTANT.SHARE_PERMLINK);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    allDates,
    selectedDateIndex,
    handleYearDateChange,
    handleDateChange,
    isLastMonthOfTheYear,
    isMonthRange,
    resetDateRange,
    isWeekRange,
    isYearRange,
    modifyDate,
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

  const handleReset = () => {
    resetCurrentMeterStore();
    resetDateRange();
  };

  return (
    <div className="mb-2 rounded-md bg-[#FAFAFA] p-3 ">
      <div className="flex items-center  ">
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
            isWeekRange={isWeekRange}
            isMonthRange={isMonthRange}
            isYearRange={isYearRange}
          />
        </div>

        <div
          onClick={() => handleReset()}
          aria-hidden
          className="ml-4  flex h-11 w-1/12 cursor-pointer items-center justify-center rounded-md border border-[#3A6F8F] p-2"
        >
          <img src={ResetIcon} alt="" srcSet="" />
        </div>

        <div className="w-1/6">
          <div
            onClick={() => handleCopyLink()}
            aria-hidden
            className="ml-4 flex  h-11 cursor-pointer items-center justify-between rounded-md border border-[#3A6F8F] p-3 "
          >
            <img className="mr-6 h-6 w-6" src={ShareIcon} alt="share icon" />
            <p className="flex-grow text-center font-medium text-imos-grey">{copyButtonText}</p>
            <div className="w-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMeterNavbar;
