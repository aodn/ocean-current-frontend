import { describe, it, expect } from 'vitest';
import { getProductInfoByKey } from './utils';

describe('getProductInfoByKey', () => {
  it('returns null for an unknown product', () => {
    expect(getProductInfoByKey('notAProduct')).toBeNull();
  });

  it('returns the SWOT and GSLA product info with a popup description but no summary', () => {
    const info = getProductInfoByKey('swotGsla');

    expect(info).not.toBeNull();
    expect(info?.title).toBe('SWOT and GSLA');
    // No summary text until the client provides one.
    expect(info?.summary).toBeNull();
    // The popup content (the client's about text) is still available.
    expect(typeof info?.description).toBe('function');
    expect(info?.description()).not.toBeNull();
  });

  it.each(['swotGsla-ssh', 'swotGsla-mdt'])(
    'falls back to the parent SWOT and GSLA info for the %s sub-product',
    (childKey) => {
      const info = getProductInfoByKey('swotGsla', childKey);

      expect(info?.title).toBe('SWOT and GSLA');
      expect(info?.summary).toBeNull();
      expect(info?.description()).not.toBeNull();
    },
  );
});
