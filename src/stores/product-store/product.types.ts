import { RegionScope } from '@/constants/region';

type ProductParamState = {
  productId: string;
  regionScope: RegionScope;
  regionTitle: string;
};

export type State = {
  productParams: ProductParamState;
};

export type Actions = {
  actions: {
    setProductData: (product: ProductParamState) => void;
    setProductId: (productId: string) => void;
    setRegionScope: (regionScope: RegionScope) => void;
    setRegionTitle: (regionTitle: string) => void;
  };
};
