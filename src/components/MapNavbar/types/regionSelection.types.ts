import { RegionScope } from '@/constants/region';

export interface RegionSelectionProps {
  onChange?: (selectedRegion: RegionScope) => void;
}

export interface RegionButtonProps {
  key: RegionScope;
  label: string;
  icon: string;
  selected: boolean;
}
