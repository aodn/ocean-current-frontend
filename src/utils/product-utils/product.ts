import { OC_PRODUCTS } from '@/constants/product';
import { flatProducts } from '@/data/productData';
import { CombinedProduct, FlatProduct, MainProductWithSubProduct, Product } from '@/types/product';

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

const getProductByIdFromFlat = (productId: string): FlatProduct | undefined => {
  const product = flatProducts.find((product) => product.key === productId);
  return product;
};

const getProductByIdFromTree = (productId: string): Product | undefined => {
  const findProduct = (products: Product[]): Product | undefined => {
    for (const product of products) {
      if (product.key === productId) {
        return product;
      }
      if (product.children) {
        const childProduct = findProduct(product.children);
        if (childProduct) {
          return childProduct;
        }
      }
    }
  };
  return findProduct(OC_PRODUCTS);
};

const getMainAndSubProductById = (productId: string): MainProductWithSubProduct => {
  const product = getProductByIdFromFlat(productId);
  if (!product) {
    throw new Error(`Invalid product id: ${productId}`);
  }
  if (!product.parentId) {
    return getProductByKey(product.key);
  }
  return getProductByKey(product.parentId, product.key);
};

const checkProductHasSubProduct = (productKey: string | undefined | null): boolean =>
  OC_PRODUCTS.some((p) => p.key === productKey && p.children);

const constructPath = (product: FlatProduct): string => {
  return `${product.path}`;
};

const constructParentPath = (product: FlatProduct): string => {
  if (!product.parentId) {
    return '';
  }
  const parentProductPath = getProductByIdFromFlat(product.parentId)?.path || '';
  return `${parentProductPath}/${product.path}`;
};

const getProductFullPathById = (productId: string) => {
  const product = getProductByIdFromFlat(productId);

  // TODO: throw error if product is not found
  if (!product) return '';

  return product.parentId ? constructParentPath(product) : constructPath(product);
};

const getProductPathWithSubProduct = (productId: string): string => {
  const product = getProductByIdFromFlat(productId);

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  if (!product.parentId) {
    const mainProduct = OC_PRODUCTS.find((p) => p.key === product.key);
    if (!mainProduct) {
      throw new Error(`Main product with key ${product.key} not found`);
    }

    if (mainProduct.children && mainProduct.children.length > 0) {
      return `${mainProduct.path}/${mainProduct.children[0].path}`;
    }

    return mainProduct.path;
  }

  const mainProduct = OC_PRODUCTS.find((p) => p.key === product.parentId);
  if (!mainProduct) {
    throw new Error(`Main product for child with key ${product.key} not found`);
  }

  return `${mainProduct.path}/${product.path}`;
};

export {
  combineProducts,
  combinedProducts,
  getProductByIdFromFlat,
  getProductByIdFromTree,
  getProductByPath,
  getProductByKey,
  getMainAndSubProductById,
  validateProductIdentifier,
  checkProductHasSubProduct,
  constructPath,
  constructParentPath,
  getProductFullPathById,
  getProductPathWithSubProduct,
};
