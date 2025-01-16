import { Dayjs } from 'dayjs';
import { RegionScope } from '@/constants/region';

export interface DataImageWithCurrentMetersMapProps {
  src: string;
  productId: string;
  regionCode: string;
  regionScope?: RegionScope;
  date: Dayjs;
}
