import React from 'react';
import { mapboxInstanceIds } from '@/constants/mapboxId';
import BasicMap from '../../Map/BasicMap';

const MiniMap: React.FC = () => {
  return (
    <div className="hidden h-60 w-full overflow-hidden md:block">
      <BasicMap id={mapboxInstanceIds.SIDEBAR_MINI_MAP_ID} isMiniMap navigationControl={false} />
    </div>
  );
};

export default MiniMap;
