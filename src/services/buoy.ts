import dayjs, { Dayjs } from 'dayjs';
import apiClient from '@/services/httpClient';
import { BuoyTagsResponse } from '@/types/buoy';
import { DateFormat } from '@/types/date';

const fetchBuoyTags = async (date: Dayjs) => {
  const validatedDate = dayjs(date);
  if (!validatedDate.isValid()) {
    throw new Error('Invalid date format for Buoy tags. Please use YYYYMMDDHH.');
  }

  const response = await apiClient.get<BuoyTagsResponse>(
    `/tags/surface-waves/by-date/${validatedDate.format(DateFormat.HOUR)}`,
  );
  return response.data;
};

export { fetchBuoyTags };
