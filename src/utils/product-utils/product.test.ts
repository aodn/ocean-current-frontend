import { vi, describe, it, expect } from 'vitest';
import { OC_PRODUCTS } from '@/constants/product';
import { AnyProductID } from '@/types/product';
import {
  findFlatProductById,
  getProductByKey,
  getMainAndSubProductById,
  checkProductHasSubProduct,
  getProductFullPathById,
  getProductPathWithSubProduct,
} from './product';

vi.mock('@/constants/product', () => ({
  OC_PRODUCTS: [
    {
      title: 'Six Day SST & Centiles',
      key: 'sixDaySst',
      path: '6-day-sst',
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
    { key: 'sixDaySst', path: '6-day-sst', parentId: null },
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
    expect(result).toBe('6-day-sst');
  });

  it('should return the correct path for a sub product', () => {
    const result = getProductFullPathById('sixDaySst-sst');
    expect(result).toBe('6-day-sst/sst');
  });

  it('should return an empty string for a non-existent product', () => {
    const result = getProductFullPathById('nonExistentProduct' as unknown as AnyProductID);
    expect(result).toBe('');
  });
});

describe('getProductPathWithSubProduct', () => {
  it('should return the correct path for a main product with sub-products', () => {
    const result = getProductPathWithSubProduct('sixDaySst');
    expect(result).toBe('6-day-sst/sst');
  });

  it('should return the correct path for a single product without sub-products', () => {
    const result = getProductPathWithSubProduct('argo');
    expect(result).toBe('argo');
  });

  it('should return the correct path for a sub product', () => {
    const result = getProductPathWithSubProduct('sixDaySst-sst');
    expect(result).toBe('6-day-sst/sst');
  });

  it('should throw an error for a non-existent product', () => {
    expect(() => getProductPathWithSubProduct('nonExistentProduct' as unknown as AnyProductID)).toThrow(
      'Product with id nonExistentProduct not found',
    );
  });
});
