import React, { useState, useEffect } from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';
import CurrentMetersSidebar from './components/CurrentMetersSidebar';

const DataVisualisationSidebar: React.FC = () => {
  const { isArgo, isCurrentMeters } = useProductCheck();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
