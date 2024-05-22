import { OC_PRODUCTS } from '@/constants/product';
import { CombinedProduct, MainProductWithSubProduct, Product } from '@/types/product';

const combineProducts = (products: Product[]): CombinedProduct[] => {
  return products.flatMap((product) => {
    if (!product.children) {
      return {
        mainProduct: { title: product.title, key: product.key, path: product.path },
        subProduct: null,
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
          fullKey: child.key,
          fullPath: `${product.path}/${child.path}`,
        } as CombinedProduct;
      });
    }
  });
};

const combinedProducts = combineProducts(OC_PRODUCTS);

const validIdentifiers = new Set(combinedProducts.map((product) => product.fullKey));

const validateProductIdentifier = (identifier: string): boolean => {
  if (!validIdentifiers.has(identifier)) {
    throw new Error(`Invalid identifier at runtime: ${identifier}`);
  }
  return true;
};

const getProductByPath = (mainProductPath: string, subProductPath: string | null = null) => {
  const mainProduct = OC_PRODUCTS.find((product) => product.path === mainProductPath);
  if (!mainProduct) {
    throw new Error(`Invalid main product path: ${mainProductPath}`);
  }
  if (!subProductPath) {
    return mainProduct;
  }
  const subProduct = mainProduct.children?.find((product) => product.path === subProductPath);
  if (!subProduct) {
    throw new Error(`Invalid sub product path: ${subProductPath}`);
  }
  return subProduct;
};

const getProductByKey = (mainProductKey: string, subProductKey: string | null = null): MainProductWithSubProduct => {
  const mainProduct = OC_PRODUCTS.find((product) => product.key === mainProductKey);
  if (!mainProduct) {
    throw new Error(`Invalid main product key: ${mainProductKey}`);
  }

  if (!subProductKey) {
    return { mainProduct, subProduct: null };
  }
  const subProduct = mainProduct.children?.find((product) => product.key === subProductKey);
  if (!subProduct) {
    throw new Error(`Invalid sub product key: ${subProductKey}`);
  }
  return { mainProduct, subProduct };
};

export { combineProducts, combinedProducts, getProductByPath, getProductByKey, validateProductIdentifier };
