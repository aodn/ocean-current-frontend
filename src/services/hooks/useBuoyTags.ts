import { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { fetchBuoyTags } from '@/services/buoy';
import { sharedQueryConfig } from '@/configs/query';
import { DateFormat } from '@/types/date';

const useBuoyTags = (date: Dayjs) => {
  const formattedDate = date.format(DateFormat.HOUR);
  const { data, isLoading, error } = useQuery({
    queryKey: ['buoyTags', formattedDate],
    queryFn: () => fetchBuoyTags(date),
    ...sharedQueryConfig,
    staleTime: 5000,
  });
  return { data, loading: isLoading, error };
};

export default useBuoyTags;
