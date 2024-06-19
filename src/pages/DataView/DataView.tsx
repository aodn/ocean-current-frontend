import React from 'react';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import MainMap from '../MapView/main-map/MainMap';
import ProductImage from './product-image/ProductImage';

const DataView: React.FC = () => {
  const isProductAvailableInRegion = useProductAvailableInRegion();

  return isProductAvailableInRegion ? <ProductImage /> : <MainMap />;
};

export default DataView;
