import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useRouteError } from 'react-router';
import ErrorPage from './ErrorPage';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return { ...actual, useRouteError: vi.fn() };
});

vi.mock('@/layouts/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('ErrorPage', () => {
  it('shows "Something went wrong" when there is a route error', () => {
    vi.mocked(useRouteError).mockReturnValue(new Error('boom'));

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows "This page is missing" when there is no route error', () => {
    vi.mocked(useRouteError).mockReturnValue(null);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('This page is missing')).toBeInTheDocument();
  });
});
