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
};

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders custom input with calendar icon and date text', () => {
    render(<DatePicker {...mockProps} />);

    const calendarIconImg = screen.getByAltText('calendar icon');
    const dateText = screen.getByText('Date');

    expect(calendarIconImg).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
  });

  it('renders date range picker with initial dates', () => {
    render(<DatePicker {...mockProps} />);

    const selectedDate = '05 Jun 2024';

    expect(screen.getByText(selectedDate)).toBeInTheDocument();
  });

  it('calls modifyDate with "subtract" when left button is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...mockProps} />);
    const leftButton = screen.getAllByRole('button')[0];
    const leftButtonIcon = screen.getByAltText('left arrow icon');
    expect(leftButton).toContainElement(leftButtonIcon);

    await user.click(leftButton);

    expect(mockProps.modifyDate).toHaveBeenCalledWith('subtract');
  });

  it('calls modifyDate with "add" when right button is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...mockProps} />);

    const rightButton = screen.getAllByRole('button')[1];
    const rightButtonIcon = screen.getByAltText('right arrow icon');
    expect(rightButton).toContainElement(rightButtonIcon);

    await user.click(rightButton);

    expect(mockProps.modifyDate).toHaveBeenCalledWith('add');
  });

  it('disables right button when addButtonDisabled is true', () => {
    render(<DatePicker {...mockProps} addButtonDisabled={true} />);

    const rightButton = screen.getAllByRole('button')[1];
    expect(rightButton).toBeDisabled();
  });
});
