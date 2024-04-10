import React from 'react';
import BasicMap from '@/components/Map/BasicMap';

const HomeMap: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl drop-shadow-xy4">
      <BasicMap />
    </div>
  );
};

export default HomeMap;
