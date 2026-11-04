import fixture from '@/pages/GlidersMap/fixtures/yearmaps.json';
import { ec2ProxyClient } from './httpClient';
import { fetchGliderYearmaps } from './gliders';

describe('fetchGliderYearmaps', () => {
  afterEach(() => vi.restoreAllMocks());

  it('fetches the published yearmaps through the resource client', async () => {
    const get = vi.spyOn(ec2ProxyClient, 'get').mockResolvedValue({ data: fixture });
    const signal = new AbortController().signal;
    expect(await fetchGliderYearmaps(signal)).toEqual(fixture.maps);
    expect(get).toHaveBeenCalledExactlyOnceWith('/api/gliders-yearmaps.json', { signal });
  });

  it.each([null, {}, { schema_version: 2, maps: [] }])('rejects unsupported responses: %o', async (data) => {
    vi.spyOn(ec2ProxyClient, 'get').mockResolvedValue({ data });
    await expect(fetchGliderYearmaps()).rejects.toThrow();
  });
});
