import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDateList, useDateRange, useQueryParams, useArgoProductValidQueryParams } from '@/hooks';
import { Dropdown, Button } from '@/components/Shared';
import VideoIcon from '@/assets/icons/video-icon.svg';
import { ProductMenubarText } from '@/constants/textConstant';
import ShareIcon from '@/assets/icons/share-icon.svg';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import VideoCreation from '@/components/VideoCreation';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import useCurrentMetersStore, {
  initialState,
  resetCurrentMetersStore,
  setCurrentMetersDate,
} from '@/stores/current-meters-store/currentMeters';
import useProductStore from '@/stores/product-store/productStore';
import useProductDateFormat from '@/stores/product-store/hooks/useProductDateFormat';
import { currentMeterSYearOptionsData } from '@/data/current-meter/sidebarOptions';
import { CurrentMetersSubproductsKey, mooredInstrumentArrayPath } from '@/constants/currentMeters';
import useArgoStore from '@/stores/argo-store/argoStore';
import { useRegionLatestDates } from '@/services/hooks';
import DatePagination from '../DatePagination';
import { ProductMenuBarProps } from './types/ProductMenuBar.types';

const ProductMenuBar: React.FC<ProductMenuBarProps> = ({ setShowVideo, isMapView = false, isFreeMode = false }) => {
  const { disableVideoCreation } = useDateRange();

  const { updateQueryParamsAndNavigate, updateQueryParams } = useQueryParams();
  const argoProfileCycles = useArgoStore((state) => state.argoProfileCycles);

  const [copyButtonText, setCopyButtonText] = useState<string>(ProductMenubarText.SHARE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setLocalShowVideo] = useState(false);
  const { date: currentMetersDate, property, depth, region, deploymentPlot } = useCurrentMetersStore();
  const [_, setSearchParams] = useSearchParams();
  const {
    isArgo,
    isCurrentMeters,
    isSurfaceWavesBuoyTimeseries,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isClimatology,
  } = useProductCheck();
  const { isArgoValid } = useArgoProductValidQueryParams();
  const productId = useProductStore((state) => state.productParams.productId);
  const { data: latestArgoLocationsData, isLoading: isLatestArgoLocationsDataLoading } = useRegionLatestDates(
    productId,
    isArgo && !isArgoValid,
  );
  const shouldDisableOption =
    disableVideoCreation() ||
    isArgo ||
    isMapView ||
    isCurrentMeters ||
    isSurfaceWavesBuoyTimeseries ||
    isTidalCurrents ||
    (isSealCtd && productId !== 'sealCtd-sealTracks') ||
    isSealCtdTags;

  const dateFormat = useProductDateFormat();

  const { isLoading: isProductDateListLoading, dateList } = useDateList({ productId, isFreeMode });

  const handleCopyLink = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyButtonText(`${ProductMenubarText.COPIED}!`);

    timeoutRef.current = setTimeout(() => {
      setCopyButtonText(ProductMenubarText.SHARE);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggle = (state: boolean) => {
    setLocalShowVideo(state);
    setShowVideo(state);
  };

  const handleReset = () => {
    if (isCurrentMeters) {
      resetCurrentMetersStore();
      return updateQueryParamsAndNavigate(`current-meters/${mooredInstrumentArrayPath}`, initialState);
    }

    const latestDate = dateList?.[dateList.length - 1]?.date;

    if (isClimatology) {
      const currentMonth = new Date().getMonth() + 1;
      const climatologyDate =
        dateList.find((dateItem) => {
          const dateMonth = new Date(dateItem.date).getMonth() + 1;
          return dateMonth === currentMonth;
        })?.date || latestDate;

      return updateQueryParams({ date: climatologyDate });
    }

    if (isArgo) {
      if (isArgoValid) {
        const latestArgoProfileCycle = argoProfileCycles.find((cycle) => cycle.date === latestDate)?.cycle;
        if (latestArgoProfileCycle !== undefined)
          updateQueryParams({ cycle: latestArgoProfileCycle, date: latestDate });
        return;
      }

      return updateQueryParams({ date: latestArgoLocationsData?.regionLatestDates[0].latestDate });
    }

    updateQueryParams({ date: latestDate });
  };

  const handleCurrentMetersDateChange = (id: string) => {
    setCurrentMetersDate(id as string);
    if (isMapView) {
      setSearchParams({ date: id });
    } else {
      setSearchParams({ property, depth, region, deploymentPlot, date: id });
    }
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
    <div className="mb-2 rounded-md">
      <div className="mb-2 flex items-center justify-between gap-3 font-sans font-medium text-imos-dark-grey">
        <div className="flex h-11 grow items-center justify-between rounded-md bg-white">
          {isCurrentMeters ? (
            <Dropdown
              elements={
                productId === CurrentMetersSubproductsKey.MOORED_INSTRUMENT_ARRAY && !deploymentPlot
                  ? currentMeterSYearOptionsData
                  : [currentMeterSYearOptionsData[0]]
              }
              selectedId={currentMetersDate as string}
              onChange={(elem) => handleCurrentMetersDateChange(elem.id)}
            />
          ) : (
            <DatePagination productId={productId} dateFormat={dateFormat} isFreeMode={isFreeMode} />
          )}
        </div>

        <Button
          onClick={handleReset}
          aria-hidden
          className="flex-center h-11 w-12 rounded-md border-none bg-white p-2"
          aria-label="Reset to latest date"
          disabled={resetBtnDisabled}
          borderRadius="extraSmall"
        >
          <img src={ResetIcon} alt="reset icon" srcSet="" />
        </Button>
        <Button
          onClick={() => handleToggle(!showVideo)}
          disabled={shouldDisableOption}
          borderRadius="extraSmall"
          className={`flex-center h-11 w-1/5 border-none p-3 md:px-5 ${showVideo ? '' : 'bg-white'}`}
          aria-label="Toggle video"
        >
          <img src={VideoIcon} alt="video icon" />
          <p className={`ml-3 w-20 ${showVideo ? 'text-imos-blue' : 'text-imos-dark-grey'}`}>
            {showVideo ? ProductMenubarText.EXIT_VIDEO : ProductMenubarText.VIDEO}
          </p>
        </Button>

        <div className="w-1/6">
          <Button
            onClick={handleCopyLink}
            aria-hidden
            borderRadius="extraSmall"
            className="flex h-11 w-full flex-row items-center justify-between border-none bg-white p-3"
          >
            <img className="mr-6 h-6 w-6" src={ShareIcon} alt="share icon" />
            <p className="flex-grow text-center text-imos-dark-grey">{copyButtonText}</p>
            <div className="w-6" />
          </Button>
        </div>
        <div className="w-1/6">
          <VideoCreation disabled={shouldDisableOption} />
        </div>
      </div>
    </div>
  );
};

export default ProductMenuBar;
