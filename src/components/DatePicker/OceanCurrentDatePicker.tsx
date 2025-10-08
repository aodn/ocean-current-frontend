import React, { useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import arrowIcon from '@/assets/icons/arrow.svg';
import { convertDateToDisplayFormattedText } from '@/utils/date-utils/date';
import { DateFormat } from '@/types/date';
import { OceanCurrentDatePickerProps } from './types/datePicker.types';
import MultiFormatDatePicker from './components/MultiFormatDatePicker';

const OceanCurrentDatePicker: React.FC<OceanCurrentDatePickerProps> = ({
  productId,
  goToPrevious,
  goToNext,
  canGoNext = true,
  canGoPrevious = true,
  selectedDate,
  dateFormat,
  onChange,
  isMobile,
  dateList,
  isDatePickerDisabled = false,
  displayText,
  startDate,
  endDate,
  isFreeMode = false,
}) => {
  const formattedSelectedDate = displayText || convertDateToDisplayFormattedText(dayjs(selectedDate), dateFormat);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isDatePickerDisabled) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        if (canGoPrevious) {
          goToPrevious();
        }
      } else if (event.key === 'ArrowRight') {
        if (canGoNext) {
          goToNext();
        }
      }
    },
    [goToPrevious, canGoPrevious, canGoNext, goToNext, isDatePickerDisabled],
  );

  const handleDateChange = (date: Date | null) => {
    if (isDatePickerDisabled) {
      return;
    }
    if (date) {
      onChange(date);
    }
  };

  useEffect(() => {
    if (!isDatePickerDisabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown, isDatePickerDisabled]);

  const isSealCtdTagsAndYearFormat = productId?.includes('sealCtdTags') && dateFormat === DateFormat.YEAR_ONLY;

  return (
    <div className="flex h-full w-full items-center justify-between">
      {!isSealCtdTagsAndYearFormat && (
        <div className="flex-center h-full w-12 border-r-2 text-lg text-imos-title-blue">
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:block"
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
              isDisabled={isDatePickerDisabled}
              startDate={startDate}
              endDate={endDate}
              isFreeMode={isFreeMode}
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

export default OceanCurrentDatePicker;
