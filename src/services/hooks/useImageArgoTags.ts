import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchArgoTags } from '@/services/argo';
import { parseArgoTagDataFromText } from '@/utils/argo-utils/argoTag';
import { sharedQueryConfig } from '@/configs/query';
import { DateFormat } from '@/types/date';

interface UseImageArgoTagsOptions {
  date: Dayjs;
  tagPath: string;
  regionCode: string;
  dateFormat: DateFormat;
}

const useImageArgoTags = ({ date, tagPath, regionCode, dateFormat }: UseImageArgoTagsOptions) => {
  if (!tagPath) throw new Error('tag path is null');
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

  const formattedDate = date.format(dateFormat);

  const { data, isLoading, error } = useQuery({
    queryKey: ['argoTags', formattedDate, tagPath, regionPath()],
    queryFn: () => fetchArgoTags(formattedDate, tagPath, regionPath()),
    ...sharedQueryConfig,
  });

  const parsedData = useMemo(() => (data ? parseArgoTagDataFromText(data) : []), [data]);
  return { data: parsedData, loading: isLoading, error };
};

export default useImageArgoTags;
