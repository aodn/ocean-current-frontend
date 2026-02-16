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
import { ImageListResponse } from '@/types/imageList';

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
  productId: ProductID;
  // Date
  date: Dayjs;
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
  tidalCurrentsImageData?: ImageListResponse[];
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
    productId,
    date,
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
    oceanColourDateList,
    tidalCurrentsImageData,
  } = params;

  switch (true) {
    case isArgo:
      return buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    case isCurrentMeters:
      return buildCurrentMetersMapImageUrl(currentMetersRegion, currentMetersDate, property, currentMetersDepth);

    case productId === 'sixDaySst-timeseries':
      return buildSSTTimeseriesImageUrl(regionPath ?? '');

    case isEACMooringArray:
      return buildEACMooringArrayImageUrl(date);

    case isTidalCurrents && !hasSelectedPointFromUrl:
      return buildTidalCurrentsMapImageUrl(useRegionCode ?? 'Au', date, tidalCurrentsImageData);

    case isTidalCurrents && hasSelectedPointFromUrl && !!pointUrlParam:
      return buildTidalCurrentsDataImageUrl(pointUrlParam, date);

    case isSealCtd:
      return buildSealCtdMapImageUrl(useRegionCode ?? 'POLAR', date);

    case isSealCtdTags && hasSelectedSealCtdTagFromUrl && !!selectedSealCtdTag:
      return buildSealCtdTagsDataImageUrl(selectedSealCtdTag, date, productId);

    case productId === 'surfaceWaves-wave':
      return buildSurfaceWavesImageUrl(date);

    case productId === 'surfaceWaves-buoyTimeseries' && hasSelectedBuoyRegionFromUrl && !!buoyRegionUrlParam:
      return buildSurfaceWavesBuoyTimeseriesImageUrl(buoyRegionUrlParam!, date);

    case isOceanColourChlA: {
      const dateFormat = getDateFormatByProductIdAndRegionScope('oceanColour-chlA', regionScope);
      const formattedDate = date.format(dateFormat);
      return buildOceanColourImageUrl(regionPath ?? 'Au', formattedDate, oceanColourDateList);
    }

    default:
      return buildProductImageUrl(productId, regionPath ?? 'Au', targetPathRegion, date.toString());
  }
};
