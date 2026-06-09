import { DropdownElement } from '../Dropdown/types/dropdown.types';

export interface MenuListProps<T> {
  elements: DropdownElement<T>[];
  selectedId?: T;
  showIcons?: boolean;
  onItemClick: (element: DropdownElement<T>) => void;
  testId?: string;
  /** Wider item-to-container inset (8px all round) for the product list contexts. Default is compact (4px). */
  widePadding?: boolean;
}
