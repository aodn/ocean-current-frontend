import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useVideoCreation } from '@/hooks';
import DisabledVideoCreation from './DisabledVideoCreation';

vi.mock('@/hooks');

describe('DisabledVideoCreation Component', () => {
  it('does not call useVideoCreation hook', () => {
    render(<DisabledVideoCreation />);
    expect(useVideoCreation).not.toHaveBeenCalled();
  });

  it('renders in disabled state', () => {
    render(<DisabledVideoCreation />);
    expect(screen.getByTestId('product-menu-bar-download-option')).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('does not open options when clicked', () => {
    render(<DisabledVideoCreation />);
    fireEvent.click(screen.getByTestId('product-menu-bar-download-option'));
    expect(screen.queryByText('Customise Gif')).not.toBeInTheDocument();
  });
});
