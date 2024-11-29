import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { setSelectedArgoParams } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import { setRegionTitle, setProductId, setRegionScope } from '@/stores/product-store/productStore';
import { getProductByPath } from '@/utils/product-utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useIsMobile, useProductFromUrl, useProductSearchParam } from '@/hooks';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import DataVisualisationNavbar from '@/components/DataVisualisationNavbar/DataVisualisationNavbar';
import DataVisualisationSidebar from '@/components/DataVisualisationSidebar/DataVisualisationSidebar';
import ProductNavbarMobile from '@/components/ProductNavbar/ProductNavbarMobile';
import ProductFooterMobile from '@/components/ProductFooterMobile/ProductFooterMobile';
import ArrowIcon from '@/assets/icons/Arrow';
import { RegionScope } from '@/constants/region';

const DataVisualisationLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');
  const [showVideo, setShowVideo] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = searchParams.get('depth') === '1' ? '1' : '0';
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [searchParams]);

  const { region: regionTitleFromUrl = 'Australia/NZ', date } = useProductSearchParam();

  const setProductKey = useCallback(() => {
    if (product) {
      const { mainProduct, subProduct } = product;
      const mainProductKey = getProductByPath(mainProduct)?.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)?.key : null;

      const productId = subProductKey || mainProductKey;
      setProductId(productId);
    }
  }, [product]);

  useEffect(() => {
    const region = getRegionByRegionTitle(regionTitleFromUrl as string);
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
      {isMobile ? (
        <div className="p-4">
          <div className="text-imos-text-grey">
            <DataVisualisationSidebar />
          </div>
          <div>
            <ProductNavbarMobile setShowVideo={setShowVideo} />
            <ErrorBoundary key={product?.mainProduct}>
              <Outlet context={{ showVideo, loading: true }} />
            </ErrorBoundary>
            <ProductFooterMobile />
          </div>
        </div>
      ) : (
        <div className="flex p-4">
          <button
            onClick={toggleSidebar}
            className="absolute -left-6 mb-4 flex h-24 items-center justify-center rounded bg-imos-sea-blue p-2 text-white"
          >
            <ArrowIcon
              className={`h-5 w-5 transition-transform duration-300 ${isSidebarVisible ? 'rotate-90' : 'h-28 rotate-[270deg]'}`}
              stroke={'white'}
            />
          </button>
          <div className={`transition-all duration-300 ${isSidebarVisible ? 'w-1/3' : 'w-0 overflow-hidden'}`}>
            <DataVisualisationSidebar />
          </div>
          <div
            className={`transition-all duration-300 ${isSidebarVisible ? 'ml-4' : 'ml-0'} flex min-h-[800px] w-full min-w-[800px] flex-col`}
          >
            <DataVisualisationNavbar setShowVideo={setShowVideo} />
            <ErrorBoundary key={product?.mainProduct}>
              <Outlet context={{ showVideo, loading: true }} />
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataVisualisationLayout;
