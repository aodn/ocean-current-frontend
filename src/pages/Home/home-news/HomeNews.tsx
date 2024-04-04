import React from 'react';

import { mockNews } from './data/news';
import NewsCard from './components/NewsCard/NewsCard';

const HomeNews: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="p-4 text-center text-h2">News</h2>
        <button className="bg-transparent text-center text-lg">View more &rarr;</button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {mockNews.map((news, index) => (
          <div key={news.id} className={index === 0 ? 'col-span-2' : ''}>
            <NewsCard news={news} layout={index === 0 ? 'horizontal' : undefined} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNews;
