import { useEffect, useRef, useState } from 'react';
import { useOutsideClick, useVideoCreation } from '@/hooks';
import { DropdownElement } from '../Shared/Dropdown/types/dropdown.types';
import { FrameRateOption } from './types/videoCreation.types';
import VideoCreationUI from './VideoCreationUI';

const ActiveVideoCreation: React.FC = () => {
  const gifOptionsRef = useRef<HTMLDivElement>(null);
  const [showGifOptions, setShowGifOptions] = useState<boolean>(false);

  const videoCreationProps = useVideoCreation();
  const { resetState, setSelectedFrameRate } = videoCreationProps;

  useOutsideClick(gifOptionsRef, () => setShowGifOptions(false));

  const toggleGifOptions = (): void => {
    setShowGifOptions(!showGifOptions);
    if (!showGifOptions) {
      resetState();
    }
  };

  useEffect(() => {
    if (showGifOptions) {
      resetState();
    }
  }, [resetState, showGifOptions]);

  const frameRateOptions: FrameRateOption[] = Array.from({ length: 10 }, (_, i) => i + 1).map((rate) => ({
    id: rate.toString(),
    label: `${rate} seconds`,
  }));

  const handleFrameRateChange = (selectedElement: DropdownElement<string>): void => {
    setSelectedFrameRate(Number(selectedElement.id));
  };

  return (
    <VideoCreationUI
      gifOptionsRef={gifOptionsRef}
      showGifOptions={showGifOptions}
      toggleGifOptions={toggleGifOptions}
      handleFrameRateChange={handleFrameRateChange}
      frameRateOptions={frameRateOptions}
      videoCreationProps={videoCreationProps}
    />
  );
};

export default ActiveVideoCreation;
