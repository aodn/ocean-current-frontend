export interface DropdownElement {
  label: string;
  id: string;
  icon: string;
}

export interface DropdownProps {
  elements: DropdownElement[];
  selectedId?: string;
  onChange?: (selectedElement: DropdownElement) => void;
}
