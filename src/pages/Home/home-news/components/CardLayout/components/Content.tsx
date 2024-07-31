import React from 'react';
import { News } from '../../../types/homeNews.types';

interface ContentProps extends Pick<News, 'content'> {
  lineClamp?: number;
}

const Content: React.FC<ContentProps> = ({ content, lineClamp = 4 }) => {
  const lineClampMap: Record<number, string> = {
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
  };

  return (
    <p
      data-testid="news-content-card"
      className={`${lineClampMap[lineClamp]} overflow-hidden text-ellipsis text-base text-imos-grey`}
    >
      {content}
    </p>
  );
};

export default Content;
