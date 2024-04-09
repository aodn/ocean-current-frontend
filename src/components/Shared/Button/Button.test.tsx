import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

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
    expect(container.firstChild).toHaveClass('bg-imos-black text-white rounded-xl');
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
});
