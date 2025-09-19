import dayjs, { Dayjs } from 'dayjs';
import { ec2ProxyClient } from '@/services/httpClient';
import { ContentType } from '@/constants/request';
import { ArgoProfileCycle } from '@/types/argo';

const fetchArgoProfilesByDate = async (date: Dayjs) => {
  const validatedDate = dayjs(date);
  if (validatedDate.isValid()) {
    return await ec2ProxyClient.get<string>(`/profiles/map/${validatedDate.format('YYYYMMDD')}`, {
      headers: {
        'Content-Type': ContentType.Text,
      },
    });
  } else {
    throw new Error('Invalid date format for Argo profiles. Please use YYYYMMDD.');
  }
};

const fetchArgoProfileCyclesByWmoId = async (wmoId: string): Promise<ArgoProfileCycle[]> => {
  const res = await ec2ProxyClient.get<ArgoProfileCycle[]>(`/profiles/${wmoId}/profiles.json`);
  return res.data.sort((a, b) => a.date.localeCompare(b.date));
};

const fetchArgoTags = async (dateString: string, tagPath: string, regionPath: string) => {
  if (!dateString || !/^\d+$/.test(dateString)) {
    throw new Error('Invalid date format for Argo tags. Date must be a numeric string.');
  }

  return await ec2ProxyClient.get<string>(`/${tagPath}/TAGS/${regionPath}/${dateString}.txt`, {
    headers: {
      'Content-Type': ContentType.Text,
    },
  });
};

export { fetchArgoProfilesByDate, fetchArgoProfileCyclesByWmoId, fetchArgoTags };
