import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import DateSelector from './DateSelector';

describe('DateSelector Component', () => {
  const testDate = dayjs('20230430');
  let subtractDayMock: () => void;
  let addDayMock: () => void;

  beforeEach(() => {
    subtractDayMock = vi.fn();
    addDayMock = vi.fn();
    render(<DateSelector date={testDate} subtractDay={subtractDayMock} addDay={addDayMock} />);
  });

  afterEach(cleanup);

  it('should display the correct date', () => {
    // Act
    const dateDisplay = screen.getByText(testDate.format('DD MMM YYYY'));

    // Assert
    expect(dateDisplay).toBeInTheDocument();
  });

  it('should call subtractDay when the left button is clicked', async () => {
    // Arrange
    const leftButton = screen.getByRole('button', { name: /right arrow icon/i });

    // Act
    await userEvent.click(leftButton);

    // Assert
    expect(subtractDayMock).toHaveBeenCalledTimes(1);
  });

  it('should call addDay when the right button is clicked', async () => {
    // Arrange
    const rightButton = screen.getByRole('button', { name: /left arrow icon/i });

    // Act
    await userEvent.click(rightButton);

    // Assert
    expect(addDayMock).toHaveBeenCalledTimes(1);
  });
});
