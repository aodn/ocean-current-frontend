import { vi, describe, it, expect } from 'vitest';
import { OC_PRODUCTS } from '@/constants/product';
import { AnyProductID, ProductID } from '@/types/product';
import {
  findFlatProductById,
  getProductByKey,
  getMainAndSubProductById,
  checkProductHasSubProduct,
  getProductFullPathById,
  getProductPathWithSubProduct,
  getProductLegend,
} from './product';

vi.mock('@/constants/product', () => ({
  OC_PRODUCTS: [
    {
      title: 'Six Day SST & Centiles',
      key: 'sixDaySst',
      path: 'six-day-sst',
      children: [
        {
          title: 'SST',
          key: 'sixDaySst-sst',
          path: 'sst',
          imgPath: 'SST',
        },
      ],
    },
    {
      title: 'Argo',
      key: 'argo',
      path: 'argo',
    },
  ],
}));

vi.mock('@/data/productData', () => ({
  flattenedProducts: [
    { key: 'sixDaySst', path: 'six-day-sst', parentId: null },
    { key: 'sixDaySst-sst', path: 'sst', parentId: 'sixDaySst', imgPath: 'SST' },
    { key: 'argo', path: 'argo', parentId: null },
  ],
}));

describe('findFlatProductById', () => {
  it('should return the correct product for a valid id', () => {
    const result = findFlatProductById('sixDaySst-sst');
    expect(result).toEqual({
      key: 'sixDaySst-sst',
      path: 'sst',
      parentId: 'sixDaySst',
      imgPath: 'SST',
    });
  });

  it('should return undefined for an invalid id', () => {
    const result = findFlatProductById('nonExistentProduct' as unknown as AnyProductID);
    expect(result).toBeUndefined();
  });
});

describe('getProductByKey', () => {
  it('should return the correct main product and sub product', () => {
    const result = getProductByKey('sixDaySst', 'sixDaySst-sst');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[0],
      subProduct: OC_PRODUCTS[0].children?.[0],
    });
  });

  it('should return only the main product when no sub product is specified', () => {
    const result = getProductByKey('argo');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[1],
      subProduct: null,
    });
  });

  it('should throw an error for an invalid main product key', () => {
    expect(() => getProductByKey('nonExistentProduct' as unknown as AnyProductID)).toThrow(
      'Invalid main product key: nonExistentProduct',
    );
  });
});

describe('getMainAndSubProductById', () => {
  it('should return the correct main and sub product for a sub product id', () => {
    const result = getMainAndSubProductById('sixDaySst-sst');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[0],
      subProduct: OC_PRODUCTS[0].children?.[0],
    });
  });

  it('should return only the main product for a main product id', () => {
    const result = getMainAndSubProductById('argo');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[1],
      subProduct: null,
    });
  });

  it('should throw an error for an invalid product id', () => {
    expect(() => getMainAndSubProductById('nonExistentProduct' as unknown as AnyProductID)).toThrow(
      'Invalid product id: nonExistentProduct',
    );
  });
});

describe('checkProductHasSubProduct', () => {
  it('should return true for a product with sub-products', () => {
    const result = checkProductHasSubProduct('sixDaySst');
    expect(result).toBe(true);
  });

  it('should return false for a product without sub-products', () => {
    const result = checkProductHasSubProduct('argo');
    expect(result).toBe(false);
  });

  it('should return false for an undefined or null product key', () => {
    expect(checkProductHasSubProduct(undefined)).toBe(false);
    expect(checkProductHasSubProduct(null)).toBe(false);
  });
});

describe('getProductFullPathById', () => {
  it('should return the correct path for a main product', () => {
    const result = getProductFullPathById('sixDaySst');
    expect(result).toBe('six-day-sst');
  });

  it('should return the correct path for a sub product', () => {
    const result = getProductFullPathById('sixDaySst-sst');
    expect(result).toBe('six-day-sst/sst');
  });

  it('should return an empty string for a non-existent product', () => {
    const result = getProductFullPathById('nonExistentProduct' as unknown as AnyProductID);
    expect(result).toBe('');
  });
});

describe('getProductPathWithSubProduct', () => {
  it('should return the correct path for a main product with sub-products', () => {
    const result = getProductPathWithSubProduct('sixDaySst');
    expect(result).toBe('six-day-sst/sst');
  });

  it('should return the correct path for a single product without sub-products', () => {
    const result = getProductPathWithSubProduct('argo');
    expect(result).toBe('argo');
  });

  it('should return the correct path for a sub product', () => {
    const result = getProductPathWithSubProduct('sixDaySst-sst');
    expect(result).toBe('six-day-sst/sst');
  });

  it('should throw an error for a non-existent product', () => {
    expect(() => getProductPathWithSubProduct('nonExistentProduct' as unknown as AnyProductID)).toThrow(
      'Product with id nonExistentProduct not found',
    );
  });
});

describe('getProductLegend', () => {
  it('returns null for an unknown product', () => {
    // @ts-expect-error - intentionally passing an invalid product id
    expect(getProductLegend('notAProduct')).toBeNull();
  });

  it('returns the parent items (null) when no matching child legend is given', () => {
    // swotGsla only defines child legends, so the parent fallback is null
    expect(getProductLegend('swotGsla')).toBeNull();
  });

  describe('SWOT/GSLA legends', () => {
    const expectedLabels = [
      'Argo',
      'Glider',
      'Radar',
      'Drifter',
      'Ship',
      'ADCP velocity',
      'Fish SOOP',
      'Selected isobaths',
      'Sea Surface Height',
    ];

    it.each(['swotGsla-ssh', 'swotGsla-mdt'] as ProductID[])('provides the SWOT legend for %s', (childKey) => {
      const items = getProductLegend('swotGsla', childKey);

      expect(items).not.toBeNull();
      expect(items?.map((item) => item.label)).toEqual(expectedLabels);
    });

    it('uses the same legend for SSH and MDT', () => {
      expect(getProductLegend('swotGsla', 'swotGsla-ssh')).toEqual(getProductLegend('swotGsla', 'swotGsla-mdt'));
    });

    it('includes the ADCP velocity item with a sidebar shape and description', () => {
      const items = getProductLegend('swotGsla', 'swotGsla-ssh');
      const adcp = items?.find((item) => item.label === 'ADCP velocity');

      expect(adcp?.shape).toBeDefined();
      expect(adcp?.description).toMatch(/Acoustic Doppler Current Profilers/);
    });

    it('includes popup-only entries (isobaths and Sea Surface Height) without a shape', () => {
      const items = getProductLegend('swotGsla', 'swotGsla-ssh');
      const isobaths = items?.find((item) => item.label === 'Selected isobaths');
      const ssh = items?.find((item) => item.label === 'Sea Surface Height');

      expect(isobaths?.shape).toBeUndefined();
      expect(ssh?.shape).toBeUndefined();
      expect(ssh?.description).toBe('contours every 5 cm.');
    });
  });
});
