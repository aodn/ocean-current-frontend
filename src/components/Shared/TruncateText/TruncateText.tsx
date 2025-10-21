import React from 'react';
import { TruncateTextProps } from './types/truncateText.types';

const TruncateText: React.FC<TruncateTextProps> = ({ text, lines = 2, className = '' }) => {
  return (
    <p
      data-testid="truncate-text"
      className={`overflow-hidden text-ellipsis ${className}`}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        lineClamp: lines,
      }}
    >
      {text}
    </p>
  );
};

export default TruncateText;
