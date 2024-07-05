import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setProductId } from '@/stores/product-store/productStore';
import { getProductByPath } from '@/utils/product-utils/product';
import { useProductFromUrl } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';

const MapLayout: React.FC = () => {
  const product = useProductFromUrl('map');

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
    <div className="mx-auto my-9 w-full max-w-8xl shadow-layout-shadow">
      <div className="flex w-full">
        <div className="w-1/3">
          <MapSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MapLayout;
