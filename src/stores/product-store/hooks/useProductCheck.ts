import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const useProductCheck = () => {
  const mainProduct = useProductConvert();

  const mainProductId = mainProduct?.mainProduct?.key || '';

  const productsWithoutRegion = ['argo', 'surfaceWaves'];

  const isRegionRequired = !productsWithoutRegion.includes(mainProductId);
  const isArgo = mainProductId === 'argo';
  const isFourHourSst = mainProductId === 'fourHourSst';

  return { isRegionRequired, isArgo, isFourHourSst };
};

export default useProductCheck;
