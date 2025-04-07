import { useQuery } from '@tanstack/react-query';
import { RegionScope } from '@/constants/region';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { ProductID } from '@/types/product';
import { API_ENABLED_PRODUCTS, FIXED_DATA_PRODUCTS } from '@/configs/products';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { ImageFile } from '@/types/imageList';
import { generateDateRange } from './mockData';

const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

const processFilesToDateList = (files: ImageFile[]) => {
  return files
    .map((file) => ({
      date: extractDateFromFilename(file.name),
    }))
    .filter(({ date }) => !isNaN(Number(date)));
};

const useDateList = (productId: ProductID, regionScope: RegionScope, region: string) => {
  const shouldUseApi = API_ENABLED_PRODUCTS.includes(productId) && !FIXED_DATA_PRODUCTS.includes(productId);
  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);
  const fixedDateList = generateDateRange(productId, dateFormat, regionScope);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dateList', productId, region],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region),
    enabled: shouldUseApi,
  });

  const dateList = shouldUseApi && data?.data[0] ? processFilesToDateList(data.data[0].files) : fixedDateList;

  return { isLoading, dateList, error };
};

export default useDateList;
