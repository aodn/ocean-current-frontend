export interface DropdownElement {
  label: string;
  id: string;
  icon: string;
}

export interface HourSelectorProps {
  onChange: (selectedElement: DropdownElement) => void;
  selectedId?: string;
  hours: DropdownElement[];
}
