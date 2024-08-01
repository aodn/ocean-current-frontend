import { renderHook } from '@testing-library/react';
import { Dayjs } from 'dayjs';
import { vi } from 'vitest';
import { getArgoTags } from '@/services/argo';
import { parseArgoTagDataFromText } from '@/utils/argo-utils/argoTag';
import useDataFetch from './useDataFetch';
import useImageArgoTags from './useImageArgoTags';

vi.mock('./useDataFetch');
vi.mock('@/services/argo');
vi.mock('@/utils/argo-utils/argoTag');

describe('useImageArgoTags', () => {
  const mockDate = vi.fn() as unknown as Dayjs;
  const mockTagPath = 'testTagPath';
  const mockRegionCode = 'testRegionCode';

  const setup = (date = mockDate, tagPath = mockTagPath, regionCode = mockRegionCode) =>
    renderHook(() => useImageArgoTags(date, tagPath, regionCode));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading true initially', () => {
    vi.mocked(useDataFetch).mockReturnValue({ data: null, loading: true, error: null });

    const { result } = setup();

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should return parsed data when data is fetched', () => {
    const mockData = 'mock data';
    const parsedData = [
      { type: 'type1', coordX: 1, coordY: 2, wmoId: 123, cycle: 1, institution: 'inst1', dataSource: 'source1' },
      { type: 'type2', coordX: 3, coordY: 4, wmoId: 456, cycle: 2, institution: 'inst2', dataSource: 'source2' },
    ];
    vi.mocked(useDataFetch).mockReturnValue({ data: mockData, loading: false, error: null });
    vi.mocked(parseArgoTagDataFromText).mockReturnValue(parsedData);

    const { result } = setup();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(parsedData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', () => {
    const error = new Error('Fetch error');
    vi.mocked(useDataFetch).mockReturnValue({ data: null, loading: false, error });

    const { result } = setup();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(error);
  });

  it('should use special regionPath for SnapshotCHL', () => {
    const mockData = 'mock data';
    const parsedData = [
      { type: 'type1', coordX: 1, coordY: 2, wmoId: 123, cycle: 1, institution: 'inst1', dataSource: 'source1' },
      { type: 'type2', coordX: 3, coordY: 4, wmoId: 456, cycle: 2, institution: 'inst2', dataSource: 'source2' },
    ];
    vi.mocked(useDataFetch).mockReturnValue({ data: mockData, loading: false, error: null });
    vi.mocked(parseArgoTagDataFromText).mockReturnValue(parsedData);

    const { result } = renderHook(() => useImageArgoTags(mockDate, 'SnapshotCHL', mockRegionCode));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(parsedData);
    expect(result.current.error).toBeNull();
    expect(useDataFetch).toHaveBeenCalledWith(getArgoTags, [mockDate, 'SnapshotCHL', `${mockRegionCode}_chl`]);
  });
});
