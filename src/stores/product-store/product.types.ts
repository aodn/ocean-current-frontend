import { RegionScope } from '@/constants/region';
import { ProductID } from '@/types/product';

type ProductParamState = {
  productId: ProductID;
  regionScope: RegionScope;
  regionTitle: string;
};

export type State = {
  productParams: ProductParamState;
};

export type Actions = {
  actions: {
    setProductData: (product: ProductParamState) => void;
    setProductId: (productId: ProductID) => void;
    setRegionScope: (regionScope: RegionScope) => void;
    setRegionTitle: (regionTitle: string) => void;
  };
};
