import { ProductID } from '@/types/product';

export interface ProductCarouselCardProps extends Omit<HomeProductData, 'mainProduct' | 'subProduct'> {
  selected: boolean;
}

export interface HomeProductData {
  title: string;
  id: ProductID;
  description: string;
  mainProduct: string;
  subProduct: string | null;
}
