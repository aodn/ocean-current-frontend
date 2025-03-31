import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import {
  buildProductImageUrl,
  buildArgoImageUrl,
  getTargetRegionScopePath,
  buildProductVideoUrl,
  buildCurrentMetersMapImageUrl,
  buildSSTTimeseriesImageUrl,
  buildEACMooringArrayImageUrl,
  buildTidalCurrentsMapImageUrl,
  buildTidalCurrentsDataImageUrl,
  buildSealCtdMapImageUrl,
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
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersSubproductsKey, CurrentMetersSubproductsKeyType } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { Region } from '@/types/map';
import DataImageWithArgoMap from '../data-image/DataImageWithArgoMap';
import DataImageWithCurrentMetersMap from '../data-image/DataImageWithCurrentMetersMap';
import DataImageWithCurrentMetersPlots from '../data-image/DataImageWithCurrentMetersPlots';
import DataImageWithTidalCurrentsMap from '../data-image/DataImageWithTidalCurrentsMap';
import DataImageWithSealCtdGraphs from '../data-image/DataImageWithSealCtdGraphs';

const getRegionPath = (region: Region | undefined) => {
  if (!region) return 'Au';

  // we have to override the code to get the correct image file path as they have been changed to provide more context in code
  if (region?.code === 'Bris-Newc') {
    return 'Brisbane';
  } else if (region?.code === 'Brisbane') {
    return 'Brisbane2';
  } else {
    return region?.code;
  }
};

const ProductContent: React.FC = () => {
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isArgo, isCurrentMeters, isEACMooringArray, isTidalCurrents, isSealCtd } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const useRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const useProductId = useProductStore((state) => state.productParams.productId);
  const useArgoProfileCycles = useArgoStore((state) => state.argoProfileCycles);
  const { mainProduct, subProduct } = useProductConvert();
  const { worldMeteorologicalOrgId, cycle, depth } = useArgoStore((state) => state.selectedArgoParams);
  const { showVideo } = useOutletContext<VideoPlayerOutletContext>();
  const {
    property,
    depth: currentMetersDepth,
    region: currentMetersRegion,
    date: currentMetersDate,
    deploymentPlot,
  } = useCurrentMetersStore();
  const [searchParams, _] = useSearchParams();

  // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
  const region = getRegionByRegionTitle(isEACMooringArray ? 'Brisbane' : useRegionTitle);
  const regionScope = region?.scope || RegionScope.Au;
  const targetPathRegion = getTargetRegionScopePath(regionScope);
  const regionPath = getRegionPath(region);

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
    return <ErrorImage date={useDate} productId={mainProduct!.key} />;
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

  // for Tidal Currents points
  const pointUrlParam = searchParams.get('point');
  const hasSelectedPointFromUrl = pointUrlParam && pointUrlParam !== '';

  const chooseImg = (): string | undefined => {
    try {
      switch (true) {
        case isArgo:
          return buildArgoImgUrl();
        case isCurrentMeters:
          return buildCurrentMetersMapImageUrl(currentMetersRegion, currentMetersDate, property, currentMetersDepth);
        case useProductId === 'sixDaySst-timeseries':
          return buildSSTTimeseriesImageUrl(regionPath);
        case isEACMooringArray:
          return buildEACMooringArrayImageUrl(useDate);
        case isTidalCurrents && !hasSelectedPointFromUrl:
          return buildTidalCurrentsMapImageUrl(
            useRegionTitle ?? 'Australia',
            subProduct?.key ?? 'tidalCurrents-spd',
            useDate,
          );
        case isTidalCurrents && hasSelectedPointFromUrl:
          return buildTidalCurrentsDataImageUrl(pointUrlParam, useDate);
        case isSealCtd:
          return buildSealCtdMapImageUrl(useRegionTitle ?? 'Antarctica', useDate);
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

  if (showVideo) {
    return (
      <div className="h-full bg-white">
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
      </div>
    );
  }

  if (shouldRenderDataImageWithArgoTags) {
    return (
      <DataImageWithArgoMap
        src={chooseImg()!}
        date={useDate}
        productId={useProductId}
        regionCode={regionPath}
        regionScope={regionScope}
      />
    );
  }

  if (isTidalCurrents) {
    return (
      <DataImageWithTidalCurrentsMap
        mainProduct={mainProduct}
        src={chooseImg()!}
        date={useDate}
        productId={useProductId}
        region={useRegionTitle ?? 'Australia'}
      />
    );
  }

  if (subProduct?.key === 'sealCtd-timeseriesSalinity' || subProduct?.key === 'sealCtd-timeseriesTemperature') {
    return (
      <DataImageWithSealCtdGraphs
        mainProduct={mainProduct}
        date={useDate}
        productId={useProductId}
        region={useRegionTitle ?? 'Antarctica'}
      />
    );
  }

  if (isCurrentMeters) {
    const hasSelectedPlotFromUrl = searchParams.get('deploymentPlot') && searchParams.get('deploymentPlot') !== '';

    if (
      subProduct?.key === CurrentMetersSubproductsKey.MOORED_INSTRUMENT_ARRAY &&
      deploymentPlot === '' &&
      !hasSelectedPlotFromUrl
    ) {
      return (
        <DataImageWithCurrentMetersMap
          mainProduct={mainProduct}
          src={chooseImg()!}
          date={currentMetersDate}
          productId={useProductId}
          regionCode={currentMetersRegion}
        />
      );
    }
    return (
      <DataImageWithCurrentMetersPlots
        subProductKey={useProductId as CurrentMetersSubproductsKeyType}
        deploymentPlot={deploymentPlot as CurrentMetersDeploymentPlotNames}
      />
    );
  }

  return (
    <div className="h-full bg-white">
      <img
        onClick={handlePopup}
        className="max-h-[80vh] w-full select-none object-contain"
        src={chooseImg()}
        alt="product"
        onError={handleError}
        aria-hidden
      />
    </div>
  );
};

export default ProductContent;
