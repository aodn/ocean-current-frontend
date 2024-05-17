import useProductStore from '@/stores/product-store/productStore';

const useProductCheck = () => {
  const mainProduct = useProductStore((state) => state.productParams.mainProduct);

  const productsWithoutRegion = ['argo', 'surfaceWaves'];

  const isRegionRequired = !productsWithoutRegion.includes(mainProduct);
  const isArgo = mainProduct === 'argo';

  return { isRegionRequired, isArgo };
};

export default useProductCheck;
