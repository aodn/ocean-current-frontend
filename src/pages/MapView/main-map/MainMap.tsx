import React from 'react';
import BasicMap from '@/components/Map/BasicMap';

const MainMap: React.FC = () => {
  return (
    <div className="h-[600px]">
      <BasicMap id="oc-main-map" />
    </div>
  );
};

export default MainMap;
