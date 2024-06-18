import React from 'react';
import { mapboxInstanceIds } from '@/constants/mapboxId';
import BasicMap from '../../Map/BasicMap';
import NavigateIcon from './NavigateIcon';

const MiniMap: React.FC = () => {
  return (
    <BasicMap id={mapboxInstanceIds.sidebarMiniMap} navigationControl={false} fullScreenControl={false}>
      <NavigateIcon />
    </BasicMap>
  );
};

export default MiniMap;
