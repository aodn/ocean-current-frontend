import dayjs from 'dayjs';
import httpClient from '@/services/httpClient';
import { ContentType } from '@/constants/request';

const getArgoProfilesByDate = async (date: string) => {
  const validatedDate = dayjs(date);
  if (validatedDate.isValid()) {
    return await httpClient.get<string>(`/profiles/map/${validatedDate.format('YYYYMMDD')}`, {
      headers: {
        'Content-Type': ContentType.Text,
      },
    });
  } else {
    throw new Error('Invalid date format for Argo profiles. Please use YYYYMMDD.');
  }
};

export { getArgoProfilesByDate };
