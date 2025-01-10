import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const useProductCheck = () => {
  const { mainProduct } = useProductConvert();

  const mainProductId = mainProduct?.key || '';

  const productsWithoutRegion = ['argo', 'surfaceWaves'];

  const isRegionRequired = !productsWithoutRegion.includes(mainProductId);
  const isArgo = mainProductId === 'argo';
  const isCurrentMeters = mainProductId === 'currentMeters';
  const isClimatology = mainProductId === 'climatology';
  const isEACMooringArray = mainProductId === 'EACMooringArray';

  return { isRegionRequired, isArgo, isCurrentMeters, isClimatology, isEACMooringArray };
};

export default useProductCheck;
