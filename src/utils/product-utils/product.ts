import { DEFAULT_SUB_PRODUCT_ROUTES } from '@/configs/products/default-routes';
import { OC_PRODUCTS } from '@/constants/product';
import { productLegends, LegendItem } from '@/constants/productLegends';
import { flattenedProducts, flattenedLeafProducts } from '@/data/productData';
import {
  AnyProductID,
  CombinedProduct,
  FlatProduct,
  LeafFlatProduct,
  MainProductWithSubProduct,
  Product,
  ProductGroupID,
  ProductID,
  RootProductID,
  StandaloneProductWithoutChildren,
  SubProduct,
} from '@/types/product';

const combineProducts = (products: Product[]): CombinedProduct[] => {
  return products.flatMap((product) => {
    if (!product.children) {
      return {
        mainProduct: {
          title: product.title,
          key: product.key,
          path: product.path,
        },
        subProduct: null,
        combinedTitle: product.title,
        fullKey: product.key,
        fullPath: product.path,
      } as CombinedProduct;
    } else {
      return product.children.map((child) => {
        return {
          mainProduct: {
            title: product.title,
            key: product.key,
            path: product.path,
          },
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

const getProductByPath = ((
  mainProductPath: string,
  subProductPath?: string | null,
): StandaloneProductWithoutChildren | SubProduct => {
  const mainProduct = OC_PRODUCTS.find((product) => product.path === mainProductPath);

  // if subProductPath is provided, mainProduct can't be a standalone product, it must have children
  if (!mainProduct || (subProductPath && !mainProduct.children)) {
    throw new Error(`Invalid main product path: ${mainProductPath}`);
  }
  if (!subProductPath) {
    return mainProduct as StandaloneProductWithoutChildren;
  }
  const subProduct = mainProduct.children!.find((product) => product.path === subProductPath);
  if (!subProduct) {
    throw new Error(`Invalid sub product path: ${subProductPath}`);
  }
  return subProduct;
}) as {
  (mainProductPath: string): StandaloneProductWithoutChildren;
  (mainProductPath: string, subProductPath: string): SubProduct;
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

const findFlatProductById = (productId: AnyProductID): FlatProduct | undefined => {
  const product = flattenedProducts.find((product) => product.key === productId);
  return product;
};

const findLeafFlatProductById = (productId: ProductID): LeafFlatProduct | undefined => {
  const product = flattenedLeafProducts.find((product) => product.key === productId);
  return product;
};

const getMainAndSubProductById = (productId: AnyProductID): MainProductWithSubProduct => {
  const product = findFlatProductById(productId);
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
  const parentProductPath = findFlatProductById(product.parentId)?.path || '';
  return `${parentProductPath}/${product.path}`;
};

const getProductFullPathById = (productId: AnyProductID) => {
  const product = findFlatProductById(productId);

  // TODO: throw error if product is not found
  if (!product) return '';

  return product.parentId ? constructParentPath(product) : constructPath(product);
};

const getProductPathWithSubProduct = (productId: AnyProductID): string => {
  const product = findFlatProductById(productId);

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

/**
 * Determines the actual target ProductID that will be used after routing redirects
 * For main products with children, returns the child that matches the default sub-product path
 * defined in the router configuration
 * For standalone products, returns the product key itself
 */
const getTargetProductIdAfterRouting = (rootProductId: RootProductID): ProductID => {
  const product = findFlatProductById(rootProductId);

  if (!product) {
    throw new Error(`Product with id ${rootProductId} not found`);
  }

  // If it's already a child product, return it as-is
  if (product.parentId) {
    return rootProductId as ProductID;
  }

  const mainProduct = OC_PRODUCTS.find((p) => p.key === product.key);
  if (!mainProduct) {
    throw new Error(`Main product with key ${product.key} not found`);
  }

  // If it has children, find the default child according to router configuration
  if (mainProduct.children && mainProduct.children.length > 0) {
    const defaultSubProductPath = DEFAULT_SUB_PRODUCT_ROUTES[mainProduct.key as ProductGroupID];

    if (defaultSubProductPath) {
      const defaultChild = mainProduct.children.find((child) => child.path === defaultSubProductPath);
      if (defaultChild) {
        return defaultChild.key as ProductID;
      }
    }

    return mainProduct.children[0].key as ProductID;
  }

  return mainProduct.key as ProductID;
};

/**
 * Get legend items for a specific product and optionally a child product
 * @param productKey - The main product key
 * @param childKey - Optional child product key
 * @returns Array of legend items or null if not found
 */
const getProductLegend = (productKey: RootProductID, childKey?: string): LegendItem[] | null => {
  const productLegend = productLegends.find((legend) => legend.id === productKey);

  if (!productLegend) {
    return null;
  }

  if (childKey && productLegend.childrenLegends && childKey in productLegend.childrenLegends) {
    return productLegend.childrenLegends[childKey];
  }

  return productLegend.items;
};

export {
  combineProducts,
  combinedProducts,
  findFlatProductById,
  findLeafFlatProductById,
  getProductByPath,
  getProductByKey,
  getMainAndSubProductById,
  validateProductIdentifier,
  checkProductHasSubProduct,
  constructPath,
  constructParentPath,
  getProductFullPathById,
  getProductPathWithSubProduct,
  getTargetProductIdAfterRouting,
  getProductLegend,
};
