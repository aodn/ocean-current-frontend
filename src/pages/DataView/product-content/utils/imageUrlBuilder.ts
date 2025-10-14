import { Dayjs } from 'dayjs';
import {
  buildProductImageUrl,
  buildOceanColourImageUrl,
  buildArgoImageUrl,
  buildCurrentMetersMapImageUrl,
  buildSSTTimeseriesImageUrl,
  buildEACMooringArrayImageUrl,
  buildTidalCurrentsMapImageUrl,
  buildTidalCurrentsDataImageUrl,
  buildSealCtdMapImageUrl,
  buildSealCtdTagsDataImageUrl,
  buildSurfaceWavesBuoyTimeseriesImageUrl,
  buildSurfaceWavesImageUrl,
} from '@/utils/data-image-builder-utils/dataImgBuilder';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { OceanColourDateItem } from '@/types/date';
import { RegionScope } from '@/constants/region';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { ProductID } from '@/types/product';

interface BuildImageUrlParams {
  // Product checks
  isArgo: boolean;
  isCurrentMeters: boolean;
  isEACMooringArray: boolean;
  isTidalCurrents: boolean;
  isSealCtd: boolean;
  isSealCtdTags: boolean;
  isOceanColourChlA: boolean;
  // Product info
  useProductId: ProductID;
  // Date
  useDate: Dayjs;
  // Region
  regionPath?: string;
  regionScope: RegionScope;
  targetPathRegion: RegionScope;
  useRegionCode: string | null;
  // Argo params
  worldMeteorologicalOrgId: string;
  cycle: string;
  depth: string;
  // Current meters params
  currentMetersRegion: CurrentMetersRegion;
  currentMetersDate: string;
  property: CurrentMetersProperty;
  currentMetersDepth: CurrentMetersDepth;
  // URL params
  hasSelectedPointFromUrl: boolean;
  pointUrlParam?: string;
  hasSelectedSealCtdTagFromUrl: boolean;
  selectedSealCtdTag?: string;
  hasSelectedBuoyRegionFromUrl: boolean;
  buoyRegionUrlParam?: string;
  // Sub product
  subProductKey?: string;
  // Ocean colour data
  oceanColourDateList: OceanColourDateItem[];
}

/**
 * Builds the appropriate image URL based on product type and parameters
 */
export const buildImageUrl = (params: BuildImageUrlParams): string | undefined => {
  const {
    isArgo,
    isCurrentMeters,
    isEACMooringArray,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isOceanColourChlA,
    useProductId,
    useDate,
    regionPath,
    regionScope,
    targetPathRegion,
    useRegionCode,
    worldMeteorologicalOrgId,
    cycle,
    depth,
    currentMetersRegion,
    currentMetersDate,
    property,
    currentMetersDepth,
    hasSelectedPointFromUrl,
    pointUrlParam,
    hasSelectedSealCtdTagFromUrl,
    selectedSealCtdTag,
    hasSelectedBuoyRegionFromUrl,
    buoyRegionUrlParam,
    subProductKey,
    oceanColourDateList,
  } = params;

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
      return buildTidalCurrentsMapImageUrl(useRegionCode ?? 'Au', subProductKey ?? 'tidalCurrents-spd', useDate);

    case isTidalCurrents && hasSelectedPointFromUrl && !!pointUrlParam:
      return buildTidalCurrentsDataImageUrl(pointUrlParam, useDate);

    case isSealCtd:
      return buildSealCtdMapImageUrl(useRegionCode ?? 'POLAR', useDate);

    case isSealCtdTags && hasSelectedSealCtdTagFromUrl && !!selectedSealCtdTag:
      return buildSealCtdTagsDataImageUrl(selectedSealCtdTag, useDate, useProductId);

    case useProductId === 'surfaceWaves-wave':
      return buildSurfaceWavesImageUrl(useDate);

    case useProductId === 'surfaceWaves-buoyTimeseries' && hasSelectedBuoyRegionFromUrl && !!buoyRegionUrlParam:
      return buildSurfaceWavesBuoyTimeseriesImageUrl(buoyRegionUrlParam!, useDate);

    case isOceanColourChlA: {
      const dateFormat = getDateFormatByProductIdAndRegionScope('oceanColour-chlA', regionScope);
      return buildOceanColourImageUrl(regionPath ?? 'Au', useDate.toString(), dateFormat, oceanColourDateList);
    }

    default:
      return buildProductImageUrl(useProductId, regionPath ?? 'Au', targetPathRegion, useDate.toString());
  }
};
