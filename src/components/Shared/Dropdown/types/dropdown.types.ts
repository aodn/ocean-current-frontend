export interface DropdownElement<T> {
  label: string;
  id: T;
  icon?: string;
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
