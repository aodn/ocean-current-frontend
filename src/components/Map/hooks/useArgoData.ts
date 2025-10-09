import dayjs from 'dayjs';
import { useRegionLatestDates } from '@/services/hooks';
import useDateStore from '@/stores/date-store/dateStore';
import { DateFormat } from '@/types/date';
import { useCurrentPage } from '@/hooks/useCurrentPage/useCurrentPage';
import useArgoDataQuery from './useArgoDataQuery';

const useArgoData = () => {
  const useDate = useDateStore((state) => state.date);
  const latestArgoDateString = useRegionLatestDates('argo').data?.regionLatestDates?.[0]?.latestDate;
  const latestArgoDate = dayjs(latestArgoDateString, DateFormat.DAY);

  const currentPage = useCurrentPage();
  const isProductPage = currentPage === '/product';

  const { argoData: argoDataProductPage } = useArgoDataQuery({
    enabled: isProductPage && useDate.isValid(),
    queryKey: ['argoProfiles', useDate],
  });

  const { argoData: argoDataMapPage } = useArgoDataQuery({
    enabled: !isProductPage && latestArgoDate.isValid(),
    queryKey: ['latestArgoProfiles', latestArgoDate],
  });

  const argoData = isProductPage ? argoDataProductPage : argoDataMapPage;

  return { argoData };
};

export default useArgoData;
