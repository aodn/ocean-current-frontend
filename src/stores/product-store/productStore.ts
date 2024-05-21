import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import { RegionScope } from '@/constants/region';
import { combinedProducts } from '@/utils/product';
import { Actions, State } from './product.types';

const initialState: State = {
  productParams: {
    mainProduct: '',
    subProduct: null,
    productKey: '',
    regionScope: RegionScope.State,
    regionTitle: '',
    date: dayjs().subtract(1, 'day'),
  },
};

const useProductStore = create<State & Actions>()(
  devtools((set, get) => ({
    ...initialState,
    actions: {
      setProductData: (product) => set({ productParams: product }, false, 'setProductData'),
      setProductKey: (productKey) => {
        const foundProduct = combinedProducts.find((product) => product.fullKey === productKey);

        if (!foundProduct) {
          throw new Error(`Invalid product key: ${productKey}`);
        }
        const { mainProduct, subProduct } = foundProduct;

        set(
          (state) => ({
            productParams: {
              ...state.productParams,
              productKey,
            },
          }),
          false,
          'setProductKey',
        );
        get().actions.setMainProduct(mainProduct.key);
        get().actions.setSubProduct(subProduct?.key || null);
      },
      setMainProduct: (mainProduct) =>
        set((state) => ({ productParams: { ...state.productParams, mainProduct } }), false, 'setMainProduct'),
      setSubProduct: (subProduct) =>
        set((state) => ({ productParams: { ...state.productParams, subProduct } }), false, 'setSubProduct'),
      setRegionScope: (regionScope) =>
        set((state) => ({ productParams: { ...state.productParams, regionScope } }), false, 'setRegionScope'),
      setRegionTitle: (regionTitle) =>
        set(
          (state) => ({ productParams: { ...state.productParams, regionTitle: regionTitle } }),
          false,
          'setRegionTitle',
        ),
      setDate: (date) => set((state) => ({ productParams: { ...state.productParams, date } }), false, 'setDate'),
    },
  })),
);

export const { setMainProduct, setSubProduct, setProductKey, setRegionScope, setRegionTitle, setDate } =
  useProductStore.getState().actions;

export default useProductStore;
