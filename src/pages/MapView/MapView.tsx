import React, { useEffect } from 'react';
import BasicMap from '@/components/Map/BasicMap';
import { resetMapStore } from '@/stores/map-store/mapStore';

const MapView: React.FC = () => {
  useEffect(() => {
    resetMapStore();
  }, []);

  return (
    <div className="h-125 w-full overflow-hidden rounded-md md:h-165">
      <BasicMap />
    </div>
  );
};

export default MapView;
