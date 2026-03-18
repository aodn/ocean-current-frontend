import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchArgoTags } from '@/services/argo';
import { parseImageTagsFromText } from '@/utils/argo-utils/argoTag';
import { sharedQueryConfig } from '@/configs/query';
import { DateFormat } from '@/types/date';

interface UseImageTagsOptions {
  date: Dayjs;
  tagPath: string;
  regionCode: string;
  dateFormat: DateFormat;
}

const useImageTags = ({ date, tagPath, regionCode, dateFormat }: UseImageTagsOptions) => {
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
    queryKey: ['imageTags', formattedDate, tagPath, regionPath()],
    queryFn: () => fetchArgoTags(formattedDate, tagPath, regionPath()),
    ...sharedQueryConfig,
  });

  const parsedData = useMemo(() => (data ? parseImageTagsFromText(data) : []), [data]);
  return { data: parsedData, loading: isLoading, error };
};

export default useImageTags;
