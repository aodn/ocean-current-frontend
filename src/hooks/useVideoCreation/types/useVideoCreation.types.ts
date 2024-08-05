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
  handleClick: () => Promise<void>;
  setSelectedFrameRate: (rate: number) => void;
  setGifWidth: (width: number) => void;
  setGifHeight: (height: number) => void;
  handleStartDateChange: (date: Date) => void;
  handleEndDateChange: (date: Date) => void;
};
