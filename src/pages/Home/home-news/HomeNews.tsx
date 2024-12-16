import React from 'react';
import { mockNews } from './data/HomeNewsData';
import NewsCard from './components/NewsCard/NewsCard';

const HomeNews: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-8xl py-10">
      <div className="flex items-center justify-between">
        <h2 className="py-4 text-center text-2xl text-imos-black">OceanCurrent News</h2>
        <button className="bg-transparent text-center text-lg text-imos-grey">View more &rarr;</button>
      </div>
      <div className="md:grid md:*:mb-0 grid-cols-3 gap-8 *:mb-4">
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
