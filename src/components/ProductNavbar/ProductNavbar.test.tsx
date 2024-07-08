import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/configs/dayjs';
import useDateRange from '@/hooks/useDateRange/useDateRange';
import ProductNavbar from './ProductNavbar';

vi.mock('@/hooks/useDateRange/useDateRange');
vi.mock('@/components/VideoCreation/VideoCreation', () => {
  const MockedVideoCreation = () => <div>Download</div>;
  return { default: MockedVideoCreation };
});

describe('ProductNavbar', () => {
  const mockDates = [
    { date: new Date('2024-06-13'), active: true },
    { date: new Date('2024-06-14'), active: true },
    { date: new Date('2024-06-15'), active: false },
    { date: new Date('2024-06-16'), active: true },
    { date: new Date('2024-06-17'), active: true },
  ];

  const hoursRange = [
    { id: '1', icon: 'icon1', value: '00:00', label: '00:00' },
    { id: '2', icon: 'icon2', value: '01:00', label: '01:00' },
    { id: '3', icon: 'icon3', value: '02:00', label: '02:00' },
    { id: '4', icon: 'icon4', value: '03:00', label: '03:00' },
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
    showHourSelector: false,
    handleHourChange: vi.fn(),
    selectedHour: '00:00',
    hoursRange,
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
        <ProductNavbar setShowVideo={setShowVideo} />
      </MemoryRouter>,
    );
  };

  it('should render successfully with correct date', () => {
    // Arrange
    renderComponentWithRouter();

    // Act
    const dateElement = screen.getByText('13 Jun 2024');

    // Assert
    expect(dateElement).toBeInTheDocument();
  });

  it('should display navigation arrows', () => {
    // Arrange
    renderComponentWithRouter();

    // Act
    const rightArrow = screen.getByRole('button', { name: /right arrow icon/i });
    const leftArrow = screen.getByRole('button', { name: /left arrow icon/i });

    // Assert
    expect(rightArrow).toBeInTheDocument();
    expect(leftArrow).toBeInTheDocument();
  });

  it('should display video creation component', () => {
    // Arrange
    renderComponentWithRouter();

    // Act
    const downloadElement = screen.getByText('Download');

    // Assert
    expect(downloadElement).toBeInTheDocument();
  });

  it('should display slider component with the start date', () => {
    // Arrange
    renderComponentWithRouter();

    // Act
    const sliderDate = screen.getByText('13-06');

    // Assert
    expect(sliderDate).toBeInTheDocument();
  });
});
