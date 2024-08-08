import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDateRange, useVideoCreation } from '@/hooks';
import useProductStore from '@/stores/product-store/productStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { Product } from '@/types/product';
import VideoCreation from './VideoCreation';

vi.mock('@/hooks');
vi.mock('@/stores/product-store/productStore');
vi.mock('@/stores/product-store/hooks/useProductConvert');
vi.mock('gifshot', () => ({
  default: {
    createGIF: vi.fn((_, callback) => {
      callback({
        error: false,
        errorCode: '',
        errorMsg: '',
        image: 'mock-gif-data-url',
        cameraStream: null,
        videoElement: null,
        webcamVideoElement: null,
        savedRenderingContexts: [],
        savedCameraStream: null,
      });
    }),
  },
}));

const openGifOptions = () => {
  fireEvent.click(screen.getByText('Download'));
};

const selectDropdownOption = async (dropdownText: string, optionText: string) => {
  const dropdown = screen.getByText(dropdownText);
  fireEvent.click(dropdown);
  const option = await screen.findByText(optionText);
  fireEvent.click(option);
};

describe('VideoCreation', () => {
  const mockDates = [
    { date: new Date('2024-06-13'), active: true, showLabel: true },
    { date: new Date('2024-06-14'), active: true, showLabel: false },
    { date: new Date('2024-06-15'), active: false, showLabel: false },
    { date: new Date('2024-06-16'), active: true, showLabel: false },
    { date: new Date('2024-06-17'), active: true, showLabel: true },
  ];

  const mockDateRangeReturnValue = {
    startDate: new Date('2024-06-13'),
    endDate: new Date('2024-06-17'),
    allDates: mockDates,
    selectedDateIndex: 0,
    handleSliderChange: vi.fn(),
    handleDateChange: vi.fn(),
    modifyDate: vi.fn(),
    handleYearDateChange: vi.fn(),
    isSelectedDayYesterdayOrLater: () => false,
    isLastMonthOfTheYear: vi.fn(),
    steps: 1,
    isFourHourSst: false,
    isSurfaceWaves: false,
    isYearRange: false,
    disableVideoCreation: () => false,
    resetDateRange: vi.fn(),
  };

  const mockVideoCreationReturnValue = {
    isLoading: false,
    progress: 0,
    errorMessage: '',
    selectedFrameRate: 3,
    gifWidth: 500,
    gifHeight: 500,
    startDate: new Date('2024-06-13'),
    endDate: new Date('2024-06-17'),
    handleClick: vi.fn(),
    setSelectedFrameRate: vi.fn(),
    setGifWidth: vi.fn(),
    setGifHeight: vi.fn(),
    handleStartDateChange: vi.fn(),
    handleEndDateChange: vi.fn(),
  };

  beforeEach(() => {
    // Arrange
    vi.mocked(useDateRange).mockReturnValue(mockDateRangeReturnValue);
    vi.mocked(useVideoCreation).mockReturnValue(mockVideoCreationReturnValue);
    vi.mocked(useProductStore).mockReturnValue('surfaceWaves');
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'climatology', title: 'Climatology', path: '/climatology' } as Product,
      subProduct: null,
      subProducts: [],
    });
  });

  it('renders the download button', () => {
    // Arrange
    render(<VideoCreation />);

    // Act & Assert
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('opens the GIF options when download button is clicked', () => {
    // Arrange
    render(<VideoCreation />);

    // Act
    openGifOptions();

    // Assert
    expect(screen.getByText('Customise Gif')).toBeInTheDocument();
  });

  it('updates frame rate when changed', async () => {
    // Arrange
    render(<VideoCreation />);
    openGifOptions();

    // Act
    await selectDropdownOption('3 frames', '5 frames');

    // Assert
    expect(screen.getByText('5 frames')).toBeInTheDocument();
  });

  it('disables download button when loading', async () => {
    // Arrange
    const { rerender } = render(<VideoCreation />);
    openGifOptions();
    let downloadButton = screen.getByText('Download Video');

    // Act & Assert
    expect(downloadButton).not.toBeDisabled();

    // Arrange
    vi.mocked(useVideoCreation).mockReturnValue({
      ...mockVideoCreationReturnValue,
      isLoading: true,
    });

    // Act
    rerender(<VideoCreation />);
    downloadButton = screen.getByText('Download Video');

    // Assert
    expect(downloadButton).toBeDisabled();
  });
});
