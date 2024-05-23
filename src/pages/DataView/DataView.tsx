import React, { useState } from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { buildProductImageUrl, buildArgoImageUrl, getTargetRegionScopPath } from '@/utils/dataImgBuilder';
import useArgoStore from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { checkProductHasSubProduct } from '@/utils/product';

const DataView: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { isArgo } = useProductCheck();
  const date = useArgoStore((state) => state.date);
  const useProductDate = useProductStore((state) => state.productParams.date);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();
  const { worldMeteorologicalOrgId, cycle, depth } = useArgoStore((state) => state.argoParams);

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  // TODO: handle error if no region selected
  const regionPath = region?.region || 'au';

  // TODO: give default sub product for subProductImgPath
  const subProductImgPath = subProduct?.imgPath || 'SST';

  const isHasSubProduct = checkProductHasSubProduct(mainProduct?.key);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mainProduct) {
    return <Loading />;
  }

  if (isHasSubProduct && !subProduct) {
    return <Loading />;
  }

  const buildArgoImg = (): string => buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

  const buildProductImg = (): string =>
    buildProductImageUrl(mainProduct.key, subProductImgPath, regionPath, targetPathRegion, useProductDate.toString());

  const chooseImg = (): string | undefined => {
    try {
      return isArgo ? buildArgoImg() : buildProductImg();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return <img className="h-full w-full select-none object-contain" src={chooseImg()} alt="product" />;
};

export default DataView;
