import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { setMainProduct, setSubProduct } from '@/stores/product-store/productStore';
import { getProductByPath } from '@/utils/product';
import useProductFromUrl from '@/hooks/useGetProductFromUrl/useGetProductFromUrl';
import TimeSelector from '@/components/TimeSelector/TimeSelector';

const MapLayout: React.FC = () => {
  const product = useProductFromUrl('map');

  useEffect(() => {
    if (product) {
      const { mainProduct, subProduct } = product;

      const mainProductKey = getProductByPath(mainProduct)!.key;
      const subProductKey = product.subProduct ? getProductByPath(mainProduct, subProduct)!.key : null;

      setMainProduct(mainProductKey);
      setSubProduct(subProductKey);
    }
  }, [product]);

  return (
    <div className="my-9 shadow-layoutShadow">
      <MapNavbar />
      <div className="w-full">
        <Outlet />
      </div>
      <TimeSelector />
    </div>
  );
};

export default MapLayout;
