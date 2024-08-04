import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDateRange } from '@/hooks';
import useProductStore from '@/stores/product-store/productStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { Product } from '@/types/product';
import VideoCreation from './VideoCreation';

vi.mock('@/hooks');
vi.mock('@/stores/product-store/productStore');
vi.mock('@/stores/product-store/hooks/useProductConvert');
vi.mock('gifshot', () => ({
  default: {
    createGIF: vi.fn(),
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
  beforeEach(() => {
    // Arrange
    const mockDates = [
      { date: new Date('2024-06-13'), active: true, showLabel: true },
      { date: new Date('2024-06-14'), active: true, showLabel: false },
      { date: new Date('2024-06-15'), active: false, showLabel: false },
      { date: new Date('2024-06-16'), active: true, showLabel: false },
      { date: new Date('2024-06-17'), active: true, showLabel: true },
    ];

    const mockReturnValue = {
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
      isYearRange: false,
      isMonthlyMeansClimatology: false,
      resetDateRange: vi.fn(),
    };

    vi.mocked(useDateRange).mockReturnValue(mockReturnValue);
    vi.mocked(useProductStore).mockReturnValue('surfaceWaves');
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'climatology', title: 'Climatology', path: '/climatology' } as Product,
      subProduct: null,
      subProducts: [],
    });
  });

  it('renders the download button', () => {
    render(<VideoCreation />);
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('opens the GIF options when download button is clicked', () => {
    render(<VideoCreation />);
    openGifOptions();
    expect(screen.getByText('Customize Video')).toBeInTheDocument();
  });

  it('updates frame rate when changed', async () => {
    render(<VideoCreation />);
    openGifOptions();
    await selectDropdownOption('3 frames', '5 frames');
    expect(screen.getByText('5 frames')).toBeInTheDocument();
  });

  it('disables download button when loading', async () => {
    render(<VideoCreation />);
    openGifOptions();

    const downloadButton = screen.getByText('Download Video');
    fireEvent.click(downloadButton);

    expect(downloadButton).toBeDisabled();
  });
});
