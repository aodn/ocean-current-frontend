import '@/configs/dayjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { MemoryRouter, useSearchParams } from 'react-router';
import { DateFormat, DateItem } from '@/types/date';
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

const Harness: React.FC<{ availableDates: DateItem[] }> = ({ availableDates }) => {
  const { currentDate } = useDateListNavigation({ dateFormat: DateFormat.DAY, availableDates });
  const [params] = useSearchParams();
  resolvedCurrentDate = currentDate.format('YYYYMMDD');
  return <div data-testid="url-date">{params.get('date') ?? 'none'}</div>;
};

const renderAtUrl = (url: string, availableDates: DateItem[]) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Harness availableDates={availableDates} />
    </MemoryRouter>,
  );

describe('useDateListNavigation — Argo cycle-to-date resolution', () => {
  beforeEach(() => {
    mockArgoProfiles = [];
    resolvedCurrentDate = '';
  });

  it('resolves the date from the cycle when date param is missing, and writes it to the URL', async () => {
    mockArgoProfiles = PROFILES;
    renderAtUrl('/product/argo?wmoid=5905578&cycle=25', DATES);

    await waitFor(() => expect(screen.getByTestId('url-date')).toHaveTextContent('20250523'));
    expect(resolvedCurrentDate).toBe('20250523');
  });

  it('does not fall back to the latest date while profiles are still loading (cycle present)', async () => {
    mockArgoProfiles = []; // profiles not populated yet
    renderAtUrl('/product/argo?wmoid=5905578&cycle=25', DATES);

    // Flush effects, then assert the URL was NOT overwritten with the latest date.
    await Promise.resolve();
    expect(screen.getByTestId('url-date')).toHaveTextContent('none');
    expect(resolvedCurrentDate).toBe(dayjs().format('YYYYMMDD'));
  });

  it('still falls back to the latest available date when no cycle is present (non-argo path)', async () => {
    renderAtUrl('/product/sixDaySst', DATES);

    await waitFor(() => expect(screen.getByTestId('url-date')).toHaveTextContent('20260521'));
    expect(resolvedCurrentDate).toBe('20260521');
  });
});
