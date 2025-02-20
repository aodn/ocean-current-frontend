export type ProductInfo = {
  id: string;
  summary: string;
  description: () => JSX.Element;
  title: string;
};

export interface ProductSummaryProp {
  isArgo: boolean;
  productInfo: ProductInfo;
}
