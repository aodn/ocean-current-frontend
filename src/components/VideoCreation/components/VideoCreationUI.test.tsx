import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoCreationUI from './VideoCreationUI';

describe('VideoCreationUI Component', () => {
  it('renders with default props', () => {
    render(<VideoCreationUI />);
    expect(screen.getByTestId('product-menu-bar-download-option')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<VideoCreationUI disabled={true} />);
    expect(screen.getByTestId('product-menu-bar-download-option')).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('renders GIF options when showGifOptions is true', () => {
    render(<VideoCreationUI showGifOptions={true} />);
    expect(screen.getByText('Customise Gif')).toBeInTheDocument();
  });
});
