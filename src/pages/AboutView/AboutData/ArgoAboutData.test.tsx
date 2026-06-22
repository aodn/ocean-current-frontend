import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArgoAboutData } from './ArgoAboutData';

vi.mock('@/components/DataVisualisationSidebar/components/WmoListPopup', () => ({
  default: vi.fn(({ isOpen, openInNewTab }: { isOpen: boolean; openInNewTab?: boolean }) =>
    isOpen ? <div data-testid="wmo-popup" data-open-in-new-tab={String(openInNewTab)} /> : null,
  ),
}));

describe('ArgoAboutData', () => {
  it('renders the [WMO numbers] button', () => {
    render(<ArgoAboutData />);
    expect(screen.getByRole('button', { name: /WMO numbers/i })).toBeInTheDocument();
  });

  it('opens the WMO popup when [WMO numbers] is clicked', () => {
    render(<ArgoAboutData />);
    expect(screen.queryByTestId('wmo-popup')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /WMO numbers/i }));
    expect(screen.getByTestId('wmo-popup')).toBeInTheDocument();
  });

  it('passes openInNewTab to the WMO popup', () => {
    render(<ArgoAboutData />);
    fireEvent.click(screen.getByRole('button', { name: /WMO numbers/i }));
    expect(screen.getByTestId('wmo-popup')).toHaveAttribute('data-open-in-new-tab', 'true');
  });
});
