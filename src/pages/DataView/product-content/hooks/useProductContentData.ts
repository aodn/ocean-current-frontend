import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import useArgoStore from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import useDateStore from '@/stores/date-store/dateStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { getRegionByRegionCode } from '@/utils/region-utils/region';
import { getTargetRegionScopePath } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { RegionScope } from '@/constants/region';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { sharedQueryConfig } from '@/configs/query';
import { getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import { ProductID } from '@/types/product';
import { useUrlParams } from './useUrlParams';

/**
 * Custom hook to manage and organize all product content data and state
 */
export const useProductContentData = () => {
  // Product checks
  const productChecks = useProductCheck();

  // Store state
  const useDate = useDateStore((state) => state.date);
  const useRegionCode = useProductStore((state) => state.productParams.regionCode);
  const useProductId = useProductStore((state) => state.productParams.productId);
  const useArgoProfileCycles = useArgoStore((state) => state.argoProfileCycles);
  const { mainProduct, subProduct } = useProductConvert();
  const argoParams = useArgoStore((state) => state.selectedArgoParams);
  const currentMetersParams = useCurrentMetersStore();

  const { urlParams, hasSelectedParams } = useUrlParams();

  // Region calculations
  const region = useMemo(
    () => getRegionByRegionCode(productChecks.isEACMooringArray ? 'Brisbane' : useRegionCode),
    [productChecks.isEACMooringArray, useRegionCode],
  );

  const regionData = useMemo(
    () => ({
      region,
      scope: region?.scope || RegionScope.Au,
      targetPath: getTargetRegionScopePath(region?.scope || RegionScope.Au),
      path: region?.code,
    }),
    [region],
  );

  // Argo tag file path
  const argoTagFilePath = useMemo(() => {
    if (!useProductId) return null;
    const pathValue = getArgoTagFilePathByProductId(useProductId as ProductID);
    return regionData.scope === RegionScope.Local ? pathValue?.local : pathValue?.state;
  }, [useProductId, regionData.scope]);

  // Ocean colour and tidal currents data query
  const { data: oceanColourImageData } = useQuery({
    queryKey: ['dateList', useProductId, useRegionCode],
    queryFn: () => fetchImageListByProductIdAndRegion(useProductId, useRegionCode!),
    enabled: productChecks.isOceanColourChlA && Boolean(useRegionCode),
    ...sharedQueryConfig,
  });

  const { data: tidalCurrentsImageData } = useQuery({
    queryKey: ['dateList', useProductId, useRegionCode],
    queryFn: () => fetchImageListByProductIdAndRegion(useProductId, useRegionCode!),
    enabled: productChecks.isTidalCurrents && Boolean(useRegionCode),
    ...sharedQueryConfig,
  });

  const dateString = useDate.format('YYYYMMDDHH');

  return {
    // Product checks
    productChecks,
    // Store state
    useDate,
    useRegionCode,
    useProductId,
    useArgoProfileCycles,
    mainProduct,
    subProduct,
    argoParams,
    currentMetersParams,
    // URL parameters
    urlParams,
    hasSelectedParams,
    // Region data
    regionData,
    argoTagFilePath,
    // Ocean colour data
    oceanColourImageData,
    tidalCurrentsImageData,
    // Other
    dateString,
  };
};
