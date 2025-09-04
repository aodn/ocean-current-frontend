import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDateList, useDateRange, useQueryParams } from '@/hooks';
import { Dropdown, ToggleButton, Button } from '@/components/Shared';
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
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { CurrentMetersSubproductsKey, mooredInstrumentArrayPath } from '@/constants/currentMeters';
import DatePagination from '../DatePagination';
import { ProductMenuBarProps } from './types/ProductMenuBar.types';

const ProductMenuBar: React.FC<ProductMenuBarProps> = ({ setShowVideo, isMapView = false }) => {
  const { disableVideoCreation } = useDateRange();
  const { updateQueryParamsAndNavigate, updateUrlParamsByKey } = useQueryParams();

  const [copyButtonText, setCopyButtonText] = useState<string>(ProductMenubarText.SHARE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setLocalShowVideo] = useState(false);
  const { date: currentMetersDate, property, depth, region, deploymentPlot } = useCurrentMetersStore();
  const [_, setSearchParams] = useSearchParams();
  const {
    isArgo,
    isCurrentMeters,
    isSurfaceWavesBuoyTimeseries,
    isEACMooringArray,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
  } = useProductCheck();
  const productId = useProductStore((state) => state.productParams.productId);
  const shouldDisableOption =
    disableVideoCreation() ||
    isArgo ||
    isMapView ||
    isCurrentMeters ||
    isSurfaceWavesBuoyTimeseries ||
    isEACMooringArray ||
    isTidalCurrents ||
    (isSealCtd && productId !== 'sealCtd-sealTracks') ||
    isSealCtdTags;

  const dateFormat = useProductDateFormat();

  const { isLoading, dateList } = useDateList(productId);

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
      updateQueryParamsAndNavigate(`current-meters/${mooredInstrumentArrayPath}`, initialState);
    } else {
      if (isLoading) return;
      const latestDate = dateList?.[dateList.length - 1]?.date;
      if (!latestDate) return;
      updateUrlParamsByKey('date', latestDate);
    }
  };

  const handleCurrentMetersDateChange = (id: string) => {
    setCurrentMetersDate(id as string);
    if (isMapView) {
      setSearchParams({ date: id });
    } else {
      setSearchParams({ property, depth, region, deploymentPlot, date: id });
    }
  };

  return (
    <div className="mb-2 rounded-md">
      <div className="mb-2 flex items-center justify-between gap-3 font-sans font-medium text-imos-dark-grey">
        <div className="flex h-11 grow items-center justify-between rounded-md bg-white">
          {isCurrentMeters ? (
            <Dropdown
              elements={
                productId === CurrentMetersSubproductsKey.MOORED_INSTRUMENT_ARRAY && !deploymentPlot
                  ? yearOptionsData
                  : [yearOptionsData[0]]
              }
              selectedId={currentMetersDate as string}
              onChange={(elem) => handleCurrentMetersDateChange(elem.id)}
            />
          ) : (
            <DatePagination productId={productId} dateFormat={dateFormat} />
          )}
        </div>

        <Button
          onClick={() => handleReset()}
          aria-hidden
          className="flex-center h-11 w-12 rounded-md border-none bg-white p-2"
          aria-label="Reset to latest date"
        >
          <img src={ResetIcon} alt="reset icon" srcSet="" />
        </Button>
        <div
          className={`flex-center h-11 w-1/5 rounded-md bg-white p-3 ${shouldDisableOption && 'cursor-not-allowed opacity-50'}`}
        >
          <img src={VideoIcon} alt="video icon" />
          <p className="mx-3">{ProductMenubarText.VIDEO}</p>
          <ToggleButton disabled={shouldDisableOption} isOn={showVideo} onToggle={handleToggle} />
        </div>

        <div className="w-1/6">
          <Button
            onClick={() => handleCopyLink()}
            aria-hidden
            className="flex h-11 w-full flex-row items-center justify-between rounded-md border-none bg-white p-3"
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
