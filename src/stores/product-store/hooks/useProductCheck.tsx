import useProductStore from '@/stores/product-store/productStore';

const useProductCheck = () => {
  const product = useProductStore((state) => state.productParams.mainProduct);

  const productsWithoutRegion = ['argo', 'surfaceWaves'];

  const isRegionRequired = !productsWithoutRegion.includes(product);
  const isArgo = product === 'argo';

  return { isRegionRequired, isArgo };
};

export default useProductCheck;
