export interface DropdownButtonProps {
  label: string;
  items: string[];
  onSelect: (item: string[]) => void;
}

export interface SelectedItemsState {
  [key: string]: boolean;
}
