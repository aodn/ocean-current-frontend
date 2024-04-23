import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RegionScope } from '@/constants/region';
import { combinedProducts } from '@/utils/product';
import { Actions, State } from './product.types';

const useProductStore = create<State & Actions>()(
  devtools((set, get) => ({
    mainProduct: '',
    subProduct: null,
    productKey: '',
    regionScope: RegionScope.State,
    regionName: '',
    date: new Date().toLocaleString(),
    actions: {
      setMainProduct: (product) => set({ mainProduct: product }, false, 'setMainProduct'),
      setSubProduct: (subProduct) => set({ subProduct }, false, 'setSubProduct'),
      setProductKey: (productKey) => {
        const foundProduct = combinedProducts.find((product) => product.fullKey === productKey);

        if (!foundProduct) {
          throw new Error(`Invalid product key: ${productKey}`);
        }
        const { mainProduct, subProduct } = foundProduct;

        set({ productKey }, false, 'setProductKey');
        get().actions.setMainProduct(mainProduct.key);
        get().actions.setSubProduct(subProduct?.key || null);
      },
      setRegionScope: (regionScope) => set({ regionScope }),
      setRegionName: (regionName) => set({ regionName }),
      setDate: (date) => set({ date }, false, 'setDate'),
    },
  })),
);

export const { setMainProduct, setSubProduct, setProductKey, setRegionScope, setRegionName, setDate } =
  useProductStore.getState().actions;

export default useProductStore;
