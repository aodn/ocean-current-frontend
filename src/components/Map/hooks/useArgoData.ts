import dayjs from 'dayjs';
import { useSearchParams } from 'react-router';
import { useRegionLatestDates } from '@/services/hooks';
import useDateStore from '@/stores/date-store/dateStore';
import { DateFormat } from '@/types/date';
import { useCurrentPage } from '@/hooks/useCurrentPage/useCurrentPage';
import { APP_ROUTES } from '@/routers/routes';
import useArgoDataQuery from './useArgoDataQuery';

/**
 * Hook to fetch Argo data based on the current page context.
 *
 * On the product page, it fetches Argo data for the user-selected date.
 * On other pages (map page), it fetches Argo data for the date in the URL
 * query params (?date), falling back to the latest available date.
 *
 * @returns {Object} An object containing:
 *   - argoData: GeoJSON FeatureCollection of Argo profiles
 *   - error: Error object if the query failed, undefined otherwise
 */
const useArgoData = () => {
  const currentPage = useCurrentPage();
  const isProductPage = currentPage === APP_ROUTES.PRODUCT;

  const useDate = useDateStore((state) => state.date);
  const [searchParams] = useSearchParams();

  const { data: latestDatesData } = useRegionLatestDates('argo', !isProductPage);
  const latestArgoDateString = latestDatesData?.regionLatestDates?.[0]?.latestDate;
  const latestArgoDate = latestArgoDateString ? dayjs(latestArgoDateString, DateFormat.DAY) : dayjs('invalid');

  const mapPageDateParam = !isProductPage ? searchParams.get('date') : null;
  const mapPageDate = mapPageDateParam ? dayjs(mapPageDateParam, DateFormat.DAY) : latestArgoDate;

  const { argoData: argoDataProductPage, error: productPageError } = useArgoDataQuery({
    enabled: isProductPage && useDate.isValid(),
    queryKey: ['argoProfiles', useDate],
  });

  const { argoData: argoDataMapPage, error: mapPageError } = useArgoDataQuery({
    enabled: !isProductPage && mapPageDate.isValid(),
    queryKey: ['latestArgoProfiles', mapPageDate],
  });

  const argoData = isProductPage ? argoDataProductPage : argoDataMapPage;

  return { argoData, error: productPageError || mapPageError };
};

export default useArgoData;
