import { Dayjs } from 'dayjs';
import { RegionScope } from '@/constants/region';

export interface DataImageProps {
  src: string;
  productId: string;
  date: Dayjs;
  regionCode: string;
  regionScope: RegionScope;
}
