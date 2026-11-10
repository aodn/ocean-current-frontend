import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { createTestQueryClient } from '@/configs/query';
import { getTidalCurrentsTagsData } from '@/services/tidalCurrents';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import DataImageWithTidalCurrentsMap from './DataImageWithTidalCurrentsMap';

vi.mock('@/services/tidalCurrents');
vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router')>()),
  useSearchParams: vi.fn().mockReturnValue([new URLSearchParams(), vi.fn()]),
}));
vi.mock('@/hooks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/hooks')>()),
  useResizeObserver: vi.fn(),
}));
vi.mock('../product-content/hooks/useTidalCurrentPoint', () => ({
  useTidalCurrentPoint: vi.fn().mockReturnValue({ isTidalCurrentsPointSelected: false }),
}));
vi.mock('@/stores/product-store/productStore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/stores/product-store/productStore')>();
  return {
    ...actual,
    default: vi.fn((selector: (s: Record<string, unknown>) => unknown) => selector({ isProductImageLoading: false })),
    setIsProductImageLoading: vi.fn(),
  };
});
// Like the real function, return a new array on every call
vi.mock('@/utils/general-utils/general', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/utils/general-utils/general')>()),
  scaleImageMapAreas: vi.fn(() => []),
}));

// Make the <img> look loaded, so the effect scales the TAG areas straight after render
const imageProps = ['complete', 'naturalWidth', 'naturalHeight', 'width', 'height'] as const;
const originalDescriptors = imageProps.map((prop) => Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, prop));

beforeAll(() => {
  imageProps.forEach((prop) => {
    Object.defineProperty(HTMLImageElement.prototype, prop, {
      configurable: true,
      get: () => (prop === 'complete' ? true : 100),
    });
  });
});

afterAll(() => {
  imageProps.forEach((prop, i) => {
    const descriptor = originalDescriptors[i];
    if (descriptor) Object.defineProperty(HTMLImageElement.prototype, prop, descriptor);
    else delete (HTMLImageElement.prototype as unknown as Record<string, unknown>)[prop];
  });
});

const tidalCurrentsImageData = [
  {
    path: '/tides/Bass_spd/2027',
    region: 'Bass',
    productId: 'tidalCurrents-spd',
    files: [{ name: '202612310000.gif' }],
  },
  {
    path: '/tides/Bass_spd/2026',
    region: 'Bass',
    productId: 'tidalCurrents-spd',
    files: [{ name: '202512310400.gif' }, { name: '202612310000.gif' }],
  },
];

const renderComponent = () =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <DataImageWithTidalCurrentsMap
        mainProduct={null}
        src="/tides/Bass_spd/2026/202512310400.gif"
        productId="tidalCurrents-spd"
        date={dayjs('202512310400')}
        region="Bass"
        tidalCurrentsImageData={tidalCurrentsImageData}
      />
    </QueryClientProvider>,
  );

describe('DataImageWithTidalCurrentsMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('requests the TAG file from the folder that holds the image, not the date year', async () => {
    vi.mocked(getTidalCurrentsTagsData).mockResolvedValue([]);

    renderComponent();

    await waitFor(() => {
      expect(getTidalCurrentsTagsData).toHaveBeenCalledWith('tides/Bass_spd/2026/202512310400.txt');
    });
  });

  // Regression for aodn/ocean-current-frontend#571: a failed TAG request left `data` undefined,
  // the `= []` default made a new array each render, and the effect re-ran setAreas forever.
  it('does not re-render in a loop when the TAG file request fails', async () => {
    vi.mocked(getTidalCurrentsTagsData).mockRejectedValue(new Error('404'));

    renderComponent();

    await waitFor(() => expect(getTidalCurrentsTagsData).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(vi.mocked(scaleImageMapAreas).mock.calls.length).toBeLessThan(5);
  });
});
