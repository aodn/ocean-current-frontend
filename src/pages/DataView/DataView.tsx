import React from 'react';
import { useOutletContext } from 'react-router';
import { useShowProductOverMap } from '@/stores/product-store/hooks/useShowProductOverMap';
import BasicMap from '@/components/Map/BasicMap';
import ProductContent from './product-content/ProductContent';

const DataView: React.FC = () => {
  const shouldRenderProductContent = useShowProductOverMap();
  const { showMap } = useOutletContext<{ showMap: boolean }>();

  if (!shouldRenderProductContent) {
    return (
      <div className="h-[500px] w-full md:h-[660px]">
        <BasicMap />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className={`h-[500px] w-full md:hidden ${showMap ? 'block' : 'absolute -z-10 opacity-0'}`}>
        <BasicMap />
      </div>
      <div className={`h-full w-full md:block ${showMap ? 'hidden' : 'block'}`}>
        <ProductContent />
      </div>
    </div>
  );
};

export default DataView;
