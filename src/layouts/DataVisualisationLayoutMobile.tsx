import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { setSelectedArgoParams } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import useProductStore, { setRegionTitle, setRegionScope } from '@/stores/product-store/productStore';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useProductSearchParam, useSetProductId } from '@/hooks';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import ProductNavbarMobile from '@/components/ProductNavbar/ProductNavbarMobile';
import DataVisualisationSidebar from '@/components/DataVisualisationSidebar/DataVisualisationSidebar';
import { RegionScope } from '@/constants/region';
import ProductFooterMobile from '@/components/ProductFooterMobile/ProductFooterMobile';

const DataVisualisationLayout: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const [showVideo, setShowVideo] = useState(false);
  const productId = useProductStore((state) => state.productParams.productId);

  useSetProductId(location.pathname);

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = searchParams.get('depth') === '1' ? '1' : '0';
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [searchParams]);

  const { region: regionTitleFromUrl = 'Australia/NZ', date } = useProductSearchParam();

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
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo]);

  return (
    <div className="relative mx-auto mb-9 w-full max-w-8xl">
      <div className="p-4">
        <div>
          <DataVisualisationSidebar />
        </div>
        <div>
          <ProductNavbarMobile setShowVideo={setShowVideo} />
          <ErrorBoundary key={productId}>
            <Outlet context={{ showVideo, loading: true }} />
          </ErrorBoundary>
          <ProductFooterMobile />
        </div>
      </div>
    </div>
  );
};

export default DataVisualisationLayout;
