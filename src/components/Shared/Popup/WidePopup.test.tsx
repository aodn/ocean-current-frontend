import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WidePopup from './WidePopup';

describe('WidePopup', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Title',
    body: () => <p>Test body content</p>,
  };

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<WidePopup {...defaultProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and body when open', () => {
    render(<WidePopup {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test body content')).toBeInTheDocument();
  });

  it('renders the close button', () => {
    render(<WidePopup {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<WidePopup {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('locks body scroll when open', () => {
    render(<WidePopup {...defaultProps} />);
    expect(document.body.style.position).toBe('fixed');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(<WidePopup {...defaultProps} />);
    expect(document.body.style.position).toBe('fixed');

    rerender(<WidePopup {...defaultProps} isOpen={false} />);
    expect(document.body.style.position).toBe('');
  });

  it('renders without body prop', () => {
    render(<WidePopup isOpen={true} onClose={vi.fn()} title="No body" />);
    expect(screen.getByText('No body')).toBeInTheDocument();
  });
});
