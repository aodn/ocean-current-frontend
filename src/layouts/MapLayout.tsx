import React from 'react';
import { Outlet } from 'react-router';
import { setProductId } from '@/stores/product-store/productStore';
import { useSetProductId, useUrlType } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { Loading } from '@/components/Shared';
import ProductDropdown from '@/components/DataVisualisationSidebar/components/ProductDropdown';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const MapLayout: React.FC = () => {
  const { mainProduct } = useProductConvert();

  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  if (!mainProduct) {
    return <Loading />;
  }

  return (
    <div className="mx-auto mb-4 mt-4 w-full max-w-8xl px-4 md:mb-9">
      <div className="w-full md:flex">
        <div className="mb-4 md:hidden">
          <ProductDropdown mainProductKey={mainProduct.key} />
        </div>
        <div className="hidden w-1/3 md:block">
          <MapSidebar />
        </div>
        <div className="w-full md:mx-2">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
