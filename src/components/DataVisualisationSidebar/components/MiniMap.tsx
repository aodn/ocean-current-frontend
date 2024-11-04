import React from 'react';
import { mapboxInstanceIds } from '@/constants/mapboxId';
import BasicMap from '../../Map/BasicMap';

const MiniMap: React.FC = () => {
  return (
    <BasicMap
      id={mapboxInstanceIds.SIDEBAR_MINI_MAP_ID}
      isMiniMap
      navigationControl={false}
      fullScreenControl={false}
    />
  );
};

export default MiniMap;
