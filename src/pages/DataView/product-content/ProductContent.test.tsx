import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { createTestQueryClient } from '@/configs/query';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { useProductContentData } from './hooks/useProductContentData';
import ProductContent from './ProductContent';

vi.mock('@/services/argo');
vi.mock('./hooks/useProductContentData');

vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router')>()),
  useOutletContext: () => ({ showVideo: false }),
}));

// Needed by ErrorImage's <Link> and ProductContent's checkProductHasSubProduct call
vi.mock('@/utils/product-utils/product', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/utils/product-utils/product')>()),
  getProductPathWithSubProduct: vi.fn(() => 'argo'),
  checkProductHasSubProduct: vi.fn(() => false),
}));

const WMO_ID = '1234567';

const mockArgoData = {
  productChecks: {
    isArgo: true,
    isCurrentMeters: false,
    isCurrentMetersMooredInstrumentArray: false,
    isTidalCurrents: false,
    isSealCtd: false,
    isSealCtdTags: false,
    isSurfaceWaves: false,
    isSurfaceWavesBuoyTimeseries: false,
    isOceanColour: false,
    isOceanColourChlA: false,
    isEACMooringArray: false,
    isClimatology: false,
    isMonthlyMeans: false,
    isRegionRequired: false,
  },
  argoParams: {
    worldMeteorologicalOrgId: WMO_ID,
    cycle: '001',
    depth: '2000M',
  },
  useDate: dayjs('2025-01-01'),
  useProductId: 'argo',
  mainProduct: { key: 'argo' },
  subProduct: null,
  useRegionCode: 'Au',
  useArgoProfileCycles: [],
  currentMetersParams: { region: '', date: '', property: '', depth: '', deploymentPlot: '' },
  urlParams: {},
  hasSelectedParams: { point: false, sealCtdTag: false, buoyRegion: false },
  regionData: { path: 'Au', scope: 'Au', targetPath: 'Au' },
  argoTagFilePath: null,
  oceanColourImageData: undefined,
  tidalCurrentsImageData: undefined,
  dateString: '2025010100',
};

const renderComponent = () =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter>
        <ProductContent />
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe('ProductContent — Argo profile cycles query states', () => {
  beforeEach(() => {
    const mock = mockArgoData as unknown as ReturnType<typeof useProductContentData>;
    vi.mocked(useProductContentData).mockReturnValue(mock);
  });

  it('shows Loading while profile cycles are being fetched', () => {
    vi.mocked(fetchArgoProfileCyclesByWmoId).mockReturnValue(new Promise(() => {}));

    renderComponent();

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('shows ErrorImage when profile cycles query fails', async () => {
    vi.mocked(fetchArgoProfileCyclesByWmoId).mockRejectedValue(new Error('Network error'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByAltText('not found icon')).toBeInTheDocument();
    });
  });
});
