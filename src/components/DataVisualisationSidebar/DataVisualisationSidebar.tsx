import React from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';

const DataVisualisationSidebar: React.FC = () => {
  const { isArgo } = useProductCheck();

  if (isArgo) {
    return <ArgoSideBar />;
  }

  return <ProductSideBar />;
};

export default DataVisualisationSidebar;
