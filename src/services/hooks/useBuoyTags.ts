import { Dayjs } from 'dayjs';
import { fetchBuoyTags } from '@/services/buoy';
import useDataFetch from './useDataFetch';

const useBuoyTags = (date: Dayjs) => {
  const { data, loading, error } = useDataFetch(fetchBuoyTags, [date]);
  return { data: data || null, loading, error };
};

export default useBuoyTags;
