export interface ProductInfo {
  id: string;
  summary: string;
  description: () => JSX.Element;
  title: string;
}
