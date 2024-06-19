import { RegionScope } from '@/constants/region';

type ProductParamState = {
  productId: string;
  // mainProduct: string;
  // subProduct: string | null;
  // productKey: string;
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
    // setMainProduct: (product: string) => void;
    // setSubProduct: (subProduct: string | null) => void;
    // setProductKey: (productKey: string) => void;
    setRegionScope: (regionScope: RegionScope) => void;
    setRegionTitle: (regionTitle: string) => void;
  };
};
