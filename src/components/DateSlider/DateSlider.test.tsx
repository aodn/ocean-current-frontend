import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateSlider from './DateSlider';
import { DateSliderProps } from './types/dateSlider.types';

const mockDates = [
  new Date('2024-05-12'),
  new Date('2024-05-13'),
  new Date('2024-05-14'),
  new Date('2024-05-15'),
  new Date('2024-05-16'),
  new Date('2024-05-17'),
  new Date('2024-05-18'),
  new Date('2024-05-19'),
  new Date('2024-05-20'),
  new Date('2024-05-21'),
];

const renderComponent = (props: Partial<DateSliderProps> = {}) => {
  const defaultProps: DateSliderProps = {
    allDates: mockDates,
    selectedDateIndex: 2,
    handleSliderChange: vi.fn(),
    steps: 1,
  };
  return render(<DateSlider {...defaultProps} {...props} />);
};

describe('DateSlider Component', () => {
  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('slider-base')).toBeInTheDocument();
  });

  it('displays the first date label (05-12)', () => {
    renderComponent();

    const label = screen.getByText('12-05');
    expect(label).toBeInTheDocument();
  });

  it('displays the 1st and 8th date labels', () => {
    renderComponent();

    const label1st = screen.getByText('12-05');
    const label8th = screen.getByText('19-05');

    expect(label1st).toBeInTheDocument();
    expect(label8th).toBeInTheDocument();
  });

  it('does not display the date label between 1st and 8th', () => {
    renderComponent();

    const dateLabelNotToDisplay = ['13-05', '14-05', '15-05', '16-05', '17-05', '18-05'];

    dateLabelNotToDisplay.forEach((date) => {
      expect(screen.queryByText(date)).not.toBeInTheDocument();
    });
  });

  it('calls handleSliderChange when the slider value changes', async () => {
    const handleSliderChange = vi.fn();
    renderComponent({ handleSliderChange });

    const slider = screen.getByTestId('slider-base');
    await userEvent.click(slider);

    expect(handleSliderChange).toHaveBeenCalled();
  });

  it('renders with different step values', () => {
    renderComponent({ steps: 2 });

    const slider = screen.getByTestId('slider-base');

    expect(slider).toBeInTheDocument();
  });

  it('does not render the slider if allDates is empty', () => {
    renderComponent({ allDates: [] });

    expect(screen.queryByTestId('slider-base')).not.toBeInTheDocument();
  });
});
