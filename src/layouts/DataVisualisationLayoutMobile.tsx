import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { setSelectedArgoParams } from '@/stores/argo-store/argoStore';
import useDateStore, { setDate } from '@/stores/date-store/dateStore';
import useProductStore, {
  setRegionTitle,
  setProductId,
  setRegionScope,
  setRegionCode,
} from '@/stores/product-store/productStore';
import { getProductByPath } from '@/utils/product-utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useProductFromUrl, useProductSearchParam } from '@/hooks';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import { RegionScope } from '@/constants/region';
import ProductFooterMobile from '@/components/ProductFooterMobile/ProductFooterMobile';
import ProductMenuBarMobile from '@/components/ProductMenuBar/ProductNavbarMobile';
import ProductSideBar from '@/components/DataVisualisationSidebar/ProductSidebar';
import { ArgoDepths } from '@/constants/argo';
import { ProductID } from '@/types/product';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { DateFormat } from '@/types/date';
import { useShowProductOverMap } from '@/stores/product-store/hooks/useShowProductOverMap';

const DataVisualisationLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');
  const [showVideo, setShowVideo] = useState(false);
  const productId = useProductStore((state) => state.productParams.productId);
  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const shouldShowProductOverMap = useShowProductOverMap();

  const getArgoData = useCallback(() => {
    const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = (searchParams.get('depth') ?? ArgoDepths['2000M']) as ArgoDepths;
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date, DateFormat.DAY));
  }, [searchParams]);

  const { region: regionCodeFromUrl = 'Au', date } = useProductSearchParam();

  const parseeDateWithFormat = useCallback(
    (dateString: string): dayjs.Dayjs | null => {
      if (!productId) {
        return null;
      }

      try {
        const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);

        const getFallbackYear = () => (useDate ? useDate.year() : dayjs().year());

        if (dateString.length === 2) {
          if (dateFormat === DateFormat.MONTH_ONLY) {
            const year = getFallbackYear();
            return dayjs(`${year}${dateString.padStart(2, '0')}01`, 'YYYYMMDD');
          }
        }

        switch (dateFormat) {
          case DateFormat.MONTH_ONLY:
            if (dateString.length === 2) {
              const year = getFallbackYear();
              return dayjs(`${year}${dateString.padStart(2, '0')}01`, 'YYYYMMDD');
            }
            break;
          case DateFormat.DAY:
            if (dateString.length === 8) {
              return dayjs(dateString, 'YYYYMMDD');
            }
            break;
          case DateFormat.MONTH:
            if (dateString.length === 6) {
              return dayjs(`${dateString}01`, 'YYYYMMDD');
            } else if (dateString.length === 2) {
              const year = getFallbackYear();
              return dayjs(`${year}${dateString.padStart(2, '0')}01`, 'YYYYMMDD');
            }
            break;
        }
      } catch (error) {
        console.warn('Error parsing date with format:', error);
      }
      if (!shouldShowProductOverMap) {
        return dayjs(dateString, 'YYYYMMDD');
      }
      return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productId, regionScope],
  );

  const setProductKey = useCallback(() => {
    if (product) {
      const { mainProduct, subProduct } = product;

      const mainProductKey = getProductByPath(mainProduct)!.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)!.key : null;

      const productId = subProductKey || mainProductKey;

      setProductId(productId as ProductID);
    }
  }, [product]);

  useEffect(() => {
    const region = getRegionByRegionCode(regionCodeFromUrl as string, productId);
    const regionCode = region?.code || 'Au';
    const regionName = region?.title || 'Australia/NZ';
    const regionScope = region?.scope || RegionScope.Au;
    setRegionCode(regionCode);
    setRegionTitle(regionName);
    setRegionScope(regionScope);
  }, [regionCodeFromUrl, productId]);

  useEffect(() => {
    if (!date) return;

    const currentDate = parseeDateWithFormat(date);

    if (!currentDate || !currentDate.isValid()) return;

    const prevDateTime = useDate.valueOf();
    const currentDateTime = currentDate.valueOf();

    if (prevDateTime === currentDateTime) return;
    setDate(currentDate);
  }, [date, useDate, productId, regionScope, parseeDateWithFormat]);

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
