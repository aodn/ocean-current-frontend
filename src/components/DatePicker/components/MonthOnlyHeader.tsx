import React from 'react';
import dayjs from 'dayjs';

interface MonthOnlyHeaderProps {
  date: Date;
}

const MonthOnlyHeader: React.FC<MonthOnlyHeaderProps> = ({ date }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">{dayjs(date).format('MMMM')}</div>
    </div>
  );
};

export default MonthOnlyHeader;
