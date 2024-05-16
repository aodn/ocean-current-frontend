import React, { useCallback, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { setArgoData, setDate } from '@/stores/argo-store/argoStore';
import { setMainProduct, setSubProduct } from '@/stores/product-store/productStore';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { getProductByPath } from '@/utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import useProductFromUrl from '@/hooks/useGetProductFromUrl/useGetProductFromUrl';

const MapLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();
  const product = useProductFromUrl('product');

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = searchParams.get('depth') === '1' ? '1' : '0';

    setArgoData({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [searchParams]);

  const setProductKey = useCallback(() => {
    if (product) {
      const mainProductKey = getProductByPath(product.mainProduct)!.key;
      const subProductKey = product.subProduct ? getProductByPath(product.mainProduct, product.subProduct)!.key : null;
      setMainProduct(mainProductKey);
      setSubProduct(subProductKey);
    }
  }, [product]);

  useEffect(() => {
    setProductKey();
  }, [setProductKey, product]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo]);

  return (
    <div className="my-9 shadow-layoutShadow">
      <MapNavbar />
      <div className="flex p-4">
        <div className="mx-2 w-1/3">
          <MapSidebar />
        </div>
        <div className="w-2/3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
