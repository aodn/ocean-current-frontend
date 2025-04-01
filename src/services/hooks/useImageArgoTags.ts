import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { getArgoTags } from '@/services/argo';
import { parseArgoTagDataFromText } from '@/utils/argo-utils/argoTag';
import useDataFetch from './useDataFetch';

const useImageArgoTags = (date: Dayjs, tagPath: string, regionCode: string) => {
  // SnapshotCHL is a special case on the server side (OceanColour)
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
  // to avoid unnecessary state updates
  const parsedData = useMemo(() => (data ? parseArgoTagDataFromText(data) : []), [data]);
  return { data: parsedData, loading, error };
};

export default useImageArgoTags;
