export interface DropdownElement {
  label: string;
  id: string;
  icon: string;
}

export interface DropdownProps {
  elements: DropdownElement[];
  initialSelectedId?: string;
  onChange?: (selectedElement: DropdownElement) => void;
}
