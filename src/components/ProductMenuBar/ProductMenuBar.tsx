import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDateRange, useQueryParams } from '@/hooks';
import { Dropdown, ToggleButton } from '@/components/Shared';
import VideoIcon from '@/assets/icons/video-icon.svg';
import { ProductMenubarText } from '@/constants/textConstant';
import ShareIcon from '@/assets/icons/share-icon.svg';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import VideoCreation from '@/components/VideoCreation/VideoCreation';
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
  const { disableVideoCreation, resetDateRange } = useDateRange();
  const { updateQueryParamsAndNavigate } = useQueryParams();

  const [copyButtonText, setCopyButtonText] = useState<string>(ProductMenubarText.SHARE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setLocalShowVideo] = useState(false);
  const { date: currentMetersDate, property, depth, region, deploymentPlot } = useCurrentMetersStore();
  const [_, setSearchParams] = useSearchParams();
  const { isArgo, isCurrentMeters, isEACMooringArray, isTidalCurrents, isSealCtd, isSealCtdTags } = useProductCheck();
  const productId = useProductStore((state) => state.productParams.productId);
  const shouldDisableOption =
    disableVideoCreation() ||
    isArgo ||
    isMapView ||
    isCurrentMeters ||
    isEACMooringArray ||
    isTidalCurrents ||
    (isSealCtd && productId !== 'sealCtd-sealTracks') ||
    isSealCtdTags;

  const dateFormat = useProductDateFormat();

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
      resetDateRange();
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

        <div
          onClick={() => handleReset()}
          aria-hidden
          className="flex-center h-11 w-12 cursor-pointer rounded-md bg-white p-2"
        >
          <img src={ResetIcon} alt="" srcSet="" />
        </div>
        <div
          className={`flex-center h-11 w-1/5 rounded-md bg-white p-3 ${shouldDisableOption && 'cursor-not-allowed opacity-50'}`}
        >
          <img src={VideoIcon} alt="video icon" />
          <p className="mx-3">{ProductMenubarText.VIDEO}</p>
          <ToggleButton disabled={shouldDisableOption} isOn={showVideo} onToggle={handleToggle} />
        </div>

        <div className="w-1/6">
          <div
            onClick={() => handleCopyLink()}
            aria-hidden
            className="flex h-11 cursor-pointer items-center justify-between rounded-md bg-white p-3"
          >
            <img className="mr-6 h-6 w-6" src={ShareIcon} alt="share icon" />
            <p className="flex-grow text-center">{copyButtonText}</p>
            <div className="w-6"></div>
          </div>
        </div>
        <div className="w-1/6">
          <VideoCreation disabled={shouldDisableOption} />
        </div>
      </div>
    </div>
  );
};

export default ProductMenuBar;
