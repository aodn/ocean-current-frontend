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
  buildSealCtdTagsDataImageUrl,
} from '@/utils/data-image-builder-utils/dataImgBuilder';
import useArgoStore, { setArgoProfileCycles } from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
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
import { CurrentMetersSubproductsKey } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import DataImageWithArgoMap from '../data-image/DataImageWithArgoMap';
import DataImageWithCurrentMetersMap from '../data-image/DataImageWithCurrentMetersMap';
import DataImageWithCurrentMetersPlots from '../data-image/DataImageWithCurrentMetersPlots';
import DataImageWithTidalCurrentsMap from '../data-image/DataImageWithTidalCurrentsMap';
import DataImageWithSealCtdGraphs from '../data-image/DataImageWithSealCtdGraphs';

const ProductContent: React.FC = () => {
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const { isArgo, isCurrentMeters, isEACMooringArray, isTidalCurrents, isSealCtd, isSealCtdTags } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const useRegionCode = useProductStore((state) => state.productParams.regionCode);
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
  const region = getRegionByRegionCode(isEACMooringArray ? 'Brisbane' : useRegionCode);
  const regionScope = region?.scope || RegionScope.Au;
  const targetPathRegion = getTargetRegionScopePath(regionScope);
  const regionPath = region?.code;

  const dateString = useDate.format('YYYYMMDDHH');

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

  const selectedSealCtdTag = searchParams.get('sealId');
  const hasSelectedSealCtdTagFromUrl = selectedSealCtdTag && selectedSealCtdTag !== '';

  const chooseImg = (): string | undefined => {
    try {
      switch (true) {
        case isArgo:
          return buildArgoImgUrl();
        case isCurrentMeters:
          return buildCurrentMetersMapImageUrl(currentMetersRegion, currentMetersDate, property, currentMetersDepth);
        case useProductId === 'sixDaySst-timeseries':
          return buildSSTTimeseriesImageUrl(regionPath ?? '');
        case isEACMooringArray:
          return buildEACMooringArrayImageUrl(useDate);
        case isTidalCurrents && !hasSelectedPointFromUrl:
          return buildTidalCurrentsMapImageUrl(useRegionCode ?? 'Au', subProduct?.key ?? 'tidalCurrents-spd', useDate);
        case isTidalCurrents && hasSelectedPointFromUrl:
          return buildTidalCurrentsDataImageUrl(pointUrlParam, useDate);
        case isSealCtd:
          return buildSealCtdMapImageUrl(useRegionCode ?? 'POLAR', useDate);
        case isSealCtdTags && hasSelectedSealCtdTagFromUrl:
          return buildSealCtdTagsDataImageUrl(selectedSealCtdTag, useDate, useProductId);
        default:
          return buildProductImageUrl(
            mainProduct.key,
            subProductImgPath,
            regionPath ?? 'Au',
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
      regionPath ?? 'Au',
      targetPathRegion,
      useDate.toString(),
    );

    return showVideo ? videoUrl : imgUrl!;
  };

  const handleError = () => {
    setImgLoadError('Media not available');
  };

  if (showVideo) {
    return (
      <div className="h-full bg-white">
        <video
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
        regionCode={regionPath ?? 'Au'}
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
        region={useRegionCode ?? 'Au'}
      />
    );
  }

  if (subProduct?.key === 'sealCtd-timeseriesSalinity' || subProduct?.key === 'sealCtd-timeseriesTemperature') {
    return (
      <DataImageWithSealCtdGraphs
        mainProduct={mainProduct}
        date={useDate}
        productId={useProductId}
        region={useRegionCode ?? 'POLAR'}
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
    return <DataImageWithCurrentMetersPlots deploymentPlot={deploymentPlot as CurrentMetersDeploymentPlotNames} />;
  }

  return (
    <div className="h-full bg-white">
      <img
        className="max-h-[80vh] w-full select-none object-contain"
        src={chooseImg()}
        alt="product"
        onError={handleError}
      />
    </div>
  );
};

export default ProductContent;
