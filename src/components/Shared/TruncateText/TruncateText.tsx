import React from 'react';
import { TruncateTextProps } from './types/truncateText.types';

const TruncateText: React.FC<TruncateTextProps> = ({ text, lines = 2 }) => {
  return (
    <div
      data-testid="truncate-text"
      className="overflow-hidden text-ellipsis text-imos-grey"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        lineClamp: lines,
      }}
    >
      {text}
    </div>
  );
};

export default TruncateText;
