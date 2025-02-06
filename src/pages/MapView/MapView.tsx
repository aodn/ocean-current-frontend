import React, { useEffect } from 'react';
import BasicMap from '@/components/Map/BasicMap';
import { resetMapStore } from '@/stores/map-store/mapStore';

const MapView: React.FC = () => {
  useEffect(() => {
    resetMapStore();
  }, []);

  return (
    <div className="h-[660px] w-full">
      <BasicMap />
    </div>
  );
};

export default MapView;
