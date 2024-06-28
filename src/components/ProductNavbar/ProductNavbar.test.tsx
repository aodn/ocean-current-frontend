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
  const mockReturnValue = {
    startDate: new Date('2024-06-13'),
    endDate: new Date('2024-06-17'),
    allDates: mockDates,
    selectedDateIndex: 0,
    handleSliderChange: vi.fn(),
    handleDateChange: vi.fn(),
    modifyDate: vi.fn(),
    steps: 1,
  };

  beforeEach(() => {
    vi.mocked(useDateRange).mockReturnValue(mockReturnValue);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponentWithRouter = () => {
    const setShowVideo = vi.fn();
    render(
      <MemoryRouter>
        <ProductNavbar setShowVideo={setShowVideo} />
      </MemoryRouter>,
    );
  };

  it('should render successfully', () => {
    renderComponentWithRouter();

    expect(screen.getByText('13 Jun 2024')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /right arrow icon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /left arrow icon/i })).toBeInTheDocument();
  });

  it('should display video creation component', () => {
    renderComponentWithRouter();

    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should display slider component with the start date', () => {
    renderComponentWithRouter();

    expect(screen.getByText('13-06')).toBeInTheDocument();
  });
});
