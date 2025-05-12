import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useVideoCreation, useOutsideClick } from '@/hooks';
import ActiveVideoCreation from './ActiveVideoCreation';

vi.mock('@/hooks');

describe('ActiveVideoCreation Component', () => {
  const mockVideoCreationReturnValue = {
    resetState: vi.fn(),
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useVideoCreation).mockReturnValue(mockVideoCreationReturnValue);
    vi.mocked(useOutsideClick).mockImplementation(() => {});
  });

  it('calls useVideoCreation hook', () => {
    render(<ActiveVideoCreation />);
    expect(useVideoCreation).toHaveBeenCalled();
  });

  it('toggles GIF options when clicked', () => {
    render(<ActiveVideoCreation />);
    fireEvent.click(screen.getByTestId('product-menu-bar-download-option'));
    expect(screen.getByText('Customise Gif')).toBeInTheDocument();
  });

  it('calls resetState when opening GIF options', () => {
    render(<ActiveVideoCreation />);
    fireEvent.click(screen.getByTestId('product-menu-bar-download-option'));
    expect(mockVideoCreationReturnValue.resetState).toHaveBeenCalled();
  });
});
