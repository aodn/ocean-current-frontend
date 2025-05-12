import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import { UseVideoCreationReturn } from '@/hooks/useVideoCreation/types/useVideoCreation.types';
import { FrameRateOption } from './videoCreation.types';

export type VideoCreationUIProps = {
  disabled?: boolean;
  showGifOptions?: boolean;
  toggleGifOptions?: () => void;
  handleFrameRateChange?: (selectedElement: DropdownElement<string>) => void;
  gifOptionsRef?: React.RefObject<HTMLDivElement>;
  frameRateOptions?: FrameRateOption[];
  videoCreationProps?: UseVideoCreationReturn;
};
