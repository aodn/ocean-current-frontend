export type DateObject = {
  date: Date;
  active: boolean;
  showLabel: boolean;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export type UseVideoCreationReturn = {
  isLoading: boolean;
  progress: number;
  errorMessage: string;
  selectedFrameRate: number;
  gifWidth: number;
  gifHeight: number;
  startDate: Date;
  endDate: Date;
  handleGifDownload: () => Promise<void>;
  setSelectedFrameRate: (rate: number) => void;
  setGifWidth: (width: number) => void;
  setGifHeight: (height: number) => void;
  handleStartDateChange: (date: Date) => void;
  handleEndDateChange: (date: Date) => void;
  resetState: () => void;
  handleWidthChange: (newWidth: number) => void;
  handleHeightChange: (newHeight: number) => void;
};
