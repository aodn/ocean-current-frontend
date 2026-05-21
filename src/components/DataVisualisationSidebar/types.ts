import { ProductSidebarText } from '@/constants/textConstant';
import { ProductID, RootProductID, SubProduct } from '@/types/product';

export type ProductInfo = {
  id: string;
  summary: string | null;
  description: () => JSX.Element | null;
  title: string;
  aboutButtonText?: string;
  aboutTitle?: string;
  aboutDescription?: () => JSX.Element | null;
  childrenInfo?: {
    [childId: string]: {
      summary: string | null;
      description: () => JSX.Element | null;
      title?: string;
    };
  };
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
  subProductKey: ProductID;
  handleSubProductChange: (key: ProductID, subProductPath: string) => void;
  disabled?: boolean;
  disabledKeys?: ProductID[];
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
  mainProductKey: RootProductID;
}
