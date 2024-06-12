import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';
import { Slider } from '@/components/Shared/index';
import arrowIcon from '@/assets/icons/arrow.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import { useDateStore, setStartDate, setEndDate } from '@/stores/date-store/dateStore';

const TimeSelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlDate = searchParams.get('date');

  const initialDate = urlDate ? dayjs(urlDate, 'YYYYMMDD').toDate() : dayjs().subtract(1, 'month').toDate();

  const steps: number = 1;

  const { startDate, endDate } = useDateStore(
    useShallow((state) => ({
      startDate: state.startDate.toDate(),
      endDate: state.endDate?.toDate() || null,
    })),
  );

  const [allDates, setAllDates] = useState<Date[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const selectedDateDayjs = dayjs(allDates[selectedDateIndex]);

  const isYesterdayOrLater: boolean = selectedDateDayjs.isSameOrAfter(dayjs().subtract(1, 'day'), 'day');

  const updateDateSlider = (newStartDate: Date, newEndDate: Date, position: 'start' | 'end' = 'start') => {
    const range = generateDateRange(newStartDate, newEndDate);
    setAllDates(range);
    const initialIndex = range.findIndex((date) => dayjs(date).isSame(dayjs(initialDate), 'day'));
    const dateIndex = position === 'start' ? 0 : range.length - 1;
    setSelectedDateIndex(initialIndex !== -1 ? initialIndex : dateIndex);
  };

  useEffect(() => {
    if (endDate) {
      updateDateSlider(startDate, endDate, 'end');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateDateRange = (start: Date, end: Date) => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);

    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      dates.push(current.toDate());
      current = current.add(1, 'day');
    }

    return dates;
  };

  const handleSliderChange = (newValue: number) => {
    if (newValue === selectedDateIndex) return;
    setSelectedDateIndex(newValue);
    const formattedDate = dayjs(allDates[newValue]).format('YYYYMMDD');
    updateUrlParams(formattedDate, startDate, endDate);
  };

  const updateUrlParams = (newDate: string, newStartDate: Date, newEndDate: Date | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('date', newDate);
    newSearchParams.set('startDate', dayjs(newStartDate).format('YYYYMMDD'));
    newSearchParams.set('endDate', dayjs(newEndDate).format('YYYYMMDD'));
    setSearchParams(newSearchParams);
  };

  const modifyDate = (modificationType: 'add' | 'subtract') => {
    let newStartDate = startDate;
    let newEndDate = endDate;
    let newIndex = selectedDateIndex;

    const isSubtractingAndAtStart = modificationType === 'subtract' && selectedDateIndex === 0;
    const isAddingAndAtEnd = modificationType === 'add' && selectedDateIndex === allDates.length - 1;

    if (isSubtractingAndAtStart) {
      newStartDate = dayjs(startDate).subtract(1, 'day').toDate();
    } else if (isAddingAndAtEnd) {
      newEndDate = dayjs(endDate).add(1, 'day').toDate();
      newIndex = newIndex + 1;
    } else {
      newIndex = modificationType === 'add' ? selectedDateIndex + 1 : selectedDateIndex - 1;
    }

    const newRange = generateDateRange(newStartDate, newEndDate!);
    setStartDate(dayjs(newStartDate));
    setEndDate(dayjs(newEndDate));
    setAllDates(newRange);
    setSelectedDateIndex(newIndex);
    updateUrlParams(dayjs(newRange[newIndex]).format('YYYYMMDD'), newStartDate, newEndDate!);
  };

  const formatDateLabel = (index: number) => dayjs(allDates[index]).format('DD-MM');

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start ? dayjs(start) : dayjs());
    setEndDate(end ? dayjs(end) : null);
    if (start && end) {
      updateDateSlider(start, end);
      updateUrlParams(dayjs(end).format('YYYYMMDD'), start, end);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex w-4/12 items-center justify-evenly rounded p-1 shadow-lg">
          <div className="max-w-11">
            <DatePicker
              customInput={<img src={calendarIcon} alt="calendar icon" className="mt-2 cursor-pointer" />}
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              maxDate={dayjs().toDate()}
              selectsRange
            />
          </div>
          <div className="my-4 flex items-center justify-between rounded-md border bg-background-gradient px-2 py-1 text-lg text-imos-title-blue shadow">
            <button
              onClick={() => modifyDate('subtract')}
              className="cursor-pointer rounded bg-white p-2 font-semibold"
            >
              <img className="h-2.5 w-2.5 rotate-90" src={arrowIcon} alt="right arrow icon" />
            </button>
            <span className="text-l px-5">{selectedDateDayjs.format('DD MMM YYYY')}</span>
            <button
              onClick={() => modifyDate('add')}
              disabled={isYesterdayOrLater}
              className="cursor-pointer rounded bg-white p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              <img className="h-2.5 w-2.5 -rotate-90" src={arrowIcon} alt="left arrow icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 flex w-full items-center justify-between rounded p-4 px-6 pb-10 shadow-lg">
        {allDates.length > 0 && (
          <div className="w-full px-2 ">
            <Slider
              value={selectedDateIndex}
              onChange={handleSliderChange}
              min={0}
              max={allDates.length - 1}
              step={steps}
              labelFormatter={formatDateLabel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
