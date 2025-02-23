import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { setSelectedArgoParams } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import { setRegionTitle, setProductId, setRegionScope } from '@/stores/product-store/productStore';
import { getProductByPath } from '@/utils/product-utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useProductFromUrl, useProductSearchParam } from '@/hooks';
import { getRegionByRegionTitleOrCode } from '@/utils/region-utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import { RegionScope } from '@/constants/region';
import ProductFooterMobile from '@/components/ProductFooterMobile/ProductFooterMobile';
import ProductMenuBarMobile from '@/components/ProductMenuBar/ProductNavbarMobile';
import ProductSideBar from '@/components/DataVisualisationSidebar/ProductSidebar';
import { ArgoDepths } from '@/constants/argo';

const DataVisualisationLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');
  const [showVideo, setShowVideo] = useState(false);

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = (searchParams.get('depth') ?? ArgoDepths['2000M']) as ArgoDepths;
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [searchParams]);

  const { region: regionTitleFromUrl = 'Australia/NZ', date } = useProductSearchParam();

  const setProductKey = useCallback(() => {
    if (product) {
      const { mainProduct, subProduct } = product;

      const mainProductKey = getProductByPath(mainProduct)!.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)!.key : null;

      const productId = subProductKey || mainProductKey;

      setProductId(productId);
    }
  }, [product]);

  useEffect(() => {
    const region = getRegionByRegionTitleOrCode(regionTitleFromUrl as string);
    const regionName = region?.title || 'Australia/NZ';
    const regionScope = region?.scope || RegionScope.Au;
    setRegionTitle(regionName);
    setRegionScope(regionScope);
  }, [regionTitleFromUrl]);

  useEffect(() => {
    if (!date) return;

    const currentDate = dayjs(date);
    const isSameDay = useDate.isSame(currentDate, 'day');
    const isSameTime = useDate.hour() === currentDate.hour() && useDate.minute() === currentDate.minute();

    if (isSameDay && isSameTime) return;
    setDate(currentDate);
  }, [date, useDate]);

  useEffect(() => {
    setProductKey();
  }, [setProductKey, product]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo]);

  return (
    <div className="relative mx-auto mb-9 w-full max-w-8xl">
      <div className="p-4">
        <div>
          <ProductSideBar />
        </div>
        <div>
          <ProductMenuBarMobile setShowVideo={setShowVideo} />
          <ErrorBoundary key={product?.mainProduct}>
            <Outlet context={{ showVideo, loading: true }} />
          </ErrorBoundary>
          <ProductFooterMobile />
        </div>
      </div>
    </div>
  );
};

export default DataVisualisationLayout;
