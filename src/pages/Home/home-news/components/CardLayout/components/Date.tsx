import React from 'react';

interface DateProps {
  date: string;
}
const Date: React.FC<DateProps> = ({ date }) => {
  return (
    <p data-testid="news-date-card" className="mb-4 text-imos-grey">
      {date}
    </p>
  );
};

export default Date;
