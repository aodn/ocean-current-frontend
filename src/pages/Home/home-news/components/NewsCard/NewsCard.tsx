import React, { ReactNode } from 'react';
import HorizontalLayout from '../CardLayout/Horizontal';
import DateTitleContent from '../CardLayout/DateTitleContent';
import { NewsCardLayout, News } from '../../types';

interface NewsCardProps {
  news: News;
  layout?: NewsCardLayout;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'date-title-content' }) => {
  const layoutMap: Record<NewsCardLayout, () => ReactNode> = {
    horizontal: () => <HorizontalLayout news={news} />,
    'date-title-content': () => <DateTitleContent news={news} />,
    'title-content-date': () => null,
    'title-image-content': () => null,
    'image-title-content': () => null,
  };

  const renderLayout = () => {
    const layoutComponent = layoutMap[layout];
    return layoutComponent();
  };

  return renderLayout();
};

export default NewsCard;
