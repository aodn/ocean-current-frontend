import { RegionScope } from '@/constants/region';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { generateDateRange } from './mockData';

const useDateList = (productId: string, regionScope: RegionScope, selectedDate: string) => {
  const isLoading = false;

  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);

  const dateList = generateDateRange(productId, dateFormat, regionScope, selectedDate);

  return { isLoading, dateList };
};

export default useDateList;
