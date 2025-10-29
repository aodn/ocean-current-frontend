import React, { useEffect } from 'react';
import BasicMap from '@/components/Map/BasicMap';
import { resetMapStore } from '@/stores/map-store/mapStore';

const MapView: React.FC = () => {
  useEffect(() => {
    resetMapStore();
  }, []);

  return (
    <div className="h-[500px] w-full md:h-[660px]">
      <BasicMap />
    </div>
  );
};

export default MapView;
