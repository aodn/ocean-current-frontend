import { useQuery } from '@tanstack/react-query';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { ProductID } from '@/types/product';
import { API_ENABLED_PRODUCTS, FIXED_DATA_PRODUCTS } from '@/configs/products';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { ImageFile, ImageListResponse } from '@/types/imageList';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { ArgoProfileCycle } from '@/types/argo';
import { DateItem } from '@/types/date';
import useProductStore from '@/stores/product-store/productStore';
import useArgoStore from '@/stores/argo-store/argoStore';
import { generateDateRange } from './mockData';

const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

const processArgoDateList = (data: ArgoProfileCycle[]): DateItem[] => {
  if (!data || data.length === 0) {
    return [];
  }

  return data.map((cycle: ArgoProfileCycle) => ({
    date: cycle.date,
  }));
};

const processFilesToDateList = (files: ImageFile[]): DateItem[] => {
  if (!files || files.length === 0) {
    return [];
  }

  return files
    .map((file) => ({
      date: extractDateFromFilename(file.name),
    }))
    .filter(({ date }) => /^\d+$/.test(date));
};

const useDateList = (productId: ProductID) => {
  const shouldUseApi = API_ENABLED_PRODUCTS.includes(productId) && !FIXED_DATA_PRODUCTS.includes(productId);

  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const regionCodeFromStore = useProductStore((state) => state.productParams.regionCode);
  const region = regionCodeFromStore!;
  const metaData = useArgoStore((state) => state);
  const wmoId = metaData.selectedArgoParams.worldMeteorologicalOrgId;

  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);
  const fixedDateList = generateDateRange(productId, dateFormat, regionScope);

  const isArgo = productId === 'argo';

  const argoQuery = useQuery({
    queryKey: ['argoDateList', wmoId],
    queryFn: () => fetchArgoProfileCyclesByWmoId(wmoId),
    enabled: isArgo && !!wmoId,
  });

  const standardQuery = useQuery({
    queryKey: ['dateList', productId, region],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region),
    enabled: shouldUseApi && !isArgo,
  });

  const { data, isLoading, error } = isArgo ? argoQuery : standardQuery;

  let dateList: DateItem[] = [];

  if (shouldUseApi && data) {
    if (isArgo) {
      dateList = processArgoDateList(data.data as ArgoProfileCycle[]);
    } else {
      const files = data.data as ImageListResponse[];
      dateList = processFilesToDateList(files[0]?.files as ImageFile[] | []);
    }
  }

  if (dateList.length === 0) {
    dateList = fixedDateList;
  }

  return { isLoading, dateList, error };
};

export default useDateList;
