import React from 'react';
import { mapboxInstanceIds } from '@/constants/mapboxId';
import BasicMap from '../../Map/BasicMap';

const MiniMap: React.FC = () => {
  return (
    <div className="h-60 w-full overflow-hidden">
      <BasicMap id={mapboxInstanceIds.SIDEBAR_MINI_MAP_ID} isMiniMap navigationControl={false} />
    </div>
  );
};

export default MiniMap;
