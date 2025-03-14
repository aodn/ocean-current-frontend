import { Dayjs } from 'dayjs';
import { ProductGroupID, ProductID } from '@/types/product';

export interface ErrorImageProps {
  date: Dayjs;
  productId: ProductID | ProductGroupID;
}
