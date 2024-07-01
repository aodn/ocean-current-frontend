import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import CheckBox from './Checkbox';
import { CheckBoxProps } from './types/Checkbox.types';

const mockProps: CheckBoxProps = {
  onClick: vi.fn(),
  isChecked: false,
};

describe('CheckBox Component', () => {
  it('should render the button with the correct initial class', () => {
    // Arrange
    render(<CheckBox {...mockProps} />);

    // Act
    const button = screen.getByRole('button');

    // Assert
    expect(button).toHaveClass(
      'flex h-5 w-5 items-center justify-center rounded-sm transition-all duration-300 transparent border border-imos-grey',
    );
    expect(button).not.toContainHTML('svg');
  });

  it('should render the button with a check icon when isChecked is true', () => {
    // Arrange
    render(<CheckBox {...mockProps} isChecked={true} />);

    // Act
    const button = screen.getByRole('button');

    // Assert
    expect(button).toHaveClass('bg-[#52BDEC] text-white');
    expect(button).toContainHTML('svg');
  });

  it('should call onClick when the button is clicked', () => {
    // Arrange
    render(<CheckBox {...mockProps} />);

    // Act
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Assert
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
