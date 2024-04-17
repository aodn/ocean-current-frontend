import { RegionScope } from '@/constants/region';

export type State = {
  mainProduct: string;
  subProduct: string | null;
  productKey: string;
  regionScope: RegionScope;
  regionName: string;
  date: Date;
};

export type Actions = {
  actions: {
    setMainProduct: (product: string) => void;
    setSubProduct: (subProduct: string | null) => void;
    setProductKey: (productKey: string) => void;
    setRegionScope: (regionScope: RegionScope) => void;
    setRegionName: (regionName: string) => void;
    setDate: (date: Date) => void;
  };
};
