export interface Product {
  title: string;
  value: string;
  path: string;
  children?: Product[];
}
