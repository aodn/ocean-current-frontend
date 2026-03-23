import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useDateList, useQueryParams, useArgoProductValidQueryParams } from '@/hooks';
import { Dropdown, Button, ShareButton } from '@/components/Shared';
import { ProductMenubarText } from '@/constants/textConstant';
import VideoCreation from '@/components/VideoCreation';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import useCurrentMetersStore, {
  initialState,
  resetCurrentMetersStore,
  setCurrentMetersDate,
} from '@/stores/current-meters-store/currentMeters';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import useProductDateFormat from '@/stores/product-store/hooks/useProductDateFormat';
import { currentMeterSYearOptionsData } from '@/data/current-meter/sidebarOptions';
import { CurrentMetersSubProductsKey } from '@/constants/currentMeters';
import useArgoStore from '@/stores/argo-store/argoStore';
import { useRegionLatestDates } from '@/services/hooks';
import { useShowProductOverMap } from '@/stores/product-store/hooks/useShowProductOverMap';
import { DEFAULT_SUB_PRODUCT_ROUTES } from '@/configs/products/default-routes';
import { useTidalCurrentPoint } from '@/pages/DataView/product-content/hooks/useTidalCurrentPoint';
import { toYYYYMM } from '@/utils/date-utils/date';
import DatePagination from '../DatePagination';
import { VideoIcon, ResetIcon, MapIcon } from '../Shared/Icons/ui';
import { ProductMenuBarProps } from './types/ProductMenuBar.types';

const ProductMenuBar: React.FC<ProductMenuBarProps> = ({
  showVideo,
  setShowVideo,
  setShowMap,
  showMap = false,
  mode,
}) => {
  const { updateQueryParamsAndNavigate, updateQueryParams } = useQueryParams();
  const argoProfileCycles = useArgoStore((state) => state.argoProfileCycles);

  const { date: currentMetersDate, property, depth, region, deploymentPlot } = useCurrentMetersStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isArgo,
    isCurrentMeters,
    isClimatology,
    isSurfaceWavesBuoyTimeseries,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
  } = useProductCheck();
  const { isArgoValid } = useArgoProductValidQueryParams();
  const productId = useProductStore((state) => state.productParams.productId);
  const { data: latestArgoLocationsData, isLoading: isLatestArgoLocationsDataLoading } = useRegionLatestDates(
    productId,
    isArgo && !isArgoValid,
  );
  const shouldRenderProductContent = useShowProductOverMap();
  const defaultCurrentMetersSubProduct = DEFAULT_SUB_PRODUCT_ROUTES['currentMeters'];

  // Products where video/GIF creation is not available
  const shouldDisableOption =
    isArgo ||
    isCurrentMeters ||
    isSurfaceWavesBuoyTimeseries ||
    isTidalCurrents ||
    (isSealCtd && productId !== 'sealCtd-sealTracks') ||
    isSealCtdTags ||
    isClimatology ||
    productId === 'monthlyMeans-climatology' ||
    productId === 'fourHourSst-sstAge' ||
    productId === 'sixDaySst-timeseries' ||
    showMap ||
    !shouldRenderProductContent;

  const dateFormat = useProductDateFormat();

  const { isLoading: isProductDateListLoading, dateList } = useDateList({ productId, mode });
  const { isTidalCurrentsPointSelected } = useTidalCurrentPoint(productId);

  const handleToggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const handleToggleMap = () => {
    setShowMap(!showMap);
    if (showVideo) {
      setShowVideo(false);
    }
  };

  const handleReset = () => {
    if (isCurrentMeters) {
      resetCurrentMetersStore();
      return updateQueryParamsAndNavigate(`current-meters/${defaultCurrentMetersSubProduct}`, initialState);
    }

    const latestDate = dateList?.[dateList.length - 1]?.date;

    if (isClimatology) {
      const currentMonth = new Date().getMonth() + 1;
      const climatologyDate =
        dateList.find((dateItem) => {
          const dateMonth = new Date(dateItem.date).getMonth() + 1;
          return dateMonth === currentMonth;
        })?.date || latestDate;

      if (climatologyDate && climatologyDate !== searchParams.get('date')) setIsProductImageLoading(true);
      return updateQueryParams({ date: climatologyDate });
    }

    if (isArgo) {
      if (isArgoValid) {
        const latestArgoProfileCycle = argoProfileCycles.find((cycle) => cycle.date === latestDate)?.cycle;
        if (latestArgoProfileCycle !== undefined) {
          if (latestDate !== searchParams.get('date')) setIsProductImageLoading(true);
          updateQueryParams({ cycle: latestArgoProfileCycle, date: latestDate });
        }
        return;
      }

      const latestArgoDate = latestArgoLocationsData?.regionLatestDates[0].latestDate;
      if (latestArgoDate && latestArgoDate !== searchParams.get('date')) setIsProductImageLoading(true);
      return updateQueryParams({ date: latestArgoDate });
    }

    if (isTidalCurrentsPointSelected) {
      return updateQueryParams({ date: dateList.at(-1)?.date ?? toYYYYMM(new Date()) });
    }
    if (latestDate && latestDate !== searchParams.get('date')) {
      setIsProductImageLoading(true);
    }
    updateQueryParams({ date: latestDate });
  };

  const handleCurrentMetersDateChange = (id: string) => {
    setCurrentMetersDate(id as string);
    setSearchParams({ property, depth, region, deploymentPlot, date: id });
  };

  const resetBtnDisabled = useMemo(() => {
    if (isLatestArgoLocationsDataLoading && isProductDateListLoading) return true;
    if (isArgo && !isArgoValid) {
      return !latestArgoLocationsData?.regionLatestDates[0].latestDate;
    }
    return dateList.length === 0;
  }, [
    dateList.length,
    isArgo,
    isArgoValid,
    isLatestArgoLocationsDataLoading,
    isProductDateListLoading,
    latestArgoLocationsData?.regionLatestDates,
  ]);

  return (
    <div className="mb-2 w-full bg-white p-2 md:rounded-md md:bg-transparent md:p-0">
      <div className="my-2 flex h-11 items-center justify-center md:hidden">
        <Button
          onClick={handleToggleMap}
          borderRadius="extraSmall"
          className={`flex-center h-full w-full border-imos-calypso-blue/50 !px-2 ${showMap ? '' : 'bg-white'}`}
          aria-label="Toggle region selection"
        >
          <MapIcon color="imos-deep-blue" size="sm" className="flex-shrink-0" />
          <p className={`ml-2 text-base font-medium ${showMap ? 'text-imos-blue' : 'text-imos-dark-grey'}`}>
            {ProductMenubarText.SELECT_REGION}
          </p>
        </Button>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 font-sans font-medium text-imos-dark-grey md:mb-2 md:gap-3">
        <div className="flex h-11 grow basis-[calc(100%-4rem)] items-center justify-between rounded-md border border-imos-calypso-blue/50 bg-white md:grow md:basis-auto md:border-none">
          {isCurrentMeters ? (
            <Dropdown
              toggleBorder={false}
              menuShadow
              elements={
                productId === CurrentMetersSubProductsKey.MOORED_INSTRUMENT_ARRAY && !deploymentPlot
                  ? currentMeterSYearOptionsData
                  : [currentMeterSYearOptionsData[0]]
              }
              selectedId={currentMetersDate as string}
              onChange={(elem) => handleCurrentMetersDateChange(elem.id)}
            />
          ) : (
            <DatePagination productId={productId} dateFormat={dateFormat} mode={mode} showVideo={showVideo} />
          )}
        </div>

        <Button
          data-testid="date-reset-button"
          onClick={handleReset}
          className="flex-center h-11 w-12 shrink-0 rounded-md border-imos-calypso-blue/50 bg-white !p-3 md:border-none md:!p-4"
          aria-label="Reset to latest date"
          disabled={resetBtnDisabled || showVideo}
          borderRadius="extraSmall"
        >
          <ResetIcon color="imos-deep-blue" size="lg" />
        </Button>
        <div className="order-1 box-border h-11 flex-1 rounded-md border-none md:order-none md:flex-initial md:grow">
          <Button
            onClick={handleToggleVideo}
            disabled={shouldDisableOption}
            borderRadius="extraSmall"
            className={`flex-center h-full w-full border-none !px-2 md:p-3 md:px-5 ${showVideo ? '' : 'bg-white'}`}
            aria-label="Toggle video"
          >
            <VideoIcon color="imos-deep-blue" size="xl" className="flex-shrink-0" />
            <p
              className={`ml-2 text-sm md:ml-3 md:w-20 md:text-base ${showVideo ? 'text-imos-blue' : 'text-imos-deep-blue md:text-imos-dark-grey'}`}
            >
              <span className="md:hidden">{ProductMenubarText.VIDEO}</span>
              <span className="hidden md:inline">
                {showVideo ? ProductMenubarText.EXIT_VIDEO : ProductMenubarText.VIDEO}
              </span>
            </p>
          </Button>
        </div>

        <div className="order-2 box-border h-11 flex-1 rounded-md border-none px-1 md:order-none md:flex-initial md:grow">
          <VideoCreation disabled={shouldDisableOption} />
        </div>

        <div className="order-3 box-border h-11 flex-1 rounded-md border-none md:order-none md:flex-initial md:grow">
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default ProductMenuBar;
