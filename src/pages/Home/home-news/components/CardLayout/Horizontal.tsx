import React from 'react';
import { Button } from '@/components/Shared';
import { News } from '../../types/homeNews.types';
import Title from './components/Title';
import Content from './components/Content';

interface HorizontalProps {
  news: News;
}
const Horizontal: React.FC<HorizontalProps> = ({ news: { title, content, imageUrl } }) => {
  return (
    <div className="sm:flex h-full w-full overflow-hidden rounded-xl border bg-white">
      <div className="sm:w-2/5 w-full">
        <img data-testid="news-img-card" src={imageUrl} alt={`${title} news`} className="object-fill" />
      </div>
      <div className="sm:w-3/5 flex w-full flex-col justify-between p-6">
        <Title title={title} />
        <Content content={content} lineClamp={5} />
        <div className="md:mt-0 md:justify-end mt-4 flex justify-center">
          <Button dataTestId="news-button-card" type="tertiary">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Horizontal;
