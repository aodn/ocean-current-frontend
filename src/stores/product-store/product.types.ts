import { RegionScope } from '@/constants/region';
import { ProductID } from '@/types/product';

type ProductParamState = {
  productId: ProductID;
  regionCode: string | null;
  regionScope: RegionScope;
  regionTitle: string;
};

export type State = {
  productParams: ProductParamState;
  isProductImageLoading: boolean;
};

export type Actions = {
  actions: {
    setProductData: (product: ProductParamState) => void;
    setProductId: (productId: ProductID) => void;
    setRegionCode: (regionCode: string) => void;
    setRegionScope: (regionScope: RegionScope) => void;
    setRegionTitle: (regionTitle: string) => void;
    setIsProductImageLoading: (isLoading: boolean) => void;
  };
};
