import React, { useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import arrowIcon from '@/assets/icons/arrow.svg';
import { convertDateToDisplayFormattedText } from '@/utils/date-utils/date';
import { DateFormat } from '@/types/date';
import { DatePickerProps } from './types/datePicker.types';
import MultiFormatDatePicker from './components/MultiFormatDatePicker';

const DatePicker: React.FC<DatePickerProps> = ({
  productId,
  goToPrevious,
  goToNext,
  canGoNext = true,
  selectedDate,
  dateFormat,
  onChange,
  isMobile,
  dateList,
}) => {
  const formattedSelectedDate = convertDateToDisplayFormattedText(dayjs(selectedDate), dateFormat);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        if (canGoNext) {
          goToNext();
        }
      }
    },
    [goToPrevious, canGoNext, goToNext],
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange(date);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const isSealCtdTagsAndYearFormat = productId?.includes('sealCtdTags') && dateFormat === DateFormat.YEAR_ONLY;

  return (
    <div className="flex h-full w-full items-center justify-between">
      {!isSealCtdTagsAndYearFormat && (
        <div className="flex-center h-full w-12 border-r-2 text-lg text-imos-title-blue">
          <button
            onClick={goToPrevious}
            className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold md:block"
          >
            <img className="h-4 w-4 rotate-90" src={arrowIcon} alt="left arrow icon" />
          </button>
        </div>
      )}

      <div className="flex-center h-full w-full justify-center">
        {!isSealCtdTagsAndYearFormat && (
          <div className="flex items-center justify-center text-center">
            <MultiFormatDatePicker
              dateList={dateList}
              selectedDate={selectedDate}
              onChange={handleDateChange}
              dateFormat={dateFormat}
              isMobile={isMobile}
            />
          </div>
        )}

        <div className="text-l">{formattedSelectedDate}</div>
      </div>

      {!isSealCtdTagsAndYearFormat && (
        <div className="flex-center h-full w-12 border-l-2 text-lg text-imos-title-blue">
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:block"
          >
            <img className="h-4 w-4 -rotate-90" src={arrowIcon} alt="right arrow icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
