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
      {showMap && (
        <div className="h-[500px] w-full md:hidden">
          <BasicMap />
        </div>
      )}
      <div className={`h-full w-full ${showMap ? 'hidden md:block' : 'block'}`}>
        <ProductContent />
      </div>
    </div>
  );
};

export default DataView;
