import React from 'react';

interface ContentProps {
  content: string;
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
    <p className={`${lineClampMap[lineClamp]} overflow-hidden text-ellipsis text-[13px] text-[#858585]`}>{content}</p>
  );
};

export default Content;
