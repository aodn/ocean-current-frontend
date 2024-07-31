import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
  it('should render correctly with initial state', () => {
    // Arrange
    const initialIsOn = false;
    const handleToggle = vi.fn();

    // Act
    render(<ToggleButton disabled={false} isOn={initialIsOn} onToggle={handleToggle} />);
    const button = screen.getByRole('button');

    // Assert
    expect(button).toHaveClass('bg-gray-300');
  });

  it('should toggle state when clicked', () => {
    // Arrange
    const initialIsOn = false;
    const handleToggle = vi.fn();

    // Act
    render(<ToggleButton disabled={false} isOn={initialIsOn} onToggle={handleToggle} />);
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
    const { rerender } = render(<ToggleButton disabled={false} isOn={false} onToggle={() => {}} />);
    const button = screen.getByRole('button');

    // Initial state assertion
    expect(button).toHaveClass('bg-gray-300');

    // Act - update prop
    rerender(<ToggleButton disabled={false} isOn={true} onToggle={() => {}} />);

    // Assert
    expect(button).toHaveClass('bg-imos-sea-blue');
  });

  it('should not toggle state when disabled', () => {
    // Arrange
    const initialIsOn = false;
    const handleToggle = vi.fn();

    // Act
    render(<ToggleButton disabled={true} isOn={initialIsOn} onToggle={handleToggle} />);
    const button = screen.getByRole('button');

    // Initial state assertion
    expect(button).toHaveClass('bg-gray-300');
    expect(button).toBeDisabled();

    // Act
    fireEvent.click(button);

    // Assert
    expect(handleToggle).not.toHaveBeenCalled();
    expect(button).toHaveClass('bg-gray-300'); // State should not change
  });
});
