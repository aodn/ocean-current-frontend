import { IconProps } from '../../Icons';

export interface DropdownElement<T> {
  label: string;
  id: T;
  Icon?: React.FC<IconProps>;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface DropdownProps<T> {
  elements: DropdownElement<T>[];
  selectedId?: T;
  onChange?: (selectedElement: DropdownElement<T>) => void | Promise<void>;
  header?: boolean;
  showIcons?: boolean;
  isOpen?: boolean;
  smallDropdown?: boolean;
  toggleBorder?: boolean;
  menuBorder?: boolean;
  menuShadow?: boolean;
  /** Wider menu item inset, for the product list (forwarded to MenuList's `widePadding`). */
  widePaddingMenu?: boolean;
  /** data-testid for the toggle button, e.g. for E2E tests to open the dropdown. */
  toggleTestId?: string;
}
