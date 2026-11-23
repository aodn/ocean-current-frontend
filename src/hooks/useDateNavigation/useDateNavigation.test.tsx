import '@/configs/dayjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { MemoryRouter, useSearchParams } from 'react-router';
import { DateFormat, DateItem } from '@/types/date';
import { ProductID } from '@/types/product';
import { ArgoProfileCycle } from '@/types/argo';
import { useDateListNavigation } from './useDateNavigation';

let mockArgoProfiles: ArgoProfileCycle[] = [];

vi.mock('@/stores/argo-store/argoStore', () => ({
  useArgoStore: (selector: (state: { argoProfileCycles: ArgoProfileCycle[] }) => unknown) =>
    selector({ argoProfileCycles: mockArgoProfiles }),
}));

const PROFILES: ArgoProfileCycle[] = [
  { date: '20250523', cycle: '25', filename: '20250523_5905578_25.gif' },
  { date: '20260521', cycle: '62', filename: '20260521_5905578_62.gif' },
];
const DATES: DateItem[] = PROFILES.map((p) => ({ date: p.date }));

let resolvedCurrentDate = '';

interface HarnessProps {
  availableDates: DateItem[];
  productId?: ProductID;
  dateFormat?: DateFormat;
}

const Harness: React.FC<HarnessProps> = ({ availableDates, productId, dateFormat = DateFormat.DAY }) => {
  const { currentDate } = useDateListNavigation({ dateFormat, availableDates, productId });
  const [params] = useSearchParams();
  resolvedCurrentDate = currentDate.format(dateFormat);
  return <div data-testid="url-date">{params.get('date') ?? 'none'}</div>;
};

const renderAtUrl = (url: string, availableDates: DateItem[], productId?: ProductID, dateFormat?: DateFormat) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Harness availableDates={availableDates} productId={productId} dateFormat={dateFormat} />
    </MemoryRouter>,
  );

describe('useDateListNavigation — Argo cycle-to-date resolution', () => {
  beforeEach(() => {
    mockArgoProfiles = [];
    resolvedCurrentDate = '';
  });

  it('resolves the date from the cycle when date param is missing, and writes it to the URL', async () => {
    mockArgoProfiles = PROFILES;
    renderAtUrl('/product/argo?wmoid=5905578&cycle=25', DATES, 'argo');

    await waitFor(() => expect(screen.getByTestId('url-date')).toHaveTextContent('20250523'));
    expect(resolvedCurrentDate).toBe('20250523');
  });

  it('does not fall back to the latest date while profiles are still loading (cycle present)', async () => {
    mockArgoProfiles = []; // profiles not populated yet
    renderAtUrl('/product/argo?wmoid=5905578&cycle=25', DATES, 'argo');

    // Let React effects flush on a macrotask, then assert the URL was NOT overwritten.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.getByTestId('url-date')).toHaveTextContent('none');
    expect(resolvedCurrentDate).toBe(dayjs().format('YYYYMMDD'));
  });

  it('still falls back to the latest available date when no cycle is present (non-argo path)', async () => {
    renderAtUrl('/product/six-day-sst/sst', DATES, 'sixDaySst-sst');

    await waitFor(() => expect(screen.getByTestId('url-date')).toHaveTextContent('20260521'));
    expect(resolvedCurrentDate).toBe('20260521');
  });
});

describe('useDateListNavigation — Tidal Currents map date fallback', () => {
  const TIDAL_DATES: DateItem[] = [{ date: '202611200000' }, { date: '202611200100' }, { date: '202611200200' }];

  beforeEach(() => {
    resolvedCurrentDate = '';
  });

  it('falls back to the newest map when the requested date is missing from the index', async () => {
    renderAtUrl(
      '/product/tidal-currents/spd?region=Darwin&date=202611200030',
      TIDAL_DATES,
      'tidalCurrents-spd',
      DateFormat.MINUTE,
    );

    await waitFor(() => expect(screen.getByTestId('url-date')).toHaveTextContent('202611200200'));
    expect(resolvedCurrentDate).toBe('202611200200');
  });

  it('keeps the requested date when it exists in the index', async () => {
    renderAtUrl(
      '/product/tidal-currents/sl?region=Darwin&date=202611200100',
      TIDAL_DATES,
      'tidalCurrents-sl',
      DateFormat.MINUTE,
    );

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.getByTestId('url-date')).toHaveTextContent('202611200100');
    expect(resolvedCurrentDate).toBe('202611200100');
  });

  it('leaves the requested date unchanged when the index is empty', async () => {
    renderAtUrl(
      '/product/tidal-currents/spd?region=Darwin&date=202611200030',
      [],
      'tidalCurrents-spd',
      DateFormat.MINUTE,
    );

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.getByTestId('url-date')).toHaveTextContent('202611200030');
  });

  it('still uses the nearest-date search for other products', async () => {
    const HOURLY_DATES: DateItem[] = [{ date: '2026111000' }, { date: '2026111500' }, { date: '2026112000' }];
    renderAtUrl('/product/four-hour-sst/sst?date=2026111400', HOURLY_DATES, 'fourHourSst-sst', DateFormat.HOUR);

    await waitFor(() => expect(screen.getByTestId('url-date')).toHaveTextContent('2026111000'));
    expect(resolvedCurrentDate).toBe('2026111000');
  });
});
