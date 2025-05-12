import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useVideoCreation } from '@/hooks';
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

const clickDownloadOption = () => {
  fireEvent.click(screen.getByTestId('product-menu-bar-download-option'));
};

const selectDropdownOption = async (dropdownText: string, optionText: string) => {
  const dropdown = screen.getByText(dropdownText);
  fireEvent.click(dropdown);
  const option = await screen.findByText(optionText);
  fireEvent.click(option);
};

describe('VideoCreation Factory Component', () => {
  const mockVideoCreationReturnValue = {
    isLoading: false,
    progress: 0,
    errorMessage: '',
    selectedFrameRate: 3,
    gifWidth: 500,
    gifHeight: 500,
    startDate: new Date('2024-06-13'),
    endDate: new Date('2024-06-17'),
    handleGifDownload: vi.fn(),
    handleWidthChange: vi.fn(),
    handleHeightChange: vi.fn(),
    setSelectedFrameRate: vi.fn(),
    setGifWidth: vi.fn(),
    setGifHeight: vi.fn(),
    handleStartDateChange: vi.fn(),
    handleEndDateChange: vi.fn(),
    resetState: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useVideoCreation).mockReturnValue(mockVideoCreationReturnValue);
  });

  it('renders the download button', () => {
    render(<VideoCreation />);
    expect(screen.getByTestId('product-menu-bar-download-option')).toBeInTheDocument();
  });

  it('should be visibly disabled if disabled is true', () => {
    render(<VideoCreation disabled={true} />);
    expect(screen.getByTestId('product-menu-bar-download-option')).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('should not open GIF options if download option is disabled', () => {
    render(<VideoCreation disabled={true} />);
    clickDownloadOption();
    expect(screen.queryByText('Customise Gif')).not.toBeInTheDocument();
  });

  it('opens the GIF options when enabled and clicked', () => {
    render(<VideoCreation />);
    clickDownloadOption();
    expect(screen.getByText('Customise Gif')).toBeInTheDocument();
  });

  it('updates frame rate when changed', async () => {
    render(<VideoCreation />);
    clickDownloadOption();
    await selectDropdownOption('3 seconds', '5 seconds');
    expect(screen.getByText('5 seconds')).toBeInTheDocument();
  });

  it('does not call useVideoCreation hook when disabled', () => {
    render(<VideoCreation disabled={true} />);
    expect(useVideoCreation).not.toHaveBeenCalled();
  });

  it('calls useVideoCreation hook when enabled', () => {
    render(<VideoCreation />);
    expect(useVideoCreation).toHaveBeenCalled();
  });
});
