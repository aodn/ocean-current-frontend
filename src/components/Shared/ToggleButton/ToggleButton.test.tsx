import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
  it('should render correctly with initial state', () => {
    // Arrange
    const initialIsOn = false;
    const handleToggle = vi.fn();

    // Act
    render(<ToggleButton isOn={initialIsOn} onToggle={handleToggle} />);
    const button = screen.getByRole('button');

    // Assert
    expect(button).toHaveClass('bg-gray-300');
  });

  it('should toggle state when clicked', () => {
    // Arrange
    const initialIsOn = false;
    const handleToggle = vi.fn();

    // Act
    render(<ToggleButton isOn={initialIsOn} onToggle={handleToggle} />);
    const button = screen.getByRole('button');

    // Initial state assertion
    expect(button).toHaveClass('bg-gray-300');

    // Act
    fireEvent.click(button);

    // Assert
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('should reflect the toggled state when prop changes', () => {
    // Arrange
    const { rerender } = render(<ToggleButton isOn={false} onToggle={() => {}} />);
    const button = screen.getByRole('button');

    // Initial state assertion
    expect(button).toHaveClass('bg-gray-300');

    // Act - update prop
    rerender(<ToggleButton isOn={true} onToggle={() => {}} />);

    // Assert
    expect(button).toHaveClass('bg-imos-sea-blue');
  });
});
