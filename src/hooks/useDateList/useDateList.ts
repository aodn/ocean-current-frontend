import { getProductByIdFromFlat } from '@/utils/product-utils/product';
import { RegionScope } from '@/constants/region';
import { DateFormat } from '@/types/date';
import { generateDateRange } from './mockData';

const useDateList = (productId: string, regionScope: RegionScope) => {
  const product = getProductByIdFromFlat(productId);

  if (!product) {
    throw new Error(`Invalid product id: ${productId}`);
  }

  const dateFormatFromProduct =
    regionScope === RegionScope.Local ? product.dateFormat?.localFormat : product.dateFormat?.stateFormat;

  const dateFormat = dateFormatFromProduct || DateFormat.Day;

  return generateDateRange(productId, dateFormat, regionScope);
};

export default useDateList;
