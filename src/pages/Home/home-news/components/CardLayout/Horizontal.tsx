import React from 'react';
import { News } from '../../types/HomeNews.types';
import Title from './components/Title';
import Content from './components/Content';
import { Button } from '@/components/Shared';

interface HorizontalProps {
  news: News;
}
const Horizontal: React.FC<HorizontalProps> = ({ news: { title, content, imageUrl } }) => {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl border sm:flex">
      <div className="w-full sm:w-2/5">
        <img data-testid="news-img-card" src={imageUrl} alt={`${title} news img`} className="h-full object-fill" />
      </div>
      <div className="flex w-full flex-col justify-between p-6 sm:w-3/5">
        <Title title={title} />
        <Content content={content} lineClamp={5} />
        <div className="mt-4 flex justify-center md:mt-0 md:justify-end">
          <Button dataTestId="news-button-card" type="tertiary">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Horizontal;
