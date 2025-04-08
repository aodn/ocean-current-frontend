import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateFormat } from '@/types/date';
import DatePicker from './DatePicker';
import { DatePickerProps } from './types/datePicker.types';

const mockProps: DatePickerProps = {
  selectedDate: new Date('2024-06-05'),
  dateFormat: DateFormat.DAY,
  goToPrevious: vi.fn(),
  goToNext: vi.fn(),
  onChange: vi.fn(),
  isMobile: false,
};

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders custom input with calendar icon and date text', () => {
    // Arrange
    render(<DatePicker {...mockProps} />);

    // Act
    const calendarIconImg = screen.getByAltText('calendar icon');

    // Assert
    expect(calendarIconImg).toBeInTheDocument();
  });

  it('renders date range picker with initial dates', () => {
    // Arrange
    render(<DatePicker {...mockProps} />);

    // Act
    const selectedDate = '05 Jun 24';

    // Assert
    expect(screen.getByText(selectedDate)).toBeInTheDocument();
  });

  it('calls "go to previous" when left button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<DatePicker {...mockProps} />);
    const leftButton = screen.getAllByRole('button')[0];
    const leftButtonIcon = screen.getByAltText('left arrow icon');

    // Act
    await user.click(leftButton);

    // Assert
    expect(leftButton).toContainElement(leftButtonIcon);
    expect(mockProps.goToPrevious).toHaveBeenCalled();
  });

  it('calls "go to next" when right button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<DatePicker {...mockProps} />);
    const rightButton = screen.getAllByRole('button')[1];
    const rightButtonIcon = screen.getByAltText('right arrow icon');

    // Act
    await user.click(rightButton);

    // Assert
    expect(rightButton).toContainElement(rightButtonIcon);
    expect(mockProps.goToNext).toHaveBeenCalled();
  });

  it('disables right button when can go next is false', () => {
    // Arrange
    render(<DatePicker {...mockProps} canGoNext={false} />);

    // Act
    const rightButton = screen.getAllByRole('button')[1];

    // Assert
    expect(rightButton).toBeDisabled();
  });
});
