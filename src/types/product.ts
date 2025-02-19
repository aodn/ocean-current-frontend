import { DateConfig } from './date';

interface BaseProduct {
  title: string;
  path: string;
  key: string;
  dateFormat?: DateConfig | null;
}

export interface SubProduct extends BaseProduct {
  imgPath?: string | null;
}

export interface Product extends SubProduct {
  latestEntry?: string | null;
  children?: SubProduct[];
}

export interface MainProductWithSubProduct {
  mainProduct: Product;
  subProduct: SubProduct | null;
}

export interface CombinedProduct {
  mainProduct: BaseProduct;
  subProduct: BaseProduct | null;
  combinedTitle: string;
  fullKey: string;
  fullPath: string;
}

export interface FlatProduct extends Product {
  parentId: string | null;
  latestEntry?: string | null;
}
