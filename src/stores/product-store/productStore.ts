import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RegionScope } from '@/constants/region';
import { Actions, State } from './product.types';

const initialState: State = {
  productParams: {
    mainProduct: '',
    subProduct: null,
    productKey: '',
    regionScope: RegionScope.State,
    regionName: '',
    date: new Date().toLocaleString(),
  },
};

const useProductStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setProductData: (product) => set({ productParams: product }, false, 'setProductData'),
      setMainProduct: (mainProduct) =>
        set((state) => ({ productParams: { ...state.productParams, mainProduct } }), false, 'setMainProduct'),
      setSubProduct: (subProduct) =>
        set((state) => ({ productParams: { ...state.productParams, subProduct } }), false, 'setSubProduct'),
      setRegionScope: (regionScope) =>
        set((state) => ({ productParams: { ...state.productParams, regionScope } }), false, 'setRegionScope'),
      setRegionName: (regionName) =>
        set((state) => ({ productParams: { ...state.productParams, regionName } }), false, 'setRegionName'),
      setDate: (date) => set((state) => ({ productParams: { ...state.productParams, date } }), false, 'setDate'),
    },
  })),
);

export const { setMainProduct, setSubProduct, setRegionScope, setRegionName, setDate } =
  useProductStore.getState().actions;

export default useProductStore;
