interface BaseProduct {
  title: string;
  path: string;
  key: string;
}

export interface SubProduct extends BaseProduct {}

export interface Product extends SubProduct {
  children?: SubProduct[];
}

export interface CombinedProduct {
  mainProduct: BaseProduct;
  subProduct: BaseProduct | null; // 'null' indicates no sub-product is present
  combinedTitle: string;
  fullKey: string;
  fullPath: string;
}
