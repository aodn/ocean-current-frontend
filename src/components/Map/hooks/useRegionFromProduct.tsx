import { nationRegions, stateRegions, localRegions } from '@/data/regionData';
import { regionException } from '@/data/regionException';
import useProductStore from '@/stores/product-store/productStore';
import { Region } from '@/types/map';

const useRegionFromProduct = () => {
  const useMainProduct = useProductStore((state) => state.mainProduct);
  const useSubProduct = useProductStore((state) => state.subProduct);

  const getRegions = (mainProduct: string, subProduct: string | null): Region[] => {
    const key = subProduct ? `${mainProduct}-${subProduct}` : mainProduct;
    const { localException = [], stateException = [] } = regionException[key] || {};

    const newLocalRegions = localRegions.filter(({ region }) => !localException.includes(region));
    const newStateRegions = stateRegions.filter(({ region }) => !stateException.includes(region));
    return [...nationRegions, ...newLocalRegions, ...newStateRegions] as Region[];
  };

  const newRegions = getRegions(useMainProduct, useSubProduct);

  return { regions: newRegions };
};

export default useRegionFromProduct;
