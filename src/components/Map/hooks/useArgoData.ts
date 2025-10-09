import dayjs from 'dayjs';
import { useRegionLatestDates } from '@/services/hooks';
import useDateStore from '@/stores/date-store/dateStore';
import { DateFormat } from '@/types/date';
import { useCurrentPage } from '@/hooks/useCurrentPage/useCurrentPage';
import useArgoDataQuery from './useArgoDataQuery';

/**
 * Hook to fetch Argo data based on the current page context.
 *
 * On the product page, it fetches Argo data for the user-selected date.
 * On other pages (map page), it fetches Argo data for the latest available date.
 *
 * @returns {Object} An object containing:
 *   - argoData: GeoJSON FeatureCollection of Argo profiles
 *   - error: Error object if the query failed, undefined otherwise
 */
const useArgoData = () => {
  const currentPage = useCurrentPage();
  const isProductPage = currentPage === '/product';

  const useDate = useDateStore((state) => state.date);

  const { data: latestDatesData } = useRegionLatestDates('argo', !isProductPage);
  const latestArgoDateString = latestDatesData?.regionLatestDates?.[0]?.latestDate;
  const latestArgoDate = latestArgoDateString ? dayjs(latestArgoDateString, DateFormat.DAY) : dayjs('invalid');

  const { argoData: argoDataProductPage, error: productPageError } = useArgoDataQuery({
    enabled: isProductPage && useDate.isValid(),
    queryKey: ['argoProfiles', useDate],
  });

  const { argoData: argoDataMapPage, error: mapPageError } = useArgoDataQuery({
    enabled: !isProductPage && latestArgoDate.isValid(),
    queryKey: ['latestArgoProfiles', latestArgoDate],
  });

  const argoData = isProductPage ? argoDataProductPage : argoDataMapPage;

  return { argoData, error: productPageError || mapPageError };
};

export default useArgoData;
