import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { ButtonType } from './types/button.types';

describe('Button Component', () => {
  it('renders without crashing', () => {
    // Arrange & Act
    render(
      <Button type="primary" borderRadius="medium">
        Click me
      </Button>,
    );

    // Assert
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders the icon when is passed', () => {
    // Arrange
    const icon = <span>🚀</span>;

    // Act
    render(
      <Button type="primary" borderRadius="medium" icon={icon}>
        Launch
      </Button>,
    );

    // Assert
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('applies styles based on props', () => {
    // Arrange & Act
    const { container } = render(
      <Button type="primary" borderRadius="medium">
        Styled Button
      </Button>,
    );

    // Assert

    expect(container.firstChild).toHaveClass(ButtonType.primary);
  });

  it('calls onClick when button is clicked', () => {
    // Arrange
    const onClickMock = vi.fn();
    render(
      <Button type="primary" borderRadius="medium" onClick={onClickMock}>
        Click me
      </Button>,
    );

    // Act
    fireEvent.click(screen.getByText('Click me'));

    // Assert
    expect(onClickMock).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const onClickMock = vi.fn();
    render(
      <Button type="primary" borderRadius="medium" disabled onClick={onClickMock}>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText('Click me'));

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('applies transition classes when enabled', () => {
    const { container } = render(<Button type="primary">Click me</Button>);

    expect(container.firstChild).toHaveClass('transition', 'duration-300', 'ease-in-out');
    expect(container.firstChild).not.toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('applies disabled classes and removes transition when disabled', () => {
    const { container } = render(
      <Button type="primary" disabled>
        Click me
      </Button>,
    );

    expect(container.firstChild).toHaveClass('cursor-not-allowed', 'opacity-50');
    expect(container.firstChild).not.toHaveClass('transition', 'duration-300', 'ease-in-out');
  });
});
