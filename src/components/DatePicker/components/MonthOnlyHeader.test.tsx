import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MonthOnlyHeader from './MonthOnlyHeader';

describe('MonthOnlyHeader', () => {
  it('renders the month name correctly', () => {
    const testDate = new Date(2024, 2, 15); // March 15, 2024

    render(<MonthOnlyHeader date={testDate} />);

    expect(screen.getByText('March')).toBeInTheDocument();
  });

  it('renders different months correctly', () => {
    const januaryDate = new Date(2024, 0, 1); // January 1, 2024
    const { rerender } = render(<MonthOnlyHeader date={januaryDate} />);

    expect(screen.getByText('January')).toBeInTheDocument();

    const decemberDate = new Date(2024, 11, 31); // December 31, 2024
    rerender(<MonthOnlyHeader date={decemberDate} />);

    expect(screen.getByText('December')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const testDate = new Date(2024, 5, 10); // June 10, 2024

    render(<MonthOnlyHeader date={testDate} />);

    const container = screen.getByText('June').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'justify-center');

    const textContainer = screen.getByText('June');
    expect(textContainer).toHaveClass('text-center');
  });

  it('handles edge case dates correctly', () => {
    const leapYearDate = new Date(2024, 1, 29); // February 29, 2024 (leap year)

    render(<MonthOnlyHeader date={leapYearDate} />);

    expect(screen.getByText('February')).toBeInTheDocument();
  });

  it('works with different years', () => {
    const date2023 = new Date(2023, 7, 15); // August 15, 2023
    const { rerender } = render(<MonthOnlyHeader date={date2023} />);

    expect(screen.getByText('August')).toBeInTheDocument();

    const date2025 = new Date(2025, 7, 15); // August 15, 2025
    rerender(<MonthOnlyHeader date={date2025} />);

    expect(screen.getByText('August')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const testDate = new Date(2024, 4, 20); // May 20, 2024

    const { container } = render(<MonthOnlyHeader date={testDate} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
