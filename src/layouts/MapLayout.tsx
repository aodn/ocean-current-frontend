import React from 'react';
import { Outlet } from 'react-router-dom';
import { setProductId } from '@/stores/product-store/productStore';
import { useDeviceType, useSetProductId, useUrlType } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { Loading } from '@/components/Shared';
import ProductMenuBar from '@/components/ProductMenuBar/ProductMenuBar';
import ProductDropdown from '@/components/DataVisualisationSidebar/components/ProductDropdown';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const MapLayout: React.FC = () => {
  const { isMobile } = useDeviceType();
  const { mainProduct } = useProductConvert();

  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  if (!mainProduct) {
    return <Loading />;
  }

  return (
    <div className="mx-auto mb-9 mt-4 w-full max-w-8xl">
      <div className="w-full md:flex">
        {isMobile ? (
          <div className="mb-2">
            <ProductDropdown mainProductKey={mainProduct.key} />
          </div>
        ) : (
          <div className="hidden w-1/3 md:block">
            <MapSidebar />
          </div>
        )}
        <div className="w-full md:mx-2">
          {/* we never need to show video when viewing the main map */}
          <ProductMenuBar setShowVideo={() => false} isMapView={true} />

          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
