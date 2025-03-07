export interface DropdownElement<T> {
  label: string;
  id: T;
  icon?: string;
  selectedIcon?: string;
}

export interface DropdownProps<T> {
  elements: DropdownElement<T>[];
  selectedId?: T;
  onChange?: (selectedElement: DropdownElement<T>) => void;
  header?: boolean;
  showIcons?: boolean;
  isOpen?: boolean;
  smallDropdown?: boolean;
}
