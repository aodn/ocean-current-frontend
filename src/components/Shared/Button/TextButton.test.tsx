import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextButton from './TextButton';

describe('TextButton', () => {
  it('renders children', () => {
    render(<TextButton>[WMO numbers]</TextButton>);
    expect(screen.getByText('[WMO numbers]')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<TextButton onClick={onClick}>Click me</TextButton>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <TextButton onClick={onClick} disabled>
        Click me
      </TextButton>,
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies additional className', () => {
    const { container } = render(<TextButton className="text-imos-sea-blue">Link</TextButton>);
    expect(container.firstChild).toHaveClass('text-imos-sea-blue');
  });

  it('has type="button" to prevent accidental form submission', () => {
    render(<TextButton>Submit</TextButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
