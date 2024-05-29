import React from 'react';
import BasicMap from '@/components/Map/BasicMap';
import { mapboxInstanceIds } from '@/constants/mapboxId';

const MainMap: React.FC = () => {
  return (
    <div className="h-[800px]">
      <BasicMap id={mapboxInstanceIds.oceanCurrentMainMap} />
    </div>
  );
};

export default MainMap;
