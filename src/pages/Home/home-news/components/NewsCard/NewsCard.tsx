import React from 'react';
import { News, NewsCardLayout } from '../../types/HomeNews.types';
import HorizontalLayout from '../CardLayout/Horizontal';
import DateTitleContentLayout from '../CardLayout/DateTitleContent';

interface NewsCardProps {
  news: News;
  layout?: NewsCardLayout;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'date-title-content' }) => {
  const renderLayout = () => {
    switch (layout) {
      case 'horizontal':
        return <HorizontalLayout news={news} />;
      case 'date-title-content':
        return <DateTitleContentLayout news={news} />;
      case 'title-content-date':
      case 'title-image-content':
      case 'image-title-content':
        return null;
      default:
        ((_: never) => {})(layout);
    }
  };

  return <>{renderLayout()}</>;
};

export default NewsCard;
