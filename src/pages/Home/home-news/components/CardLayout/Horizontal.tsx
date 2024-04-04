import React from 'react';
import { News } from '../../types';
import Title from './components/Title';
import Content from './components/Content';

interface HorizontalProps {
  news: News;
}
const Horizontal: React.FC<HorizontalProps> = ({ news }) => {
  const { title, content, imageUrl } = news;
  return (
    <div className="flex h-full w-full divide-x overflow-hidden rounded-xl border">
      <div className="w-2/5">
        <img src={imageUrl} alt="news profile" className="h-full object-fill" />
      </div>
      <div className="flex w-3/5 flex-col justify-between p-7">
        <Title title={title} />
        <Content content={content} lineClamp={5} />
        <div className="flex justify-end">
          <button className="flex h-8 w-32 items-center justify-center rounded-3xl border-[1.28px] border-[#929292] bg-transparent px-12 text-[18px] text-[#6f6f6f]">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Horizontal;
