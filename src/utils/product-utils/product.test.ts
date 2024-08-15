import { vi, describe, it, expect } from 'vitest';
import { OC_PRODUCTS } from '@/constants/product';
import {
  getProductByIdFromFlat,
  getProductByKey,
  getMainAndSubProductById,
  checkProductHasSubProduct,
  getProductFullPathById,
  getProductPathWithSubProduct,
} from './product';

vi.mock('@/constants/product', () => ({
  OC_PRODUCTS: [
    {
      title: 'Main Product',
      key: 'mainProduct',
      path: 'main-product',
      children: [{ title: 'Sub Product', key: 'subProduct', path: 'sub-product' }],
    },
    {
      title: 'Single Product',
      key: 'singleProduct',
      path: 'single-product',
    },
  ],
}));

vi.mock('@/data/productData', () => ({
  flatProducts: [
    { key: 'mainProduct', path: 'main-product', parentId: null },
    { key: 'subProduct', path: 'sub-product', parentId: 'mainProduct' },
    { key: 'singleProduct', path: 'single-product', parentId: null },
  ],
}));

describe('getProductByIdFromFlat', () => {
  it('should return the correct product for a valid id', () => {
    const result = getProductByIdFromFlat('subProduct');
    expect(result).toEqual({ key: 'subProduct', path: 'sub-product', parentId: 'mainProduct' });
  });

  it('should return undefined for an invalid id', () => {
    const result = getProductByIdFromFlat('nonExistentProduct');
    expect(result).toBeUndefined();
  });
});

describe('getProductByKey', () => {
  it('should return the correct main product and sub product', () => {
    const result = getProductByKey('mainProduct', 'subProduct');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[0],
      subProduct: OC_PRODUCTS[0].children?.[0],
    });
  });

  it('should return only the main product when no sub product is specified', () => {
    const result = getProductByKey('singleProduct');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[1],
      subProduct: null,
    });
  });

  it('should throw an error for an invalid main product key', () => {
    expect(() => getProductByKey('nonExistentProduct')).toThrow('Invalid main product key: nonExistentProduct');
  });
});

describe('getMainAndSubProductById', () => {
  it('should return the correct main and sub product for a sub product id', () => {
    const result = getMainAndSubProductById('subProduct');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[0],
      subProduct: OC_PRODUCTS[0].children?.[0],
    });
  });

  it('should return only the main product for a main product id', () => {
    const result = getMainAndSubProductById('singleProduct');
    expect(result).toEqual({
      mainProduct: OC_PRODUCTS[1],
      subProduct: null,
    });
  });

  it('should throw an error for an invalid product id', () => {
    expect(() => getMainAndSubProductById('nonExistentProduct')).toThrow('Invalid product id: nonExistentProduct');
  });
});

describe('checkProductHasSubProduct', () => {
  it('should return true for a product with sub-products', () => {
    const result = checkProductHasSubProduct('mainProduct');
    expect(result).toBe(true);
  });

  it('should return false for a product without sub-products', () => {
    const result = checkProductHasSubProduct('singleProduct');
    expect(result).toBe(false);
  });

  it('should return false for an undefined or null product key', () => {
    expect(checkProductHasSubProduct(undefined)).toBe(false);
    expect(checkProductHasSubProduct(null)).toBe(false);
  });
});

describe('getProductFullPathById', () => {
  it('should return the correct path for a main product', () => {
    const result = getProductFullPathById('mainProduct');
    expect(result).toBe('main-product');
  });

  it('should return the correct path for a sub product', () => {
    const result = getProductFullPathById('subProduct');
    expect(result).toBe('main-product/sub-product');
  });

  it('should return an empty string for a non-existent product', () => {
    const result = getProductFullPathById('nonExistentProduct');
    expect(result).toBe('');
  });
});

describe('getProductPathWithSubProduct', () => {
  it('should return the correct path for a main product with sub-products', () => {
    const result = getProductPathWithSubProduct('mainProduct');
    expect(result).toBe('main-product/sub-product');
  });

  it('should return the correct path for a single product without sub-products', () => {
    const result = getProductPathWithSubProduct('singleProduct');
    expect(result).toBe('single-product');
  });

  it('should return the correct path for a sub product', () => {
    const result = getProductPathWithSubProduct('subProduct');
    expect(result).toBe('main-product/sub-product');
  });

  it('should throw an error for a non-existent product', () => {
    expect(() => getProductPathWithSubProduct('nonExistentProduct')).toThrow(
      'Product with id nonExistentProduct not found',
    );
  });
});
