import React from 'react';
import { useProductAvailableRegion } from '@/stores/product-store/hooks/useProductAvailableRegion';
import BasicMap from '@/components/Map/BasicMap';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const shouldRenderProductContent = useProductAvailableRegion();
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
