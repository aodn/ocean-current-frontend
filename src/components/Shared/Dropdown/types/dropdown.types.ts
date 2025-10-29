import { IconProps } from '../../Icons';

export interface DropdownElement<T> {
  label: string;
  id: T;
  icon?: string;
  Icon?: React.FC<IconProps>;
  SelectedIcon?: React.FC<IconProps>;
  selectedIcon?: string;
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
}
