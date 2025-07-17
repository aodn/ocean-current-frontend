import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const useProductCheck = () => {
  const { mainProduct, subProduct } = useProductConvert();

  const mainProductId = mainProduct?.key || '';

  const productsWithoutRegion = ['argo', 'surfaceWaves-wave'];

  const isRegionRequired = !productsWithoutRegion.includes(mainProductId);
  const isArgo = mainProductId === 'argo';
  const isCurrentMeters = mainProductId === 'currentMeters';
  const isClimatology = mainProductId === 'climatology';
  const isEACMooringArray = mainProductId === 'EACMooringArray';
  const isTidalCurrents = mainProductId === 'tidalCurrents';
  const isSealCtd = mainProductId === 'sealCtd';
  const isSealCtdTags = mainProductId === 'sealCtdTags';
  const isSurfaceWaves = mainProductId === 'surfaceWaves';
  const isSurfaceWavesBuoyTimeseries =
    mainProductId === 'surfaceWaves' && subProduct?.key === 'surfaceWaves-buoyTimeseries';

  return {
    isRegionRequired,
    isArgo,
    isCurrentMeters,
    isClimatology,
    isEACMooringArray,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isSurfaceWaves,
    isSurfaceWavesBuoyTimeseries,
  };
};

export default useProductCheck;
