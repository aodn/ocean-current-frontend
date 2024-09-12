import React from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import CurrentMeterNavbar from '../CurrentMeterNavbar/CurrentMeterNavbar';
import ProductNavbar from '../ProductNavbar/ProductNavbar';
import { ProductNavbarProps } from '../ProductNavbar/types/productNavbarProps.types';

const DataVisualisationNavbar: React.FC<ProductNavbarProps> = ({ setShowVideo }) => {
  const { isCurrentMeters } = useProductCheck();

  if (isCurrentMeters) {
    return <CurrentMeterNavbar />;
  }

  return <ProductNavbar setShowVideo={setShowVideo} />;
};

export default DataVisualisationNavbar;
