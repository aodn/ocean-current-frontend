import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RegionScope } from '@/constants/region';
import { Actions, State } from './product.types';

const initialState: State = {
  productParams: {
    productId: 'fourHourSst-sst',
    regionCode: null,
    regionScope: RegionScope.State,
    regionTitle: null,
  },
};

const useProductStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setProductData: (product) => set({ productParams: product }, false, 'setProductData'),
      setProductId: (productId) =>
        set((state) => ({ productParams: { ...state.productParams, productId } }), false, 'setProductId'),
      setRegionCode: (regionCode) =>
        set((state) => ({ productParams: { ...state.productParams, regionCode } }), false, 'setRegionCode'),
      setRegionScope: (regionScope) =>
        set((state) => ({ productParams: { ...state.productParams, regionScope } }), false, 'setRegionScope'),
      setRegionTitle: (regionTitle) =>
        set((state) => ({ productParams: { ...state.productParams, regionTitle } }), false, 'setRegionTitle'),
    },
  })),
);

export const { setProductId, setRegionScope, setRegionTitle, setRegionCode } = useProductStore.getState().actions;

export default useProductStore;
