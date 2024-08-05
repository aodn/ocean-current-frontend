import React from 'react';
import { News } from '../../../types/homeNews.types';

const Author: React.FC<Pick<News, 'author'>> = ({ author }) => {
  return (
    <p data-testid="news-author-card" className="italic text-imos-grey">
      {author}
    </p>
  );
};

export default Author;
