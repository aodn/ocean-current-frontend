import React, { useEffect, useState } from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import {
  buildProductImageUrl,
  buildArgoImageUrl,
  getTargetRegionScopPath,
  buildSurfaceWavesImageUrl,
} from '@/utils/dataImgBuilder';
import useArgoStore from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { RegionScope } from '@/constants/region';
import { Loading, Popup } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { checkProductHasSubProduct } from '@/utils/product';
import SearchIcon from '@/assets/icons/search-icon.svg';
import useDateStore from '@/stores/date-store/dateStore';

const ProductImage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();
  const { worldMeteorologicalOrgId, cycle, depth } = useArgoStore((state) => state.argoParams);

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  // TODO: handle error if no region selected
  const regionPath = region?.region || 'au';

  useEffect(() => {
    setError(null);
  }, [mainProduct, subProduct, cycle, depth, regionPath, targetPathRegion, useDate]);

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

  const buildArgoImg = (): string => buildArgoImageUrl(worldMeteorologicalOrgId, useDate, cycle, depth);

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

  const handleError = () => {
    setError('Image not available');
  };

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="group relative">
      <img
        onClick={handlePopup}
        className="h-full w-full cursor-pointer select-none object-contain"
        src={chooseImg()}
        alt="product"
        onError={handleError}
        aria-hidden
      />
      <img
        alt="search icon"
        src={SearchIcon}
        className="absolute right-9 top-5 cursor-pointer rounded bg-white p-2 px-2 py-1 opacity-0 duration-200 group-hover:opacity-100"
      />
      <Popup isImage isOpen={isPopupOpen} onClose={handlePopup} imageUrl={chooseImg()} />
    </div>
  );
};

export default ProductImage;
