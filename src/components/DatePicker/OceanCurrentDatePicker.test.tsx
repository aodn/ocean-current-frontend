import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateFormat } from '@/types/date';
import { ProductID } from '@/types/product';
import { ProductMenubarText } from '@/constants/textConstant';
import OceanCurrentDatePicker from './OceanCurrentDatePicker';
import { OceanCurrentDatePickerProps } from './types/datePicker.types';

const mockProps: OceanCurrentDatePickerProps = {
  productId: 'fourHourSst-sst' as ProductID,
  dateList: [],
  selectedDate: new Date('2024-06-05'),
  dateFormat: DateFormat.DAY,
  goToPrevious: vi.fn(),
  goToNext: vi.fn(),
  onChange: vi.fn(),
  canGoPrevious: true,
  canGoNext: true,
  isDatePickerDisabled: false,
};

describe('OceanCurrentDatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders custom input with calendar icon and date text', () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} />);

    // Act
    const calendarIconImg = screen.getByLabelText('calendar icon');

    // Assert
    expect(calendarIconImg).toBeInTheDocument();
  });

  it('renders date range picker with initial dates', () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} />);

    // Act
    const selectedDate = '05 Jun 2024';

    // Assert
    expect(screen.getByText(selectedDate)).toBeInTheDocument();
  });

  it('calls "go to previous" when left button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<OceanCurrentDatePicker {...mockProps} />);
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
    render(<OceanCurrentDatePicker {...mockProps} />);
    const rightButton = screen.getAllByRole('button')[1];
    const rightButtonIcon = screen.getByAltText('right arrow icon');

    // Act
    await user.click(rightButton);

    // Assert
    expect(rightButton).toContainElement(rightButtonIcon);
    expect(mockProps.goToNext).toHaveBeenCalled();
  });

  it('disables right button when canGoNext is false', () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} canGoNext={false} />);

    // Act
    const rightButton = screen.getAllByRole('button')[1];

    // Assert
    expect(rightButton).toBeDisabled();
  });

  it('disables left button when canGoPrevious is false', () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} canGoPrevious={false} />);

    // Act
    const leftButton = screen.getAllByRole('button')[0];

    // Assert
    expect(leftButton).toBeDisabled();
  });

  it('disables date picker when isDatePickerDisabled is true', () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} isDatePickerDisabled={true} />);

    // Assert
    // The date picker is disabled but there's no visual change to test
    // This test ensures the component renders without errors when disabled
    expect(screen.getByLabelText('calendar icon')).toBeInTheDocument();
  });

  it('uses custom display text when provided', () => {
    // Arrange
    const customText = ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE;
    render(<OceanCurrentDatePicker {...mockProps} displayText={customText} />);

    // Assert
    expect(screen.getByText('1993 - latest')).toBeInTheDocument();
  });

  // New tests for the recent updates
  it('does not call goToPrevious when button is clicked but canGoPrevious is false', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<OceanCurrentDatePicker {...mockProps} canGoPrevious={false} />);
    const leftButton = screen.getAllByRole('button')[0];

    // Act
    await user.click(leftButton);

    // Assert
    expect(mockProps.goToPrevious).not.toHaveBeenCalled();
  });

  it('does not call goToNext when button is clicked but canGoNext is false', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<OceanCurrentDatePicker {...mockProps} canGoNext={false} />);
    const rightButton = screen.getAllByRole('button')[1];

    // Act
    await user.click(rightButton);

    // Assert
    expect(mockProps.goToNext).not.toHaveBeenCalled();
  });

  it('does not trigger keyboard navigation when canGoPrevious is false', async () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} canGoPrevious={false} />);

    // Act - simulate left arrow key press
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(event);

    // Assert
    expect(mockProps.goToPrevious).not.toHaveBeenCalled();
  });

  it('does not trigger keyboard navigation when canGoNext is false', async () => {
    // Arrange
    render(<OceanCurrentDatePicker {...mockProps} canGoNext={false} />);

    // Act - simulate right arrow key press
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);

    // Assert
    expect(mockProps.goToNext).not.toHaveBeenCalled();
  });

  it('renders with SealCtdTags and Year format correctly', () => {
    // Arrange
    const sealCtdProps = {
      ...mockProps,
      productId: 'sealCtdTags-timeseries' as ProductID,
      dateFormat: DateFormat.YEAR_ONLY,
    };

    // Act
    render(<OceanCurrentDatePicker {...sealCtdProps} />);

    // Assert - navigation buttons should not be visible
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('applies displayText instead of formatted date when provided', () => {
    // Arrange
    const displayText = ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE;

    // Act
    render(<OceanCurrentDatePicker {...mockProps} displayText={displayText} />);

    // Assert
    expect(screen.getByText('1993 - latest')).toBeInTheDocument();
    // The formatted date should not be present
    const formattedDate = '05 Jun 24';
    expect(screen.queryByText(formattedDate)).not.toBeInTheDocument();
  });

  it('handles both isDatePickerDisabled and displayText together', () => {
    // Arrange
    const displayText = ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE;

    // Act
    render(<OceanCurrentDatePicker {...mockProps} isDatePickerDisabled={true} displayText={displayText} />);

    // Assert
    expect(screen.getByText('1993 - latest')).toBeInTheDocument();
    // Calendar icon should be present but not clickable
    expect(screen.getByLabelText('calendar icon')).toBeInTheDocument();
  });

  it('handles sixDaySst-timeseries product scenario correctly', () => {
    // Arrange
    const sstTimeseriesProps = {
      ...mockProps,
      canGoPrevious: false,
      canGoNext: false,
      productId: 'sixDaySst-timeseries' as ProductID,
      displayText: ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE,
      isDatePickerDisabled: true,
    };

    // Act
    render(<OceanCurrentDatePicker {...sstTimeseriesProps} />);

    // Assert
    expect(screen.getByText('1993 - latest')).toBeInTheDocument();
    // Navigation buttons should be disabled but visible
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
