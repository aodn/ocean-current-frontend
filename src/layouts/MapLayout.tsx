import React from 'react';
import { Outlet } from 'react-router-dom';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { useIsMobile, useSetProductId, useUrlType } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import HeaderSideBar from '@/components/DataVisualisationSidebar/components/HeaderSideBar';
import { Loading } from '@/components/Shared';

const MapLayout: React.FC = () => {
  const isMobile = useIsMobile();
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
            <HeaderSideBar />
          </div>
        ) : (
          <div className="hidden w-1/3 md:block">
            <MapSidebar />
          </div>
        )}
        <div className="w-full md:mx-2">
          <MapNavbar />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
