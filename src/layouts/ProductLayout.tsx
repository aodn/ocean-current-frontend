import React, { useCallback, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { setArgoData } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import { setMainProduct, setRegionTitle, setSubProduct, setProductId } from '@/stores/product-store/productStore';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { getProductByPath } from '@/utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useProductFromUrl, useProductSearchParam } from '@/hooks';
import { getRegionByRegionTitle } from '@/utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import NewMapNavbar from '@/components/ProductNavbar/ProductNavbar';

const ProductLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = searchParams.get('depth') === '1' ? '1' : '0';
    setArgoData({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [searchParams]);

  const { region: regionTitle = 'Australia/NZ', date } = useProductSearchParam();

  const setProductKey = useCallback(() => {
    if (product) {
      const { mainProduct, subProduct } = product;

      const mainProductKey = getProductByPath(mainProduct)!.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)!.key : null;

      const productId = subProductKey || mainProductKey;

      setProductId(productId);
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
    if (!date || useDate.isSame(dayjs(date), 'day')) return;
    setDate(dayjs(date));
  }, [date, useDate]);

  useEffect(() => {
    setProductKey();
  }, [setProductKey, product]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo]);

  return (
    <div className="mx-auto my-9 w-full max-w-8xl">
      <div className="flex p-4">
        <div className="w-1/3">
          <MapSidebar />
        </div>
        <div className="ml-4 w-full">
          <NewMapNavbar />
          <>
            <ErrorBoundary key={product?.mainProduct}>
              <Outlet />
            </ErrorBoundary>
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
