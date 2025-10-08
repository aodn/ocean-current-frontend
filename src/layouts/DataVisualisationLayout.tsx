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
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { DateFormat } from '@/types/date';
import { useShowProductOverMap } from '@/stores/product-store/hooks/useShowProductOverMap';

const DataVisualisationLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useDeviceType();
  const { isArgo, isSurfaceWavesBuoyTimeseries } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');
  const [showVideo, setShowVideo] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const productId = useProductStore((state) => state.productParams.productId);
  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const shouldShowProductOverMap = useShowProductOverMap();
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  const dateFromUrl = searchParams.get('date') || dayjs().format('YYYYMMDD');

  const getArgoData = useCallback(() => {
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = (searchParams.get('depth') ?? ArgoDepths['2000M']) as ArgoDepths;
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(dateFromUrl));
  }, [searchParams, dateFromUrl]);

  const { region: regionCodeFromUrl = 'Au', date } = useProductSearchParam();

  const parseeDateWithFormat = useCallback(
    (dateString: string): dayjs.Dayjs | null => {
      if (!productId || !regionScope) {
        return null;
      }

      try {
        const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);

        const getFallbackYear = () => (useDate ? useDate.year() : dayjs().year());
        const getFallbackMonth = () => (useDate ? useDate.month() + 1 : dayjs().month() + 1);
        const getFallbackDay = () => (useDate ? useDate.date() : dayjs().date());

        const isFormatCompatible = (format: DateFormat, length: number): boolean => {
          switch (format) {
            case DateFormat.MONTH_ONLY:
              return length === 2;
            case DateFormat.YEAR_ONLY:
              return length === 4 || length === 2;
            case DateFormat.MONTH:
              return length === 6 || length === 2;
            case DateFormat.DAY:
              return length === 8 || length === 4 || length === 6;
            case DateFormat.HOUR:
              return length === 10 || length === 2;
            case DateFormat.MINUTE:
              return length === 12 || length === 2;
            default:
              return false;
          }
        };

        if (!isFormatCompatible(dateFormat, dateString.length)) {
          return null;
        }

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
          case DateFormat.YEAR_ONLY:
            if (dateString.length === 4) {
              return dayjs(`${dateString}0101`, 'YYYYMMDD');
            } else if (dateString.length === 2) {
              const fullYear = `20${dateString}`;
              return dayjs(`${fullYear}0101`, 'YYYYMMDD');
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
          case DateFormat.DAY:
            if (dateString.length === 8) {
              return dayjs(dateString, 'YYYYMMDD');
            } else if (dateString.length === 2) {
              // When we have a 2-digit string but DAY format is expected,
              // this is likely a format mismatch. Don't try to guess - let it fall through
              // to the fallback, so the correct format can handle it on the next render
            } else if (dateString.length === 4) {
              const year = getFallbackYear();
              return dayjs(`${year}${dateString}`, 'YYYYMMDD');
            } else if (dateString.length === 6) {
              const fullYear = `20${dateString.substring(0, 2)}`;
              const monthDay = dateString.substring(2);
              return dayjs(`${fullYear}${monthDay}`, 'YYYYMMDD');
            }
            break;
          case DateFormat.HOUR:
            if (dateString.length === 10) {
              return dayjs(dateString, 'YYYYMMDDHH');
            } else if (dateString.length === 2) {
              const year = getFallbackYear();
              const month = getFallbackMonth().toString().padStart(2, '0');
              const day = getFallbackDay().toString().padStart(2, '0');
              const hour = dateString.padStart(2, '0');
              return dayjs(`${year}${month}${day}${hour}`, 'YYYYMMDDHH');
            }
            break;
          case DateFormat.MINUTE:
            if (dateString.length === 12) {
              return dayjs(dateString, 'YYYYMMDDHHmm');
            } else if (dateString.length === 2) {
              const year = getFallbackYear();
              const month = getFallbackMonth().toString().padStart(2, '0');
              const day = getFallbackDay().toString().padStart(2, '0');
              const hour = useDate ? useDate.hour().toString().padStart(2, '0') : '00';
              const minute = dateString.padStart(2, '0');
              return dayjs(`${year}${month}${day}${hour}${minute}`, 'YYYYMMDDHHmm');
            }
            break;
        }
      } catch (error) {
        console.warn('Error parsing date with format:', error);
      }

      return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productId, regionScope], // Intentionally excluding useDate to prevent infinite loop
  );

  useEffect(() => {
    // EAC Mooring Array has data from only one region - Brisbane
    if (productId === 'EACMooringArray' && regionCodeFromUrl === 'Brisbane') {
      setRegionCode('Brisbane');
      setRegionTitle('Brisbane');
      setRegionScope(RegionScope.Local);
      return;
    }

    const region = getRegionByRegionCode(regionCodeFromUrl as string, productId);
    let regionCode: string = region?.code || '';
    if (isSurfaceWavesBuoyTimeseries && regionCodeFromUrl) {
      regionCode = regionCodeFromUrl as string;
    }
    const regionName = region?.title;
    const regionScope = region?.scope || RegionScope.Au;
    if (regionCode) setRegionCode(regionCode);
    if (regionName) setRegionTitle(regionName);
    setRegionScope(regionScope);
  }, [regionCodeFromUrl, isSurfaceWavesBuoyTimeseries, productId]);

  useEffect(() => {
    if (!date || !productId || !regionScope) return;

    const currentDate = parseeDateWithFormat(date);
    if (!currentDate) return;

    const isSameDay = useDate.isSame(currentDate, 'day');
    const isSameTime = useDate.hour() === currentDate.hour() && useDate.minute() === currentDate.minute();
    if (isSameDay && isSameTime) return;
    setDate(currentDate);
  }, [date, useDate, productId, regionScope, parseeDateWithFormat]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo, dateFromUrl]);

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
            <ProductMenuBar setShowVideo={setShowVideo} isFreeMode={!shouldShowProductOverMap} />
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
