import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Slider from './Slider';
import { SliderProps } from './types/slider.types';

const mockProps: SliderProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  onChange: vi.fn(),
  labelFormatter: (value) => `${value}%`,
  allDates: [
    { date: new Date('2024-05-12'), active: true, showLabel: true },
    { date: new Date('2024-05-13'), active: false, showLabel: false },
    { date: new Date('2024-05-14'), active: true, showLabel: false },
    { date: new Date('2024-05-15'), active: true, showLabel: false },
    { date: new Date('2024-05-16'), active: false, showLabel: false },
    { date: new Date('2024-05-17'), active: true, showLabel: false },
    { date: new Date('2024-05-18'), active: true, showLabel: false },
    { date: new Date('2024-05-19'), active: false, showLabel: true },
    { date: new Date('2024-05-20'), active: true, showLabel: false },
    { date: new Date('2024-05-21'), active: true, showLabel: false },
  ],
};

describe('Slider Component', () => {
  it('renders correctly', () => {
    // Arrange
    const { getByTestId } = render(<Slider {...mockProps} />);

    // Assert
    expect(getByTestId('slider-base')).toBeInTheDocument();
    expect(getByTestId('slider-thumb')).toBeInTheDocument();
  });

  it('calls onChange with the correct value when dragged', () => {
    // Arrange
    const onChangeMock = vi.fn();
    const { getByTestId } = render(<Slider {...mockProps} onChange={onChangeMock} />);
    const sliderBase = getByTestId('slider-base');

    // Act
    fireEvent.mouseDown(sliderBase, { clientX: 0 });
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);

    // Assert
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Number));
  });

  it('shows the tooltip when dragging', () => {
    // Arrange
    const { getByTestId, getByText } = render(<Slider {...mockProps} />);
    const sliderBase = getByTestId('slider-base');

    // Act
    fireEvent.mouseDown(sliderBase, { clientX: 0 });

    // Assert
    expect(getByText('50%')).toBeInTheDocument();
  });

  it('hides the tooltip when not dragging', () => {
    // Arrange
    const { getByTestId, queryByText } = render(<Slider {...mockProps} />);
    const sliderBase = getByTestId('slider-base');

    // Act
    fireEvent.mouseDown(sliderBase, { clientX: 0 });
    fireEvent.mouseUp(document);

    // Assert
    expect(queryByText('50%')).not.toBeInTheDocument();
  });
});
