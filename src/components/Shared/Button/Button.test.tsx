import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { BorderRadius } from './Button.types';

describe('Button Component', () => {
  it('renders without crashing', () => {
    render(
      <Button
        color="text-white"
        borderColor="border-red-500"
        backgroundColor="bg-blue-500"
        borderRadius={BorderRadius.Medium}
      >
        Click me
      </Button>,
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders the icon when hasIcon is true', () => {
    const icon = <span>🚀</span>;
    render(
      <Button
        color="text-white"
        borderColor="border-red-500"
        backgroundColor="bg-blue-500"
        borderRadius={BorderRadius.Medium}
        hasIcon={true}
        icon={icon}
      >
        Launch
      </Button>,
    );
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('applies styles based on props', () => {
    const { container } = render(
      <Button
        color="text-white"
        borderColor="border-red-500"
        backgroundColor="bg-blue-500"
        borderRadius={BorderRadius.Medium}
      >
        Styled Button
      </Button>,
    );
    expect(container.firstChild).toHaveClass('text-white border-red-500 bg-blue-500 rounded-md');
  });

  it('calls onClick when button is clicked', () => {
    const onClickMock = vi.fn();
    render(
      <Button
        color="text-white"
        borderColor="border-red-500"
        backgroundColor="bg-blue-500"
        borderRadius={BorderRadius.Medium}
        onClick={onClickMock}
      >
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
