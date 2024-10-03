import { useSearchParams } from 'react-router-dom';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { CurrentMeterPlot } from '@/types/currentMeters';

const useProductCheck = () => {
  const [searchParams] = useSearchParams();
  const currentMeterPlots = searchParams.get('plot');
  const mainProduct = useProductConvert();

  const mainProductId = mainProduct?.mainProduct?.key || '';

  const productsWithoutRegion = ['argo', 'surfaceWaves'];

  const isRegionRequired = !productsWithoutRegion.includes(mainProductId);
  const isArgo = mainProductId === 'argo';
  const isCurrentMeters = mainProductId === 'currentMeters';
  const isCurrentMetersPlot = currentMeterPlots === CurrentMeterPlot.One;

  return { isRegionRequired, isArgo, isCurrentMeters, isCurrentMetersPlot };
};

export default useProductCheck;
