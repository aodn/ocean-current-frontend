import React from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { buildImageUrl, getTargetRegionScopPath } from '@/utils/dataImgBuilder';
import useArgoStore from '@/stores/argo-store/argoStore';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { RegionScope } from '@/constants/region';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const DataView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();
  const useArgoDate = useArgoStore((state) => state.date);
  const useProductDate = useProductStore((state) => state.productParams.date);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  const regionPath = region?.region || 'au';

  const dateFromStore = (isArgo ? useArgoDate : useProductDate).toString();

  const subProductImgPath = subProduct?.imgPath || 'SST';

  const getArgoDate = () => {
    const date = searchParams.get('date') || dateFromStore || dayjs().format('YYYYMMDD');
    const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
    const cycle = searchParams.get('cycle') || '';
    const depth = searchParams.get('depth') === '1' ? '1' : '0';

    return { date, worldMeteorologicalOrgId, cycle, depth };
  };

  if (!mainProduct) {
    return <Loading />;
  }

  const buildImg = (): string => {
    const { date, worldMeteorologicalOrgId, cycle, depth } = getArgoDate();
    const profiles = depth === '0' ? 'profiles' : 'profiles_s';

    // TODO: handle the case if region is not provided from URL
    const productImgUrl = buildImageUrl(mainProduct.key, subProductImgPath, regionPath, targetPathRegion, date);

    const mockUrl = isArgo
      ? `https://oceancurrent.aodn.org.au/${profiles}/${worldMeteorologicalOrgId}/${date}_${worldMeteorologicalOrgId}_${cycle}.gif`
      : `https://oceancurrent.aodn.org.au${productImgUrl}`;
    return mockUrl;
  };

  return <img className="h-full w-full object-contain" src={buildImg()} alt="product" />;
};

export default DataView;
