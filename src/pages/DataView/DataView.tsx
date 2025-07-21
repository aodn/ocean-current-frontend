import React from 'react';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import BasicMap from '@/components/Map/BasicMap';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const { isArgo, isCurrentMeters, isEACMooringArray, isSealCtdTags, isSurfaceWaves } = useProductCheck();
  const isProductAvailableInRegion = useProductAvailableInRegion();

  const shouldRenderProductContent =
    isProductAvailableInRegion || isArgo || isCurrentMeters || isEACMooringArray || isSealCtdTags || isSurfaceWaves;

  const renderView = () => {
    if (shouldRenderProductContent) {
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
