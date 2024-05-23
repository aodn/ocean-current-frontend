import React, { useCallback, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { setArgoData, setDate } from '@/stores/argo-store/argoStore';
import {
  setMainProduct,
  setRegionTitle,
  setSubProduct,
  setDate as setProductDate,
} from '@/stores/product-store/productStore';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { getProductByPath } from '@/utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useProductFromUrl, useProductSearchParam } from '@/hooks';
import TimeSelector from '@/components/TimeSelector/TimeSelector';
import { getRegionByRegionTitle } from '@/utils/region';

const ProductLayout: React.FC = () => {
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

  const { region: regionTitle = 'Australia/NZ', date: productDate } = useProductSearchParam();

  const setProductKey = useCallback(() => {
    if (product) {
      const { mainProduct, subProduct } = product;

      const mainProductKey = getProductByPath(mainProduct)!.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)!.key : null;

      setMainProduct(mainProductKey);
      setSubProduct(subProductKey);
    }
  }, [product]);

  useEffect(() => {
    const region = getRegionByRegionTitle(regionTitle as string);
    const regionName = region?.title || 'Australia/NZ';
    setRegionTitle(regionName);
  }, [regionTitle]);

  useEffect(() => {
    if (productDate) setProductDate(dayjs(productDate));
  }, [productDate]);

  useEffect(() => {
    setProductKey();
  }, [setProductKey, product]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo]);

  return (
    <div className="my-9 shadow-layout-shadow">
      <MapNavbar />
      <div className="flex p-4">
        <div className="mx-2 w-1/3">
          <MapSidebar />
        </div>
        <div className="w-2/3">
          <Outlet />
        </div>
      </div>
      <TimeSelector />
    </div>
  );
};

export default ProductLayout;
