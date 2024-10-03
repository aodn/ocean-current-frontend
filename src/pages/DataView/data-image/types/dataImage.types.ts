import { Dayjs } from 'dayjs';
import { RegionScope } from '@/constants/region';

export interface DataImageArgoContainerProps {
  src: string;
  productId: string;
  date: Dayjs;
  regionCode: string;
  regionScope: RegionScope;
}
