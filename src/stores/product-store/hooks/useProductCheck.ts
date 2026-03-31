import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const useProductCheck = () => {
  const { mainProduct, subProduct } = useProductConvert();

  const mainProductId = mainProduct?.key || '';

  const productsWithoutRegion = ['argo', 'surfaceWaves-wave'];

  const isRegionRequired = !productsWithoutRegion.includes(mainProductId);
  const isArgo = mainProductId === 'argo';
  const isCurrentMeters = mainProductId === 'currentMeters';
  const isCurrentMetersMooredInstrumentArray =
    mainProductId === 'currentMeters' && subProduct?.key === 'currentMeters-mooredInstrumentArray';
  const isClimatology =
    subProduct?.key === 'sixDaySst-climatologySst' || subProduct?.key === 'sixDaySst-climatologyDataCount';
  const isMonthlyMeans = mainProductId === 'monthlyMeans';
  const isEACMooringArray = mainProductId === 'EACMooringArray';
  const isTidalCurrents = mainProductId === 'tidalCurrents';
  const isSealCtd = mainProductId === 'sealCtd';
  const isSealCtdTags = mainProductId === 'sealCtdTags';
  const isSurfaceWaves = mainProductId === 'surfaceWaves';
  const isSurfaceWavesBuoyTimeseries =
    mainProductId === 'surfaceWaves' && subProduct?.key === 'surfaceWaves-buoyTimeseries';
  const isOceanColour = mainProductId === 'oceanColour';
  const isOceanColourChlA = isOceanColour && subProduct?.key === 'oceanColour-chlA';

  return {
    isRegionRequired,
    isArgo,
    isCurrentMeters,
    isCurrentMetersMooredInstrumentArray,
    isClimatology,
    isMonthlyMeans,
    isEACMooringArray,
    isTidalCurrents,
    isSealCtd,
    isSealCtdTags,
    isSurfaceWaves,
    isSurfaceWavesBuoyTimeseries,
    isOceanColour,
    isOceanColourChlA,
  };
};

export default useProductCheck;
