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

const getArgoTags = async (date: Dayjs, tagPath: string, region: string) => {
  const validateDate = dayjs(date);

  if (validateDate.isValid()) {
    return await httpClient.get<string>(`/${tagPath}/TAGS/${region}/${validateDate.format('YYYYMMDD')}.txt`, {
      headers: {
        'Content-Type': ContentType.Text,
      },
    });
  } else {
    throw new Error('Invalid date format for Argo tags. Please use YYYYMMDD.');
  }
};

export { getArgoProfilesByDate, getArgoProfileCyclesByWmoId, getArgoTags };
