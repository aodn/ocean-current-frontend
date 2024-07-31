import React from 'react';
import { News } from '../../../types/homeNews.types';

const Title: React.FC<Pick<News, 'title'>> = ({ title }) => {
  return (
    <h3 data-testid="news-title-card" className="text-xl text-imos-black">
      {title}
    </h3>
  );
};

export default Title;
