import { OceanColourDateItem } from '@/types/date';
import { ImageFile, ImageListResponse } from '@/types/imageList';

/**
 * Extracts date from filename
 */
const extractDateFromFilename = (filename: string): string => {
  return filename.split('.')[0];
};

/**
 * Processes ocean colour image data to extract and format dates
 */
export const processOceanColourDateList = (
  oceanColourImageData: ImageListResponse[] | undefined,
): OceanColourDateItem[] => {
  if (!oceanColourImageData) {
    return [];
  }

  return oceanColourImageData
    .flatMap(
      (group) =>
        group.files?.map((file: ImageFile) => {
          const rawDate = extractDateFromFilename(file.name);
          return {
            date: rawDate,
            path: group.path,
          };
        }) || [],
    )
    .filter(({ date }) => /^\d+$/.test(date));
};
