import { RegionScope } from '@/constants/region';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Actions, State } from './types';

const useProductStore = create<State & Actions>()(
  devtools((set) => ({
    mainProduct: '',
    subProduct: '',
    regionScope: RegionScope.State,
    regionName: '',
    date: new Date(),
    actions: {
      setMainProduct: (product) => set({ mainProduct: product }),
      setSubProduct: (subProduct) => set({ subProduct }),
      setRegionScope: (regionScope) => set({ regionScope }),
      setRegionName: (regionName) => set({ regionName }),
      setDate: (date) => set({ date }),
    },
  })),
);

export default useProductStore;
