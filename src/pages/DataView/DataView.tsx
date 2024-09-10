import React, { useEffect } from 'react';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import BasicMap from '@/components/Map/BasicMap';
import { resetMapStore } from '@/stores/map-store/mapStore';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const { isArgo, isCurrentMeters } = useProductCheck();
  const isProductAvailableInRegion = useProductAvailableInRegion();

  useEffect(() => {
    if (!isProductAvailableInRegion) {
      resetMapStore();
    }
  }, [isProductAvailableInRegion]);

  const renderView = () => {
    if (isArgo || isCurrentMeters) {
      return <ProductContent />;
    }

    return isProductAvailableInRegion ? (
      <ProductContent />
    ) : (
      <div className="h-[800px]">
        <BasicMap />
      </div>
    );
  };

  return renderView();
};

export default DataView;
