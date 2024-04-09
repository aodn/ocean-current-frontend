import React from 'react';
import { News } from '../../../types/HomeNews.types';

const Date: React.FC<Pick<News, 'date'>> = ({ date }) => {
  return (
    <p data-testid="news-date-card" className="mb-4 text-imos-grey">
      {date}
    </p>
  );
};

export default Date;
