import { OC_PRODUCTS } from '@/constants/product';
import { CombinedProduct, Product } from '@/types/product';

export const combineProducts = (products: Product[]): CombinedProduct[] => {
  return products.flatMap((product) => {
    if (!product.children) {
      return {
        mainProduct: { title: product.title, key: product.key, path: product.path },
        subProduct: null, // No sub-product
        combinedTitle: product.title,
        fullKey: product.key,
        fullPath: product.path,
      } as CombinedProduct;
    } else {
      return product.children.map((child) => {
        return {
          mainProduct: { title: product.title, key: product.key, path: product.path },
          subProduct: { title: child.title, key: child.key, path: child.path },
          combinedTitle: `${product.title} + ${child.title}`,
          fullKey: `${product.key}-${child.key}`,
          fullPath: `${product.path}/${child.path}`,
        } as CombinedProduct;
      });
    }
  });
};

const combinedProducts = combineProducts(OC_PRODUCTS);

export type ValidProductIdentifier = (typeof combinedProducts)[number]['fullKey'];

interface TargetDataEntry {
  identifier: ValidProductIdentifier;
  info: string;
}

export const validIdentifiers = new Set(combinedProducts.map((product) => product.fullKey));

export const validateProductIdentifier = (identifier: string): boolean => validIdentifiers.has(identifier);

export const createTargetDataEntry = (identifier: string, info: string): TargetDataEntry | null => {
  // Runtime check against the dynamic set of valid identifiers
  if (!validIdentifiers.has(identifier)) {
    console.error(`Invalid identifier at runtime: ${identifier}`);
    // throw new Error(`Invalid identifier at runtime: ${identifier}`);
    return null;
  }
  return { identifier: identifier as ValidProductIdentifier, info };
};
