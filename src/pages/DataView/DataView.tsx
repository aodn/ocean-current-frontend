import React from 'react';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import MainMap from '../MapView/main-map/MainMap';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const isProductAvailableInRegion = useProductAvailableInRegion();

  return isProductAvailableInRegion ? <ProductContent /> : <MainMap />;
};

export default DataView;
