import { Dayjs } from 'dayjs';
import { RegionScope } from '@/constants/region';

type ProductParamState = {
  mainProduct: string;
  subProduct: string | null;
  productKey: string;
  regionScope: RegionScope;
  regionName: string;
  date: Dayjs;
};

export type State = {
  productParams: ProductParamState;
};

export type Actions = {
  actions: {
    setProductData: (product: ProductParamState) => void;
    setMainProduct: (product: string) => void;
    setSubProduct: (subProduct: string | null) => void;
    setProductKey: (productKey: string) => void;
    setRegionScope: (regionScope: RegionScope) => void;
    setRegionName: (regionName: string) => void;
    setDate: (date: string) => void;
  };
};
