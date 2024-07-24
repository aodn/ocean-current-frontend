export interface ToggleButtonProps {
  isOn?: boolean;
  onToggle: (state: boolean) => void;
  disabled: boolean;
}
