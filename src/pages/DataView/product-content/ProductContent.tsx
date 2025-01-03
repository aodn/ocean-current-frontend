import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import {
  buildProductImageUrl,
  buildArgoImageUrl,
  getTargetRegionScopePath,
  buildProductVideoUrl,
  buildCurrentMeterImageUrl,
  buildSSTTimeseriesImageUrl,
  buildEACMooringArrayImageUrl,
} from '@/utils/data-image-builder-utils/dataImgBuilder';
import useArgoStore, { setArgoProfileCycles } from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { checkProductHasSubProduct } from '@/utils/product-utils/product';
import useDateStore from '@/stores/date-store/dateStore';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { VideoPlayerOutletContext } from '@/types/router';
import { checkProductHasArgoTags } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useCurrentMeterStore from '@/stores/current-meters-store/currentMeters';
import DataImage from '../data-image/DataImage';

const ProductContent: React.FC = () => {
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isArgo, isCurrentMeters, isEACMooringArray } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const useRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const useProductId = useProductStore((state) => state.productParams.productId);
  const useArgoProfileCycles = useArgoStore((state) => state.argoProfileCycles);
  const { mainProduct, subProduct } = useProductConvert();
  const { worldMeteorologicalOrgId, cycle, depth } = useArgoStore((state) => state.selectedArgoParams);
  const { showVideo } = useOutletContext<VideoPlayerOutletContext>();
  const { property, depth: currentMeterDepth, region: currentMeterRegion } = useCurrentMeterStore();

  const region = getRegionByRegionTitle(useRegionTitle);
  const regionScope = region?.scope || RegionScope.Au;
  const targetPathRegion = getTargetRegionScopePath(regionScope);
  const regionPath = region?.code || 'Au';

  const dateString = useDate.format('YYYYMMDD');

  const isImgHasArgoTags = checkProductHasArgoTags(useProductId);

  const shouldRenderDataImageWithArgoTags = !isArgo && isImgHasArgoTags;

  useEffect(() => {
    setImgLoadError(null);
  }, [
    mainProduct,
    subProduct,
    cycle,
    depth,
    regionPath,
    targetPathRegion,
    dateString,
    worldMeteorologicalOrgId,
    useArgoProfileCycles,
  ]);

  useEffect(() => {
    const fetchArgoProfileCycles = async (wmoId: string) => {
      const { data } = await getArgoProfileCyclesByWmoId(wmoId);
      setArgoProfileCycles(data);
    };
    if (isArgo && worldMeteorologicalOrgId) {
      fetchArgoProfileCycles(worldMeteorologicalOrgId);
    }
  }, [isArgo, worldMeteorologicalOrgId]);

  if (imgLoadError) {
    return <ErrorImage date={useDate} product={mainProduct!} />;
  }

  if (!mainProduct || !useProductId) {
    return <Loading />;
  }

  const isHasSubProduct = checkProductHasSubProduct(mainProduct?.key);
  if (isHasSubProduct && !subProduct) {
    return <Loading />;
  }

  // TODO: give default sub product for subProductImgPath
  const subProductImgPath = subProduct?.imgPath ?? '';

  const buildArgoImgUrl = (): string => {
    const selectedCycle = useArgoProfileCycles.find(({ date }) => date === useDate.format('YYYYMMDD'))?.cycle;

    if (!selectedCycle) {
      throw new Error('Argo cycle not available');
    }

    return buildArgoImageUrl(worldMeteorologicalOrgId, useDate, selectedCycle, depth);
  };

  const chooseImg = (): string | undefined => {
    try {
      switch (true) {
        case isArgo:
          return buildArgoImgUrl();
        case isCurrentMeters:
          return buildCurrentMeterImageUrl(currentMeterRegion, useDate, property, currentMeterDepth);
        case useProductId === 'sixDaySst-timeseries':
          return buildSSTTimeseriesImageUrl(regionPath);
        case isEACMooringArray:
          return buildEACMooringArrayImageUrl(useDate);
        default:
          return buildProductImageUrl(
            mainProduct.key,
            subProductImgPath,
            regionPath,
            targetPathRegion,
            useDate.toString(),
          );
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setImgLoadError('Image not available');
      }
    }
  };

  const buildMediaUrl = (): string => {
    const imgUrl = chooseImg();
    const videoUrl = buildProductVideoUrl(
      mainProduct.key,
      subProductImgPath,
      regionPath,
      targetPathRegion,
      useDate.toString(),
    );

    return showVideo ? videoUrl : imgUrl!;
  };

  const handleError = () => {
    setImgLoadError('Media not available');
  };

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="h-full bg-white">
      {showVideo ? (
        <video
          onClick={handlePopup}
          className="max-h-[80vh] w-full select-none object-contain"
          src={buildMediaUrl()}
          controls
          onError={handleError}
        >
          <track default kind="captions" srcLang="en" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          {shouldRenderDataImageWithArgoTags ? (
            <DataImage
              src={chooseImg()!}
              date={useDate}
              productId={useProductId}
              regionCode={regionPath}
              regionScope={regionScope}
            />
          ) : (
            <img
              onClick={handlePopup}
              className="max-h-[80vh] w-full select-none object-contain"
              src={chooseImg()}
              alt="product"
              onError={handleError}
              aria-hidden
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductContent;
