import React from 'react';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { buildProductImageUrl, buildArgoImageUrl, getTargetRegionScopPath } from '@/utils/dataImgBuilder';
import useArgoStore from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const DataView: React.FC = () => {
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

  if (!mainProduct) {
    return <Loading />;
  }

  const buildArgoImg = (): string => {
    return buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);
  };

  const buildProductImg = (): string => {
    return buildProductImageUrl(
      mainProduct.key,
      subProductImgPath,
      regionPath,
      targetPathRegion,
      useProductDate.toString(),
    );
  };

  const chooseImg = (): string => (isArgo ? buildArgoImg() : buildProductImg());

  return <img className="h-full w-full select-none object-contain" src={chooseImg()} alt="product" />;
};

export default DataView;
