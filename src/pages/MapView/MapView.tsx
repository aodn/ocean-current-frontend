import React, { useEffect } from 'react';
import BasicMap from '@/components/Map/BasicMap';
import { resetMapStore } from '@/stores/map-store/mapStore';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';

const MapView: React.FC = () => {
  const { isArgo } = useProductCheck();

  useEffect(() => {
    resetMapStore();
  }, []);

  return (
    <div className="h-[660px] w-full">
      <BasicMap shouldFitArgoBounds={isArgo} />
    </div>
  );
};

export default MapView;
