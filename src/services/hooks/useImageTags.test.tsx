import { renderHook, waitFor } from '@testing-library/react';
import { Dayjs } from 'dayjs';
import { vi } from 'vitest';
import { fetchArgoTags } from '@/services/argo';
import { parseImageTagsFromText } from '@/utils/argo-utils/argoTag';
import { DateFormat } from '@/types/date';
import { createQueryWrapper } from '@/test/queryClientUtils';
import useImageTags from './useImageTags';

vi.mock('@/services/argo');
vi.mock('@/utils/argo-utils/argoTag');

describe('useImageTags', () => {
  const mockDate = {
    format: vi.fn().mockReturnValue('20231201'),
  } as unknown as Dayjs;
  const mockTagPath = 'testTagPath';
  const mockRegionCode = 'testRegionCode';
  const mockDateFormat = DateFormat.DAY;

  const setup = (date = mockDate, tagPath = mockTagPath, regionCode = mockRegionCode, dateFormat = mockDateFormat) =>
    renderHook(() => useImageTags({ date, tagPath, regionCode, dateFormat }), { wrapper: createQueryWrapper() });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading true initially', () => {
    const { result } = setup();

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should return parsed data when data is fetched', async () => {
    const mockData = 'mock data';
    const parsedData = [
      {
        type: 'Argo' as const,
        coordX: 1,
        coordY: 2,
        wmoId: 123,
        cycle: 1,
        institution: 'inst1',
        dataSource: 'source1',
      },
      {
        type: 'Argo' as const,
        coordX: 3,
        coordY: 4,
        wmoId: 456,
        cycle: 2,
        institution: 'inst2',
        dataSource: 'source2',
      },
    ];

    vi.mocked(fetchArgoTags).mockResolvedValue(mockData);
    vi.mocked(parseImageTagsFromText).mockReturnValue(parsedData);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(parsedData);
    expect(result.current.error).toBeNull();
  });

  it('should deduplicate parsed tags, keeping the first occurrence', async () => {
    const mockData = 'mock data';
    const tag1 = {
      type: 'Argo' as const,
      coordX: 1,
      coordY: 2,
      wmoId: 123,
      cycle: 1,
      institution: 'inst1',
      dataSource: 'source1',
    };
    const tag2 = {
      type: 'Argo' as const,
      coordX: 3,
      coordY: 4,
      wmoId: 456,
      cycle: 2,
      institution: 'inst2',
      dataSource: 'source2',
    };
    const parsedData = [tag1, tag2, { ...tag1 }];

    vi.mocked(fetchArgoTags).mockResolvedValue(mockData);
    vi.mocked(parseImageTagsFromText).mockReturnValue(parsedData);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // duplicate of tag1 at index 2 is removed; tag1 (first occurrence) and tag2 are kept in order
    expect(result.current.data).toEqual([tag1, tag2]);
  });

  it('should handle error state', async () => {
    const error = new Error('Fetch error');
    vi.mocked(fetchArgoTags).mockRejectedValue(error);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(error);
  });

  it('should use special regionPath for SnapshotCHL', async () => {
    const mockData = 'mock data';
    const parsedData = [
      {
        type: 'Argo' as const,
        coordX: 1,
        coordY: 2,
        wmoId: 123,
        cycle: 1,
        institution: 'inst1',
        dataSource: 'source1',
      },
      {
        type: 'Argo' as const,
        coordX: 3,
        coordY: 4,
        wmoId: 456,
        cycle: 2,
        institution: 'inst2',
        dataSource: 'source2',
      },
    ];

    vi.mocked(fetchArgoTags).mockResolvedValue(mockData);
    vi.mocked(parseImageTagsFromText).mockReturnValue(parsedData);

    const { result } = renderHook(
      () =>
        useImageTags({
          date: mockDate,
          tagPath: 'SnapshotCHL',
          regionCode: mockRegionCode,
          dateFormat: mockDateFormat,
        }),
      { wrapper: createQueryWrapper() },
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(parsedData);
    expect(result.current.error).toBeNull();
    expect(fetchArgoTags).toHaveBeenCalledWith('20231201', 'SnapshotCHL', `${mockRegionCode}_chl`);
  });
});
