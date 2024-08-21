import { Dayjs } from 'dayjs';
import { Product } from '@/types/product';

export interface ErrorImageProps {
  date: Dayjs;
  product: Product;
}
