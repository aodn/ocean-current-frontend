import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Slider } from '@/components/Shared/index';
import useArgoStore from '@/stores/argo-store/argoStore';
import arrowIcon from '@/assets/icons/arrow.svg';

const TimeSelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { depth, worldMeteorologicalOrgId, cycle } = useArgoStore((state) => state.argoParams);
  const initialDate = useArgoStore((state) => state.date);
  const urlDate = searchParams.get('date');
  const initialStartDate = urlDate ? dayjs(urlDate, 'YYYYMMDD').toDate() : dayjs(initialDate).toDate();
  const initialEndDate = dayjs(initialStartDate).add(1, 'month').toDate();

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [allDates, setAllDates] = useState<Date[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  useEffect(() => {
    if (endDate) {
      const range = generateDateRange(startDate, endDate);
      setAllDates(range);
    }
  }, [startDate, endDate]);

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
    setSelectedDateIndex(newValue);
    const formattedDate = dayjs(allDates[newValue]).format('YYYYMMDD');
    changeDateUrlParams(formattedDate);
  };

  const changeDateUrlParams = (newDate: string) => {
    setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle: cycle, depth, date: newDate });
  };

  const modifyDate = (modificationType: 'add' | 'subtract') => {
    let newStartDate = startDate;
    let newEndDate = endDate;
    let newIndex = selectedDateIndex;
    let newRange = allDates;

    if (modificationType === 'subtract' && selectedDateIndex === 0) {
      newStartDate = dayjs(startDate).subtract(1, 'day').toDate();
      newRange = generateDateRange(newStartDate, endDate!);
      newIndex = 0;
    } else if (modificationType === 'add' && selectedDateIndex === allDates.length - 1) {
      newEndDate = dayjs(endDate).add(1, 'day').toDate();
      newRange = generateDateRange(startDate, newEndDate);
      newIndex = newRange.length - 1;
    } else {
      newIndex = modificationType === 'add' ? selectedDateIndex + 1 : selectedDateIndex - 1;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setAllDates(newRange);
    setSelectedDateIndex(newIndex);
    changeDateUrlParams(dayjs(newRange[newIndex]).format('YYYYMMDD'));
  };

  const formatDateLabel = (index: number) => {
    return dayjs(allDates[index]).format('DD-MM');
  };

  return (
    <div className="flex justify-between">
      <div className="flex w-10/12 items-center justify-between rounded p-4 px-6 pb-10 shadow-lg">
        {allDates.length > 0 && (
          <div className="w-full px-2 ">
            <Slider
              value={selectedDateIndex}
              onChange={handleSliderChange}
              min={0}
              max={allDates.length - 1}
              step={1}
              labelFormatter={formatDateLabel}
            />
          </div>
        )}
      </div>
      <div className="ml-2 flex w-2/12 items-center justify-center rounded p-4 shadow-lg">
        <img
          onClick={() => modifyDate('subtract')}
          className="mr-6 h-4 w-4 rotate-90 cursor-pointer rounded"
          src={arrowIcon}
          alt="right arrow icon"
          aria-hidden="true"
        />
        <DatePicker
          customInput={<p className="cursor-pointer">{dayjs(allDates[selectedDateIndex]).format('DD MMM YYYY')}</p>}
          selected={startDate}
          onChange={(dates: [Date | null, Date | null]) => {
            const [start, end] = dates;
            setStartDate(start || new Date());
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
        <img
          onClick={() => modifyDate('add')}
          className="ml-6 h-4 w-4 -rotate-90 cursor-pointer rounded"
          src={arrowIcon}
          aria-hidden="true"
          alt="left arrow icon"
        />
      </div>
    </div>
  );
};

export default TimeSelector;
