import React from 'react';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import MainMap from '../MapView/main-map/MainMap';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const { isArgo } = useProductCheck();
  const isProductAvailableInRegion = useProductAvailableInRegion();

  const renderView = () => {
    if (isArgo) {
      return <ProductContent />;
    }

    return isProductAvailableInRegion ? <ProductContent /> : <MainMap />;
  };

  return renderView();
};

export default DataView;
