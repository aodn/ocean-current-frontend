import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { createTestQueryClient } from '@/configs/query';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { useImageTags } from '@/services/hooks';
import { RegionScope } from '@/constants/region';
import DataImageWithArgoMap from './DataImageWithArgoMap';

vi.mock('@/services/argo');
vi.mock('@/services/hooks');
vi.mock('@/hooks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/hooks')>()),
  useDateList: vi.fn().mockReturnValue({ isLoading: false }),
  useResizeObserver: vi.fn(),
}));
vi.mock('@/stores/product-store/hooks/useProductConvert', () => ({
  default: vi.fn().mockReturnValue({ mainProduct: { key: 'sixDaySst-sst' } }),
}));
vi.mock('@/stores/product-store/productStore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/stores/product-store/productStore')>();
  return {
    ...actual,
    default: vi.fn((selector: (s: Record<string, unknown>) => unknown) =>
      selector({ isProductImageLoading: false, isDateResolving: false }),
    ),
    setIsProductImageLoading: vi.fn(),
  };
});
vi.mock('@/utils/argo-utils/argoTag', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/utils/argo-utils/argoTag')>()),
  convertCoordsBasedOnImageScale: vi.fn((coords: unknown[]) => coords),
}));
vi.mock('@/utils/general-utils/general', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/utils/general-utils/general')>()),
  calculateImageScales: vi.fn().mockReturnValue({ scaleX: 1, scaleY: 1 }),
}));

const WMO_ID = 5906207;
const CYCLE = 42;
const MAP_DATE = '20250115';

const defaultProps = {
  src: '/test-image.png',
  productId: 'sixDaySst-sst' as const,
  regionCode: 'Au',
  regionScope: RegionScope.Au,
  date: dayjs(MAP_DATE),
  argoTagFilePath: 'profiles',
};

const renderComponent = () =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <DataImageWithArgoMap {...defaultProps} />
    </QueryClientProvider>,
  );

// Advances the 100ms useEffect timer (which adds the load listener) using fake timers,
// then restores real timers so that waitFor can poll normally afterward.
const triggerImageLoad = () => {
  const img = screen.getByRole('img');
  // Mark image complete so the timer calls handleLoad directly rather than adding a listener
  Object.defineProperty(img, 'complete', { value: true, configurable: true });
  vi.useFakeTimers();
  act(() => {
    vi.runAllTimers();
  });
  vi.useRealTimers();
};

describe('DataImageWithArgoMap — Argo area click', () => {
  let windowOpen: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    windowOpen = vi.spyOn(window, 'open').mockReturnValue(null as unknown as Window);
    vi.mocked(useImageTags).mockReturnValue({
      data: [
        {
          type: 'Argo',
          coordX: 50,
          coordY: 50,
          wmoId: WMO_ID,
          cycle: CYCLE,
          institution: 'test',
          dataSource: 'Argo float',
        },
      ],
    } as ReturnType<typeof useImageTags>);
  });

  afterEach(() => {
    vi.useRealTimers();
    windowOpen.mockRestore();
  });

  // Renders the component and triggers the image load to populate area elements.
  const setup = async () => {
    const { container } = renderComponent();
    triggerImageLoad();
    await waitFor(() => expect(container.querySelector('area')).toBeInTheDocument());
    return container;
  };

  it('opens a new tab with the cycle date from the API when cycle is found', async () => {
    vi.mocked(fetchArgoProfileCyclesByWmoId).mockResolvedValue([
      { cycle: String(CYCLE), date: '20241231', filename: 'profile.png' },
    ]);

    const container = await setup();
    fireEvent.click(container.querySelector('area')!);

    await waitFor(() => {
      expect(windowOpen).toHaveBeenCalledWith(
        `/product/argo?wmoid=${WMO_ID}&cycle=${CYCLE}&depth=0-2000m&date=20241231`,
        '_blank',
      );
    });
  });

  it('falls back to the map date when the cycle is absent from API data', async () => {
    vi.mocked(fetchArgoProfileCyclesByWmoId).mockResolvedValue([
      { cycle: '999', date: '20241231', filename: 'other.png' },
    ]);

    const container = await setup();
    fireEvent.click(container.querySelector('area')!);

    await waitFor(() => {
      expect(windowOpen).toHaveBeenCalledWith(
        `/product/argo?wmoid=${WMO_ID}&cycle=${CYCLE}&depth=0-2000m&date=${MAP_DATE}`,
        '_blank',
      );
    });
  });

  it('falls back to the map date when the API request fails', async () => {
    vi.mocked(fetchArgoProfileCyclesByWmoId).mockRejectedValue(new Error('Network error'));

    const container = await setup();
    fireEvent.click(container.querySelector('area')!);

    await waitFor(() => {
      expect(windowOpen).toHaveBeenCalledWith(
        `/product/argo?wmoid=${WMO_ID}&cycle=${CYCLE}&depth=0-2000m&date=${MAP_DATE}`,
        '_blank',
      );
    });
  });

  it('shows LinearProgress overlay while the cycle date fetch is in flight', async () => {
    vi.mocked(fetchArgoProfileCyclesByWmoId).mockReturnValue(new Promise(() => {}));

    const container = await setup();

    expect(screen.queryByTestId('linear-progress')).not.toBeInTheDocument();

    fireEvent.click(container.querySelector('area')!);

    await waitFor(() => {
      expect(screen.getByTestId('linear-progress')).toBeInTheDocument();
    });
  });
});
