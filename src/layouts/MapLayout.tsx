import React from 'react';
import { Outlet } from 'react-router-dom';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { useDeviceType, useSetProductId, useUrlType } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import SidebarProductDropdown from '@/components/DataVisualisationSidebar/components/SidebarProductDropdown';
import { Loading } from '@/components/Shared';
import ProductMenuBar from '@/components/ProductMenuBar/ProductMenuBar';

const MapLayout: React.FC = () => {
  const { isMobile } = useDeviceType();
  const productId = useProductStore((state) => state.productParams.productId);

  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  if (!productId) {
    return <Loading />;
  }

  return (
    <div className="mx-auto mb-9 mt-4 w-full max-w-8xl">
      <div className="w-full md:flex">
        {isMobile ? (
          <div className="mb-2">
            <SidebarProductDropdown />
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
