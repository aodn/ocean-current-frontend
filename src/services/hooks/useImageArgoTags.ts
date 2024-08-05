import { Dayjs } from 'dayjs';
import { getArgoTags } from '@/services/argo';
import { parseArgoTagDataFromText } from '@/utils/argo-utils/argoTag';
import useDataFetch from './useDataFetch';

const useImageArgoTags = (date: Dayjs, tagPath: string, regionCode: string) => {
  // SnapshotCHL is a special case on the server side
  const regionPath = tagPath === 'SnapshotCHL' ? `${regionCode}_chl` : regionCode;

  const { data, loading, error } = useDataFetch(getArgoTags, [date, tagPath, regionPath]);
  const parsedData = data ? parseArgoTagDataFromText(data) : [];

  return { data: parsedData, loading, error };
};

export default useImageArgoTags;
