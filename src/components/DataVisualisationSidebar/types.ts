import { ProductSidebarText } from '@/constants/textConstant';
import { SubProduct } from '@/types/product';

export type ProductInfo = {
  id: string;
  summary: string;
  description: () => JSX.Element;
  title: string;
};

export interface ProductSummaryProp {
  productInfo: ProductInfo;
}

export interface CollapsibleSectionProps {
  title: ProductSidebarText;
  children: JSX.Element | JSX.Element[];
}

export interface SubProductOptionsProps {
  subProducts: SubProduct[];
  subProductKey: string;
  handleSubProductChange: (key: string, subProductPath: string) => void;
}

export type DataSource = {
  title: string;
  link: string;
  product: string[];
};

export interface DataSourcesProps {
  filteredDataSources: DataSource[];
}
export interface ProductDropdownProps {
  mainProductKey: string;
}
