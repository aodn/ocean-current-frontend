import React, { useCallback, useEffect, useState, useRef } from 'react';
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
import { useProductFromUrl, useProductSearchParam, useSetProductId, useUrlType, useIsTabletOrDesktop } from '@/hooks';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import { ArrowIcon } from '@/components/Shared/Icons';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import ProductMenuBar from '@/components/ProductMenuBar/ProductMenuBar';
import ProductSideBar from '@/components/DataVisualisationSidebar/ProductSidebar';
import ProductDropdown from '@/components/DataVisualisationSidebar/components/ProductDropdown';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { ArgoDepths } from '@/constants/argo';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { DateFormat } from '@/types/date';
import { useShowProductOverMap } from '@/stores/product-store/hooks/useShowProductOverMap';
import { ProductID } from '@/types/product';
import useMapStore from '@/stores/map-store/mapStore';
import { useUrlParams } from '@/pages/DataView/product-content/hooks/useUrlParams';

type ParseeDateWithFormat = {
  dateString: string;
  date: dayjs.Dayjs;
  shouldShowProductOverMap: boolean;
  productId: ProductID;
  regionScope: RegionScope;
};

const DataVisualisationLayout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo, isSurfaceWavesBuoyTimeseries } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const product = useProductFromUrl('product');
  const { mainProduct } = useProductConvert();
  const [showVideo, setShowVideo] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const productId = useProductStore((state) => state.productParams.productId);
  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const shouldShowProductOverMap = useShowProductOverMap();
  const interactiveLayerClickTimestamp = useMapStore((state) => state.interactiveLayerClickTimestamp);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  const { hasSelectedParams } = useUrlParams();
  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  const dateFromUrl = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const isDesktopOrTablet = useIsTabletOrDesktop();

  const getArgoData = useCallback(() => {
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = (searchParams.get('depth') ?? ArgoDepths['2000M']) as ArgoDepths;
    setSelectedArgoParams({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(dateFromUrl, DateFormat.DAY));
  }, [searchParams, dateFromUrl]);

  const { region: regionCodeFromUrl = 'Au', date } = useProductSearchParam();
  const previousDateRef = useRef<string | null>(null);
  const previousClickTimestampRef = useRef<number>(0);
  const previousProductIdRef = useRef<string | null>(null);

  const parseeDateWithFormat = useCallback(
    ({
      dateString,
      date,
      shouldShowProductOverMap,
      productId,
      regionScope,
    }: ParseeDateWithFormat): dayjs.Dayjs | null => {
      if (!productId) {
        return null;
      }

      try {
        const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope, hasSelectedParams.point);

        const getFallbackYear = () => (date ? date.year() : dayjs().year());
        const getFallbackMonth = () => (date ? date.month() + 1 : dayjs().month() + 1);
        const getFallbackDay = () => (date ? date.date() : dayjs().date());

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
              const hour = date ? date.hour().toString().padStart(2, '0') : '00';
              const minute = dateString.padStart(2, '0');
              return dayjs(`${year}${month}${day}${hour}${minute}`, 'YYYYMMDDHHmm');
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
    [hasSelectedParams.point],
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
    //when date change or product id change, reset date, as date format is based on product.
    if (previousDateRef.current === date && previousProductIdRef.current === productId) return;

    const currentDate = parseeDateWithFormat({
      dateString: date,
      date: useDate,
      shouldShowProductOverMap,
      productId,
      regionScope,
    });
    if (!currentDate || !currentDate.isValid()) return;

    previousDateRef.current = date;
    previousProductIdRef.current = productId;
    setDate(currentDate);
  }, [date, productId, regionScope, shouldShowProductOverMap, parseeDateWithFormat, useDate]);

  useEffect(() => {
    if (isArgo) getArgoData();
  }, [getArgoData, isArgo, dateFromUrl]);

  // Reset showMap when switching from mobile to desktop
  useEffect(() => {
    if (isDesktopOrTablet && showMap) {
      setShowMap(false);
    }
  }, [isDesktopOrTablet, showMap]);

  // Close map on mobile when interactive layer is clicked (after animations complete)
  useEffect(() => {
    if (!isDesktopOrTablet && showMap && interactiveLayerClickTimestamp !== previousClickTimestampRef.current) {
      previousClickTimestampRef.current = interactiveLayerClickTimestamp;
      setShowMap(false);
    }
  }, [interactiveLayerClickTimestamp, isDesktopOrTablet, showMap]);

  if (!productId) {
    return <Loading />;
  }

  return (
    <div className="relative mx-auto mb-4 mt-4 w-full max-w-8xl px-4 md:mb-9">
      <div className="flex flex-col-reverse md:flex-row">
        <button
          onClick={toggleSidebar}
          className="-left-6 mr-1 hidden h-24 items-center justify-center rounded bg-imos-sea-blue p-2 text-white md:flex"
          aria-label="Toggle sidebar"
        >
          <ArrowIcon
            className={`h-5 w-5 transition-transform duration-300 ${isSidebarVisible ? 'rotate-90' : 'h-28 rotate-[270deg]'}`}
            color="imos-white"
          />
        </button>
        <div className={`transition-all duration-300 ${isSidebarVisible ? 'md:w-1/3' : 'w-0 overflow-hidden'}`}>
          <ProductSideBar />
        </div>
        <div
          className={`transition-all duration-300 ${isSidebarVisible ? 'md:ml-4' : 'ml-0'} flex w-full flex-col md:min-h-[800px]`}
        >
          <div className="md:hidden">{mainProduct && <ProductDropdown mainProductKey={mainProduct.key} />}</div>
          <ProductMenuBar
            showVideo={showVideo}
            setShowVideo={setShowVideo}
            showMap={showMap}
            setShowMap={setShowMap}
            isFreeMode={!shouldShowProductOverMap}
          />
          <ErrorBoundary key={product?.mainProduct}>
            <Outlet context={{ showVideo, showMap, loading: true }} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default DataVisualisationLayout;
