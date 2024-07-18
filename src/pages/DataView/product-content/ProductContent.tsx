import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import {
  buildProductImageUrl,
  buildArgoImageUrl,
  getTargetRegionScopPath,
  buildSurfaceWavesImageUrl,
  buildProductVideoUrl,
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

const ProductContent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const useArgoProfileCycles = useArgoStore((state) => state.argoProfileCycles);
  const { mainProduct, subProduct } = useProductConvert();
  const { worldMeteorologicalOrgId, cycle, depth } = useArgoStore((state) => state.selectedArgoParams);
  const { showVideo } = useOutletContext<VideoPlayerOutletContext>();

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  const regionPath = region?.code || 'au';

  const dateString = useDate.format('YYYYMMDD');

  useEffect(() => {
    setError(null);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mainProduct) {
    return <Loading />;
  }

  const isHasSubProduct = checkProductHasSubProduct(mainProduct?.key);
  if (isHasSubProduct && !subProduct) {
    return <Loading />;
  }

  // TODO: give default sub product for subProductImgPath
  const subProductImgPath = subProduct?.imgPath;

  const buildArgoImg = (): string => {
    const selectedCycle = useArgoProfileCycles.find(({ date }) => date === useDate.format('YYYYMMDD'))?.cycle;

    if (!selectedCycle) {
      throw new Error('Argo cycle not available');
    }
    return buildArgoImageUrl(worldMeteorologicalOrgId, useDate, selectedCycle, depth);
  };

  const buildProductImg = (): string => {
    // TODO: config string to constant
    if (mainProduct.key === 'surfaceWaves') {
      return buildSurfaceWavesImageUrl(useDate.toString());
    }
    return buildProductImageUrl(mainProduct.key, subProductImgPath, regionPath, targetPathRegion, useDate.toString());
  };

  const chooseImg = (): string | undefined => {
    try {
      return isArgo ? buildArgoImg() : buildProductImg();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError('Image not available');
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
    setError('Media not available');
  };

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="group relative">
      {showVideo ? (
        <video
          onClick={handlePopup}
          className="max-h-[80vh] w-full cursor-pointer select-none object-contain"
          src={buildMediaUrl()}
          controls
          onError={handleError}
        >
          <track default kind="captions" srcLang="en" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          onClick={handlePopup}
          className="max-h-[80vh] w-full cursor-pointer select-none object-contain"
          src={chooseImg()}
          alt="product"
          onError={handleError}
          aria-hidden
        />
      )}
    </div>
  );
};

export default ProductContent;
