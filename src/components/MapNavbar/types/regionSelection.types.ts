import { RegionScope } from '@/constants/region';

export interface RegionSelectionProps {
  onChange?: (selectedRegion: RegionScope) => void;
}

export interface RegionButtonProps {
  label: string;
  icon: string;
  selected: boolean;
}
