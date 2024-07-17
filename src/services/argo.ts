import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import httpClient from '@/services/httpClient';
import { ContentType } from '@/constants/request';
import { ArgoProfileCycle } from '@/types/argo';
import { argoProfileS3BaseUrl } from '@/configs/image';

const getArgoProfilesByDate = async (date: Dayjs) => {
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

const getArgoProfileCyclesByWmoId = async (wmoId: string) =>
  axios.get<ArgoProfileCycle[]>(`${argoProfileS3BaseUrl}/${wmoId}/profiles.json`);

export { getArgoProfilesByDate, getArgoProfileCyclesByWmoId };
