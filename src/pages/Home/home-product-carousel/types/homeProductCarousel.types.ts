export interface ProductCarouselCardProps extends Omit<HomeProductData, 'mainProduct' | 'subProduct'> {
  selected: boolean;
}

export interface HomeProductData {
  title: string;
  id: string;
  description: string;
  mainProduct: string;
  subProduct: string | null;
}
