import { formatDateByProductId } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { OceanColourDateItem } from '@/types/date';
import { ImageFile, ImageListResponse } from '@/types/imageList';
import { RegionScope } from '@/constants/region';

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
  regionScope: RegionScope,
): OceanColourDateItem[] => {
  if (!oceanColourImageData) {
    return [];
  }

  return oceanColourImageData
    .flatMap(
      (group) =>
        group.files?.map((file: ImageFile) => {
          const rawDate = extractDateFromFilename(file.name);
          try {
            const formattedDate = formatDateByProductId('oceanColour-chlA', rawDate, regionScope);
            return {
              date: formattedDate,
              path: group.path,
            };
          } catch {
            return {
              date: rawDate,
              path: group.path,
            };
          }
        }) || [],
    )
    .filter(({ date }) => /^\d+$/.test(date));
};
