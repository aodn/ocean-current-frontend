import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router';
import { useQuery } from '@tanstack/react-query';
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
import { sharedQueryConfig } from '@/configs/query';
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

  const {
    isArgo,
    isCurrentMeters,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isOceanColourChlA,
    isSurfaceWavesBuoyTimeseries,
  } = productChecks;

  // Determine if we should render with argo tags
  const shouldRenderDataImageWithArgoTags = useMemo(
    () => !isArgo && checkArgoTagsAvailability(useProductId, regionData.scope),
    [isArgo, useProductId, regionData.scope],
  );
  // Process ocean colour date list
  const oceanColourDateList = useMemo(
    () => (isOceanColourChlA ? processOceanColourDateList(oceanColourImageData) : []),
    [isOceanColourChlA, oceanColourImageData],
  );

  // Fetch Argo profile cycles — shares cache with useDateList and WmoSection via the same query key
  const { data: argoProfileCyclesData } = useQuery({
    queryKey: ['argoDateList', argoParams.worldMeteorologicalOrgId],
    queryFn: () => fetchArgoProfileCyclesByWmoId(argoParams.worldMeteorologicalOrgId),
    enabled: isArgo && !!argoParams.worldMeteorologicalOrgId,
    ...sharedQueryConfig,
  });

  // Build image URL
  const chooseImg = useCallback((): string | undefined => {
    try {
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
    isArgo,
    isCurrentMeters,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
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

  useEffect(() => {
    if (argoProfileCyclesData) {
      setArgoProfileCycles(argoProfileCyclesData);
    }
  }, [argoProfileCyclesData]);

  // Early returns for error/loading states
  if (isArgo && !argoParams.worldMeteorologicalOrgId) {
    return <ErrorImage date={useDate} productId="argo" />;
  }

  if (isSurfaceWavesBuoyTimeseries && !hasSelectedParams.buoyRegion) {
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
          className="max-h-[80vh] w-full object-contain select-none"
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

  // Render with Argo tags: eac-mooring-array, four-hour-sst, six-hour-sst, and ocean-colour-chl-a, adjusted-sea-level-anomaly
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

  // Use the store (not the URL) as source of truth — a stale URL deploymentPlot
  // would otherwise route to the plot view with an empty store value.
  if (isCurrentMeters) {
    if (
      subProduct?.key === CurrentMetersSubProductsKey.MOORED_INSTRUMENT_ARRAY &&
      currentMetersParams.deploymentPlot === ''
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
