import React from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useDeviceType } from '@/hooks';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';
import CurrentMetersSidebar from './components/CurrentMetersSidebar';

const DataVisualisationSidebar: React.FC = () => {
  const { isArgo, isCurrentMeters } = useProductCheck();
  const { isMobile } = useDeviceType();

  if (isMobile) {
    return <ProductSideBar />;
  }

  switch (true) {
    case isArgo:
      return <ArgoSideBar />;
    case isCurrentMeters:
      return <CurrentMetersSidebar />;
    default:
      return <ProductSideBar />;
  }
};

export default DataVisualisationSidebar;
