import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useProductIdFromUrl } from '../useProductIdFromUrl/useProductIdFromUrl';
import { useArgoProductValidQueryParams } from './useArgoProductValidQueryParams';

vi.mock('../useProductIdFromUrl/useProductIdFromUrl', () => ({
  useProductIdFromUrl: vi.fn(),
}));

const renderWithUrl = (url: string) =>
  renderHook(() => useArgoProductValidQueryParams(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={[url]}>{children}</MemoryRouter>
    ),
  });

describe('useArgoProductValidQueryParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useProductIdFromUrl).mockReturnValue({ mainProduct: 'argo' } as ReturnType<typeof useProductIdFromUrl>);
  });

  it('is valid for argo with wmoid + cycle but no date (date is optional)', () => {
    const { result } = renderWithUrl('/product/argo?wmoid=5905578&cycle=25&depth=0-2000m');
    expect(result.current.isArgoValid).toBe(true);
  });

  it('is valid for argo with wmoid + cycle + date', () => {
    const { result } = renderWithUrl('/product/argo?wmoid=5905578&cycle=25&depth=0-2000m&date=20250523');
    expect(result.current.isArgoValid).toBe(true);
  });

  it('is invalid for argo when cycle is missing', () => {
    const { result } = renderWithUrl('/product/argo?wmoid=5905578&depth=0-2000m');
    expect(result.current.isArgoValid).toBe(false);
  });

  it('is invalid for argo when wmoid is missing', () => {
    const { result } = renderWithUrl('/product/argo?cycle=25&depth=0-2000m');
    expect(result.current.isArgoValid).toBe(false);
  });
});
