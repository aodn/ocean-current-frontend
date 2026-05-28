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
    subProduct?.key === 'sixDaySst-climatology' || subProduct?.key === 'sixDaySst-climatologyDataCount';
  const isMonthlyMeans = mainProductId === 'monthlyMeans';
  const isEACMooringArray = mainProductId === 'EACMooringArray';
  const isTidalCurrents = mainProductId === 'tidalCurrents';
  const isSealCtd = mainProductId === 'sealCtd';
  const isSealCtdTags = mainProductId === 'sealCtdTags';
  const isSurfaceWaves = mainProductId === 'surfaceWaves';
  const isSurfaceWavesWave = isSurfaceWaves && subProduct?.key === 'surfaceWaves-wave';
  const isSurfaceWavesBuoyTimeseries =
    mainProductId === 'surfaceWaves' && subProduct?.key === 'surfaceWaves-buoyTimeseries';
  const isOceanColour = mainProductId === 'oceanColour';
  const isOceanColourChlA = isOceanColour && subProduct?.key === 'oceanColour-chlA';
  const isSwotGslaMdt = subProduct?.key === 'swotGsla-mdt';

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
    isSurfaceWavesWave,
    isSurfaceWavesBuoyTimeseries,
    isOceanColour,
    isOceanColourChlA,
    isSwotGslaMdt,
  };
};

export default useProductCheck;
