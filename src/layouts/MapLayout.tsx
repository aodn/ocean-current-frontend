import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setProductId } from '@/stores/product-store/productStore';
import { getProductByPath } from '@/utils/product-utils/product';
import { useProductFromUrl } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { useIsMobile } from '@/utils/isMobile-utils/isMobile';
import HeaderSideBar from '@/components/DataVisualisationSidebar/components/HeaderSideBar';

const MapLayout: React.FC = () => {
  const product = useProductFromUrl('map');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (product) {
      const { mainProduct, subProduct } = product;

      const mainProductKey = getProductByPath(mainProduct)!.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)!.key : null;

      const productId = subProductKey || mainProductKey;

      setProductId(productId);
    }
  }, [product]);

  return (
    <div className="mx-auto mb-9 mt-4 w-full max-w-8xl ">
      <div className="w-full md:flex ">
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
