import { Dayjs } from 'dayjs';
import { getArgoTags } from '@/services/argo';
import { parseArgoTagDataFromText } from '@/utils/argo-utils/argoTag';
import useDataFetch from './useDataFetch';

const useImageArgoTags = (date: Dayjs, tagPath: string, regionCode: string) => {
  // SnapshotCHL is a special case on the server side
  // EAC Mooring Array has data from only one region - Brisbane
  const regionPath = (): string => {
    switch (tagPath) {
      case 'SnapshotCHL':
        return `${regionCode}_chl`;
      case 'EAC_array_figures':
        return 'Brisbane';
      default:
        return regionCode;
    }
  };

  const { data, loading, error } = useDataFetch(getArgoTags, [date, tagPath, regionPath()]);
  const parsedData = data ? parseArgoTagDataFromText(data) : null;
  return { data: parsedData, loading, error };
};

export default useImageArgoTags;
