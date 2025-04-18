import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { setSelectedArgoParams } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import useProductStore, {
  setRegionTitle,
  setProductId,
  setRegionScope,
  setRegionCode,
} from '@/stores/product-store/productStore';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useDeviceType, useProductFromUrl, useProductSearchParam, useSetProductId, useUrlType } from '@/hooks';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import ProductFooterMobile from '@/components/ProductFooterMobile/ProductFooterMobile';
import ArrowIcon from '@/assets/icons/Arrow';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import ProductMenuBar from '@/components/ProductMenuBar/ProductMenuBar';
import ProductMenuBarMobile from '@/components/ProductMenuBar/ProductNavbarMobile';
import ProductSideBar from '@/components/DataVisualisationSidebar/ProductSidebar';
import { ArgoDepths } from '@/constants/argo';

const DataVisualisationLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useDeviceType();
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');
  const [showVideo, setShowVideo] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const productId = useProductStore((state) => state.productParams.productId);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = (searchParams.get('depth') ?? ArgoDepths['2000M']) as ArgoDepths;
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [searchParams]);

  const { region: regionCodeFromUrl = 'Au', date } = useProductSearchParam();

  useEffect(() => {
    const region = getRegionByRegionCode(regionCodeFromUrl as string);
    const regionCode = region?.code || 'Au';
    const regionName = region?.title || 'Australia/NZ';
    const regionScope = region?.scope || RegionScope.Au;
    setRegionCode(regionCode);
    setRegionTitle(regionName);
    setRegionScope(regionScope);
  }, [regionCodeFromUrl]);

  useEffect(() => {
    if (!date) return;

    const currentDate = dayjs(date);
    const isSameDay = useDate.isSame(currentDate, 'day');
    const isSameTime = useDate.hour() === currentDate.hour() && useDate.minute() === currentDate.minute();

    if (isSameDay && isSameTime) return;
    setDate(currentDate);
  }, [date, useDate]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo]);

  if (!productId) {
    return <Loading />;
  }

  return (
    <div className="relative mx-auto mb-9 w-full max-w-8xl">
      {isMobile ? (
        <div className="p-4">
          <div className="text-imos-text-grey">
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
      ) : (
        <div className="flex p-4">
          <button
            onClick={toggleSidebar}
            className="-left-6 mr-1 flex h-24 items-center justify-center rounded bg-imos-sea-blue p-2 text-white"
            aria-label="Toggle sidebar"
          >
            <ArrowIcon
              className={`h-5 w-5 transition-transform duration-300 ${isSidebarVisible ? 'rotate-90' : 'h-28 rotate-[270deg]'}`}
              stroke={'white'}
            />
          </button>
          <div className={`transition-all duration-300 ${isSidebarVisible ? 'w-1/3' : 'w-0 overflow-hidden'}`}>
            <ProductSideBar />
          </div>
          <div
            className={`transition-all duration-300 ${isSidebarVisible ? 'ml-4' : 'ml-0'} flex min-h-[800px] w-full min-w-[800px] flex-col`}
          >
            <ProductMenuBar setShowVideo={setShowVideo} />
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
