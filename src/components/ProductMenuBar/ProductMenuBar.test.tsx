import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/configs/dayjs';
import { useDateRange } from '@/hooks';
import ProductMenuBar from './ProductMenuBar';

vi.mock('@/hooks/useDateRange/useDateRange');
vi.mock('@/components/VideoCreation/VideoCreation', () => {
  const MockedVideoCreation = () => <div>Download</div>;
  return { default: MockedVideoCreation };
});

describe('ProductMenuBar', () => {
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
    isWeekRange: false,
    isMonthRange: false,
    isYearRange: false,
    disableVideoCreation: () => false,
    resetDateRange: vi.fn(),
    formatDate: 'YYYYMMDD',
  };

  beforeEach(() => {
    vi.mocked(useDateRange).mockReturnValue(mockReturnValue);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponentWithRouter = () => {
    const setShowVideo = vi.fn();
    return render(
      <MemoryRouter>
        <ProductMenuBar setShowVideo={setShowVideo} />
      </MemoryRouter>,
    );
  };

  it.skip('should render successfully with correct date', () => {
    renderComponentWithRouter();
    const dateElement = screen.getByText('13 Jun 24');
    expect(dateElement).toBeInTheDocument();
  });

  it.skip('should display navigation arrows', () => {
    renderComponentWithRouter();
    const rightArrow = screen.getByRole('button', { name: /right arrow icon/i });
    const leftArrow = screen.getByRole('button', { name: /left arrow icon/i });
    expect(rightArrow).toBeInTheDocument();
    expect(leftArrow).toBeInTheDocument();
  });

  it.skip('should display video creation component', () => {
    renderComponentWithRouter();
    const downloadElement = screen.getByText('Download');
    expect(downloadElement).toBeInTheDocument();
  });
});
