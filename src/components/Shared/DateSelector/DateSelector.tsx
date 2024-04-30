import React from 'react';
import arrowIcon from '@/assets/icons/arrow.svg';
import { DateSelectorProps } from './types/dateSelector';

const DateSelector: React.FC<DateSelectorProps> = ({ date, subtractDay, addDay }) => {
  return (
    <div className="my-4 flex items-center justify-between rounded-md border bg-background-gradient px-2 py-1 text-lg text-imos-title-blue shadow">
      <button onClick={subtractDay} className="cursor-pointer rounded bg-white p-2 font-semibold">
        <img className="h-2.5 w-2.5 rotate-90" src={arrowIcon} alt="right arrow icon" />
      </button>
      <span className="text-lg ">{date.format('DD MMM YYYY')}</span>
      <button onClick={addDay} className="cursor-pointer rounded bg-white p-2 font-semibold ">
        <img className="h-2.5 w-2.5 -rotate-90" src={arrowIcon} alt="left arrow icon" />
      </button>
    </div>
  );
};

export default DateSelector;
