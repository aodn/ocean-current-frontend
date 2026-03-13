import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareButton from './ShareButton';

describe('ShareButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders Share label', () => {
    render(<ShareButton />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('copies the current page URL to clipboard on click', () => {
    render(<ShareButton />);
    fireEvent.click(screen.getByText('Share'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(location.href);
  });

  it('changes label to "Copied!" after click', async () => {
    render(<ShareButton />);
    fireEvent.click(screen.getByText('Share'));
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });

  it('reverts label back to "Share" after 2 seconds', async () => {
    vi.useFakeTimers();
    render(<ShareButton />);

    fireEvent.click(screen.getByText('Share'));
    expect(screen.getByText('Copied!')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Share')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
