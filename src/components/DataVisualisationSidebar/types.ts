import { ProductSidebarText } from '@/constants/textConstant';
import { SubProduct } from '@/types/product';
import { DropdownElement } from '../Shared/Dropdown/types/dropdown.types';

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

export interface CollapsibleSectionProps {
  title: ProductSidebarText;
  children: JSX.Element | JSX.Element[];
}

export interface SubProductOptionsProps {
  isCurrentMeters: boolean;
  subProducts: SubProduct[];
  subProductKey: string;
  mainProductPath: string;
}

export type DataSource = {
  title: string;
  link: string;
  product: string[];
};

export interface DataSourcesProps {
  filteredDataSources: DataSource[];
}
export interface SidebarProductDropdownProps {
  mainProductKey: string;
  handleDropdownChange: ({ id }: DropdownElement) => void;
}
