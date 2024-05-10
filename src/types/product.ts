interface BaseProduct {
  title: string;
  path: string;
  key: string;
}

export interface SubProduct extends BaseProduct {}

export interface Product extends SubProduct {
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
