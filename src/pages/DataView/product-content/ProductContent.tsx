import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import {
  buildProductImageUrl,
  buildOceanColourImageUrl,
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
  buildSurfaceWavesBuoyTimeseriesImageUrl,
  buildSurfaceWavesImageUrl,
  formatDateByProductId,
} from '@/utils/data-image-builder-utils/dataImgBuilder';
import useArgoStore, { setArgoProfileCycles } from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { checkProductHasSubProduct } from '@/utils/product-utils/product';
import useDateStore from '@/stores/date-store/dateStore';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { VideoPlayerOutletContext } from '@/types/router';
import { checkProductHasArgoTags, getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import { OceanColourDateItem } from '@/types/date';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { sharedQueryConfig } from '@/configs/query';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersSubproductsKey } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { ProductID } from '@/types/product';
import { ImageFile, ImageListResponse } from '@/types/imageList';
import DataImageWithArgoMap from '../data-image/DataImageWithArgoMap';
import DataImageWithCurrentMetersMap from '../data-image/DataImageWithCurrentMetersMap';
import DataImageWithCurrentMetersPlots from '../data-image/DataImageWithCurrentMetersPlots';
import DataImageWithTidalCurrentsMap from '../data-image/DataImageWithTidalCurrentsMap';
import DataImageWithSealCtdGraphs from '../data-image/DataImageWithSealCtdGraphs';
import DataImageWithArgoAndSealCTDMap from '../data-image/DataImageWithArgoAndSealCTDMap';
import DataImageWithBuoyMap from '../data-image/DataImageWithBuoyMap';
import DataImage from '../data-image/DataImage';

/**
 * Checks if argo tags are available for the current product and region scope
 */
const checkArgoTagsAvailability = (productId: string | undefined, regionScope: RegionScope): boolean => {
  if (!productId || !checkProductHasArgoTags(productId as ProductID)) {
    return false;
  }

  const argoTagFilePathValue = getArgoTagFilePathByProductId(productId as ProductID);
  if (!argoTagFilePathValue) {
    return false;
  }

  const argoTagFilePath = regionScope === RegionScope.Local ? argoTagFilePathValue?.local : argoTagFilePathValue?.state;

  return !!argoTagFilePath;
};

/**
 * Processes ocean colour image data to extract dates
 */
const processOceanColourDateList = (
  oceanColourImageData: ImageListResponse[] | undefined,
  regionScope: RegionScope,
): OceanColourDateItem[] => {
  if (!oceanColourImageData) {
    return [];
  }

  const extractDateFromFilename = (filename: string): string => {
    return filename.split('.')[0];
  };

  return oceanColourImageData
    .flatMap(
      (group) =>
        group.files?.map((file: ImageFile) => {
          const rawDate = extractDateFromFilename(file.name);
          try {
            const formattedDate = formatDateByProductId('oceanColour-chlA', rawDate, regionScope);
            return {
              date: formattedDate,
              path: group.path,
            };
          } catch {
            return {
              date: rawDate,
              path: group.path,
            };
          }
        }) || [],
    )
    .filter(({ date }) => /^\d+$/.test(date));
};

const ProductContent: React.FC = () => {
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // Store hooks
  const {
    isArgo,
    isCurrentMeters,
    isEACMooringArray,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isSurfaceWavesBuoyTimeseries,
    isOceanColourChlA,
  } = useProductCheck();
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

  // URL parameters
  const buoyRegionUrlParam = searchParams.get('region');
  const pointUrlParam = searchParams.get('point');
  const selectedSealCtdTag = searchParams.get('sealId');
  const hasSelectedBuoyRegionFromUrl = !!buoyRegionUrlParam;
  const hasSelectedPointFromUrl = !!pointUrlParam;
  const hasSelectedSealCtdTagFromUrl = !!selectedSealCtdTag;

  // Region calculations
  const region = useMemo(
    () => getRegionByRegionCode(isEACMooringArray ? 'Brisbane' : useRegionCode),
    [isEACMooringArray, useRegionCode],
  );
  const regionScope = region?.scope || RegionScope.Au;
  const targetPathRegion = getTargetRegionScopePath(regionScope);
  const regionPath = region?.code;
  const dateString = useDate.format('YYYYMMDDHH');

  // Argo tags availability check
  const shouldRenderDataImageWithArgoTags = useMemo(
    () => !isArgo && checkArgoTagsAvailability(useProductId, regionScope),
    [isArgo, useProductId, regionScope],
  );

  // Ocean colour data query
  const { data: oceanColourImageData } = useQuery({
    queryKey: ['dateList', useProductId, useRegionCode],
    queryFn: () => fetchImageListByProductIdAndRegion(useProductId, useRegionCode!),
    enabled: isOceanColourChlA && Boolean(useRegionCode),
    ...sharedQueryConfig,
  });

  const oceanColourDateList = useMemo(
    () => (isOceanColourChlA ? processOceanColourDateList(oceanColourImageData, regionScope) : []),
    [isOceanColourChlA, oceanColourImageData, regionScope],
  );

  // Build image URL based on product type
  const chooseImg = useCallback((): string | undefined => {
    try {
      switch (true) {
        case isArgo:
          return buildArgoImageUrl(worldMeteorologicalOrgId, useDate, cycle, depth);
        case isCurrentMeters:
          return buildCurrentMetersMapImageUrl(currentMetersRegion, currentMetersDate, property, currentMetersDepth);
        case useProductId === 'sixDaySst-timeseries':
          return buildSSTTimeseriesImageUrl(regionPath ?? '');
        case isEACMooringArray:
          return buildEACMooringArrayImageUrl(useDate);
        case isTidalCurrents && !hasSelectedPointFromUrl:
          return buildTidalCurrentsMapImageUrl(useRegionCode ?? 'Au', subProduct?.key ?? 'tidalCurrents-spd', useDate);
        case isTidalCurrents && hasSelectedPointFromUrl:
          return buildTidalCurrentsDataImageUrl(pointUrlParam!, useDate);
        case isSealCtd:
          return buildSealCtdMapImageUrl(useRegionCode ?? 'POLAR', useDate);
        case isSealCtdTags && hasSelectedSealCtdTagFromUrl:
          return buildSealCtdTagsDataImageUrl(selectedSealCtdTag!, useDate, useProductId);
        case useProductId === 'surfaceWaves-wave':
          return buildSurfaceWavesImageUrl(useDate);
        case useProductId === 'surfaceWaves-buoyTimeseries' && hasSelectedBuoyRegionFromUrl:
          return buildSurfaceWavesBuoyTimeseriesImageUrl(buoyRegionUrlParam!, useDate);
        case isOceanColourChlA: {
          const dateFormat = getDateFormatByProductIdAndRegionScope('oceanColour-chlA', regionScope);
          return buildOceanColourImageUrl(regionPath ?? 'Au', useDate.toString(), dateFormat, oceanColourDateList);
        }
        default:
          return buildProductImageUrl(useProductId, regionPath ?? 'Au', targetPathRegion, useDate.toString());
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
    isEACMooringArray,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isOceanColourChlA,
    useProductId,
    worldMeteorologicalOrgId,
    useDate,
    cycle,
    depth,
    currentMetersRegion,
    currentMetersDate,
    property,
    currentMetersDepth,
    regionPath,
    useRegionCode,
    subProduct?.key,
    hasSelectedPointFromUrl,
    pointUrlParam,
    hasSelectedSealCtdTagFromUrl,
    selectedSealCtdTag,
    hasSelectedBuoyRegionFromUrl,
    buoyRegionUrlParam,
    regionScope,
    targetPathRegion,
    oceanColourDateList,
  ]);

  const buildMediaUrl = useCallback((): string => {
    const imgUrl = chooseImg();
    const videoUrl = buildProductVideoUrl(useProductId, regionPath ?? 'Au', targetPathRegion, useDate.toString());
    return showVideo ? videoUrl : imgUrl!;
  }, [chooseImg, showVideo, useProductId, regionPath, targetPathRegion, useDate]);

  const handleError = useCallback(() => {
    setImgLoadError('Media not available');
  }, []);

  // Reset error state when dependencies change
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

  // Fetch Argo profile cycles
  useEffect(() => {
    const getArgoProfileCycles = async (wmoId: string) => {
      const data = await fetchArgoProfileCyclesByWmoId(wmoId);
      setArgoProfileCycles(data);
    };
    if (isArgo && worldMeteorologicalOrgId) {
      getArgoProfileCycles(worldMeteorologicalOrgId);
    }
  }, [isArgo, worldMeteorologicalOrgId]);

  // Early returns for error/loading states
  if (isArgo && !worldMeteorologicalOrgId) {
    return <ErrorImage date={useDate} productId="argo" />;
  }

  if (isSurfaceWavesBuoyTimeseries && !hasSelectedBuoyRegionFromUrl) {
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

  // Render with Argo tags
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

  // Current meters
  if (isCurrentMeters) {
    const hasSelectedPlotFromUrl = !!searchParams.get('deploymentPlot');

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
          regionCode={currentMetersRegion}
        />
      );
    }
    return <DataImageWithCurrentMetersPlots deploymentPlot={deploymentPlot as CurrentMetersDeploymentPlotNames} />;
  }

  // Default data image
  return <DataImage src={chooseImg()!} onError={handleError} />;
};

export default ProductContent;
