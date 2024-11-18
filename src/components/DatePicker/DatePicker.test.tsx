import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';

const mockProps = {
  startDate: new Date('2024-05-14'),
  endDate: new Date('2024-06-14'),
  maxDate: new Date('2024-06-15'),
  addButtonDisabled: false,
  handleDateChange: vi.fn(),
  modifyDate: vi.fn(),
  selectedDate: new Date('2024-06-05'),
  handleYearDateChange: vi.fn(),
  isSelectedDayYesterdayOrLater: false,
  isLastMonthOfTheYear: vi.fn(),
  isMonthRange: false,
  isWeekRange: false,
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

  it('calls modifyDate with "subtract" when left button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<DatePicker {...mockProps} />);
    const leftButton = screen.getAllByRole('button')[0];
    const leftButtonIcon = screen.getByAltText('left arrow icon');

    // Act
    await user.click(leftButton);

    // Assert
    expect(leftButton).toContainElement(leftButtonIcon);
    expect(mockProps.modifyDate).toHaveBeenCalledWith('subtract');
  });

  it('calls modifyDate with "add" when right button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<DatePicker {...mockProps} />);
    const rightButton = screen.getAllByRole('button')[1];
    const rightButtonIcon = screen.getByAltText('right arrow icon');

    // Act
    await user.click(rightButton);

    // Assert
    expect(rightButton).toContainElement(rightButtonIcon);
    expect(mockProps.modifyDate).toHaveBeenCalledWith('add');
  });

  it('disables right button when addButtonDisabled is true', () => {
    // Arrange
    render(<DatePicker {...mockProps} addButtonDisabled={true} />);

    // Act
    const rightButton = screen.getAllByRole('button')[1];

    // Assert
    expect(rightButton).toBeDisabled();
  });
});
