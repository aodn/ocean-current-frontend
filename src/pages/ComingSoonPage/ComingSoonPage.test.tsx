import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ComingSoonPage from './ComingSoonPage';

vi.mock('@/layouts/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ComingSoonPage />
    </MemoryRouter>,
  );

describe('ComingSoonPage', () => {
  it('names a known product', () => {
    renderAt('/coming-soon?product=gliders');

    expect(screen.getByText('Gliders is coming soon')).toBeInTheDocument();
    expect(screen.getByText(/The Gliders page is not available/)).toBeInTheDocument();
  });

  it('shows a generic message without a product', () => {
    renderAt('/coming-soon');

    expect(screen.getByText('Coming soon')).toBeInTheDocument();
    expect(screen.getByText(/This page is not available/)).toBeInTheDocument();
  });

  it('ignores unknown products', () => {
    renderAt('/coming-soon?product=<script>alert(1)</script>');

    expect(screen.getByText('Coming soon')).toBeInTheDocument();
    expect(screen.queryByText(/script/)).not.toBeInTheDocument();
  });
});
