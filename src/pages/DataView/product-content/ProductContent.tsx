import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router';
import {
  buildArgoImageUrl,
  buildCurrentMetersMapImageUrl,
  buildTidalCurrentsMapImageUrl,
  buildTidalCurrentsDataImageUrl,
  buildSealCtdMapImageUrl,
  buildSealCtdTagsDataImageUrl,
  buildSurfaceWavesBuoyTimeseriesImageUrl,
  buildStaticImageUrl,
  buildProductVideoUrl,
} from '@/utils/data-image-builder-utils/dataImgBuilder';
import { setArgoProfileCycles } from '@/stores/argo-store/argoStore';
import { Loading } from '@/components/Shared';
import { checkProductHasSubProduct } from '@/utils/product-utils/product';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { VideoPlayerOutletContext } from '@/types/router';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { CurrentMetersSubProductsKey } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import DataImageWithArgoMap from '../data-image/DataImageWithArgoMap';
import DataImageWithCurrentMetersMap from '../data-image/DataImageWithCurrentMetersMap';
import DataImageWithCurrentMetersPlots from '../data-image/DataImageWithCurrentMetersPlots';
import DataImageWithTidalCurrentsMap from '../data-image/DataImageWithTidalCurrentsMap';
import DataImageWithSealCtdGraphs from '../data-image/DataImageWithSealCtdGraphs';
import DataImageWithArgoAndSealCTDMap from '../data-image/DataImageWithArgoAndSealCTDMap';
import DataImageWithBuoyMap from '../data-image/DataImageWithBuoyMap';
import DataImage from '../data-image/DataImage';
import { useProductContentData } from './hooks/useProductContentData';
import { checkArgoTagsAvailability } from './utils/argoTagsUtils';
import { processOceanColourDateList } from './utils/oceanColourUtils';

const ProductContent: React.FC = () => {
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const { showVideo } = useOutletContext<VideoPlayerOutletContext>();

  // Get all product data using custom hook
  const {
    productChecks,
    useDate,
    useRegionCode,
    useProductId,
    useArgoProfileCycles,
    mainProduct,
    subProduct,
    argoParams,
    currentMetersParams,
    urlParams,
    hasSelectedParams,
    regionData,
    argoTagFilePath,
    oceanColourImageData,
    tidalCurrentsImageData,
    dateString,
  } = useProductContentData();
  // Determine if we should render with argo tags
  const shouldRenderDataImageWithArgoTags = useMemo(
    () => !productChecks.isArgo && checkArgoTagsAvailability(useProductId, regionData.scope),
    [productChecks.isArgo, useProductId, regionData.scope],
  );
  // Process ocean colour date list
  const oceanColourDateList = useMemo(
    () => (productChecks.isOceanColourChlA ? processOceanColourDateList(oceanColourImageData) : []),
    [productChecks.isOceanColourChlA, oceanColourImageData],
  );

  // Build image URL
  const chooseImg = useCallback((): string | undefined => {
    try {
      const { isArgo, isCurrentMeters, isTidalCurrents, isSealCtd, isSealCtdTags } = productChecks;

      // Video-disabled products with specialized params
      switch (true) {
        case isArgo:
          return buildArgoImageUrl(argoParams.worldMeteorologicalOrgId, useDate, argoParams.cycle, argoParams.depth);
        case isCurrentMeters:
          return buildCurrentMetersMapImageUrl(
            currentMetersParams.region,
            currentMetersParams.date,
            currentMetersParams.property,
            currentMetersParams.depth,
          );
        case isTidalCurrents && !hasSelectedParams.point:
          return buildTidalCurrentsMapImageUrl(useRegionCode ?? 'Au', useDate, tidalCurrentsImageData);
        case isTidalCurrents && hasSelectedParams.point && !!urlParams.point:
          return buildTidalCurrentsDataImageUrl(urlParams.point!, useDate);
        case isSealCtd && useProductId !== 'sealCtd-sealTracks':
          return buildSealCtdMapImageUrl(useRegionCode ?? 'POLAR', useDate);
        case isSealCtdTags && hasSelectedParams.sealCtdTag && !!urlParams.sealCtdTag:
          return buildSealCtdTagsDataImageUrl(urlParams.sealCtdTag!, useDate, useProductId);
        case useProductId === 'surfaceWaves-buoyTimeseries' && hasSelectedParams.buoyRegion && !!urlParams.buoyRegion:
          return buildSurfaceWavesBuoyTimeseriesImageUrl(urlParams.buoyRegion!, useDate);
        // All other products (video-enabled) through the shared builder
        default:
          return buildStaticImageUrl(
            useProductId,
            useDate,
            regionData.path ?? 'Au',
            regionData.scope,
            regionData.targetPath,
            useRegionCode,
            { oceanColourDateList },
          );
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setImgLoadError('Image not available');
      }
    }
  }, [
    productChecks,
    useProductId,
    useDate,
    regionData,
    useRegionCode,
    argoParams,
    currentMetersParams,
    hasSelectedParams,
    urlParams,
    oceanColourDateList,
    tidalCurrentsImageData,
  ]);

  // Build media URL (video or image)
  const buildMediaUrl = useCallback((): string => {
    const imgUrl = chooseImg();
    const videoUrl = buildProductVideoUrl(
      useProductId,
      regionData.path ?? 'Au',
      regionData.targetPath,
      useDate.toString(),
      true, // Use proxy for videos to avoid CORS issues on mobile/Safari
    );
    return showVideo ? videoUrl : imgUrl!;
  }, [chooseImg, showVideo, useProductId, regionData, useDate]);

  // Error handler
  const handleError = useCallback(() => {
    setImgLoadError('Media not available');
  }, []);

  // Reset error state when dependencies change
  useEffect(() => {
    setImgLoadError(null);
  }, [
    mainProduct,
    subProduct,
    argoParams.cycle,
    argoParams.depth,
    regionData.path,
    regionData.targetPath,
    dateString,
    argoParams.worldMeteorologicalOrgId,
    useArgoProfileCycles,
  ]);

  // Fetch Argo profile cycles
  useEffect(() => {
    const getArgoProfileCycles = async (wmoId: string) => {
      const data = await fetchArgoProfileCyclesByWmoId(wmoId);
      setArgoProfileCycles(data);
    };
    if (productChecks.isArgo && argoParams.worldMeteorologicalOrgId) {
      getArgoProfileCycles(argoParams.worldMeteorologicalOrgId);
    }
  }, [productChecks.isArgo, argoParams.worldMeteorologicalOrgId]);

  // Early returns for error/loading states
  if (productChecks.isArgo && !argoParams.worldMeteorologicalOrgId) {
    return <ErrorImage date={useDate} productId="argo" />;
  }

  if (productChecks.isSurfaceWavesBuoyTimeseries && !hasSelectedParams.buoyRegion) {
    return <ErrorImage date={useDate} productId="surfaceWaves-buoyTimeseries" />;
  }

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

  // Video rendering
  if (showVideo) {
    return (
      <div className="h-full bg-white">
        <video
          className="max-h-[80vh] w-full select-none object-contain"
          controls
          playsInline
          preload="auto"
          onError={handleError}
        >
          <source src={buildMediaUrl()} type="video/mp4" />
          <track default kind="captions" srcLang="en" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Render with Argo tags
  if (shouldRenderDataImageWithArgoTags) {
    return (
      <DataImageWithArgoMap
        src={chooseImg()!}
        date={useDate}
        productId={useProductId}
        regionCode={regionData.path ?? 'Au'}
        regionScope={regionData.scope}
        argoTagFilePath={argoTagFilePath!}
      />
    );
  }

  // Tidal currents
  if (productChecks.isTidalCurrents) {
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

  // Surface waves
  if (mainProduct.key === 'surfaceWaves') {
    if (useProductId === 'surfaceWaves-buoyTimeseries') {
      return <DataImage src={chooseImg()!} onError={handleError} />;
    }
    return <DataImageWithBuoyMap src={chooseImg()!} date={useDate} productId={useProductId} />;
  }

  // Seal CTD tracks
  if (subProduct?.key === 'sealCtd-sealTracks') {
    return (
      <DataImageWithArgoAndSealCTDMap
        src={chooseImg()!}
        date={useDate}
        productId={useProductId}
        regionCode={useRegionCode ?? 'POLAR'}
      />
    );
  }

  // Seal CTD timeseries
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

  // Current meters
  if (productChecks.isCurrentMeters) {
    if (
      subProduct?.key === CurrentMetersSubProductsKey.MOORED_INSTRUMENT_ARRAY &&
      currentMetersParams.deploymentPlot === '' &&
      !hasSelectedParams.deploymentPlot
    ) {
      return (
        <DataImageWithCurrentMetersMap
          mainProduct={mainProduct}
          src={chooseImg()!}
          date={currentMetersParams.date}
          regionCode={currentMetersParams.region}
        />
      );
    }
    return (
      <DataImageWithCurrentMetersPlots
        deploymentPlot={currentMetersParams.deploymentPlot as CurrentMetersDeploymentPlotNames}
      />
    );
  }

  // Default data image
  return <DataImage src={chooseImg()!} onError={handleError} />;
};

export default ProductContent;
