import React, { useEffect } from 'react';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import BasicMap from '@/components/Map/BasicMap';
import { resetMapStore } from '@/stores/map-store/mapStore';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const { isArgo, isCurrentMeters, isEACMooringArray, isSealCtdTags } = useProductCheck();
  const isProductAvailableInRegion = useProductAvailableInRegion();

  useEffect(() => {
    if (!isProductAvailableInRegion) {
      resetMapStore();
    }
  }, [isProductAvailableInRegion]);

  const renderView = () => {
    if (isProductAvailableInRegion || isArgo || isCurrentMeters || isEACMooringArray || isSealCtdTags) {
      return <ProductContent />;
    }

    return (
      <div className="h-[660px]">
        <BasicMap />
      </div>
    );
  };

  return renderView();
};

export default DataView;
