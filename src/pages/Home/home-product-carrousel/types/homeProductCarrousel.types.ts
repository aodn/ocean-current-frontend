export interface ProductCarrouselCardProps extends Omit<HomeProductData, 'mainProduct' | 'subProduct'> {
  selected: boolean;
}

export interface HomeProductData {
  title: string;
  id: string;
  description: string;
  imageUrl: string;
  mainProduct: string;
  subProduct: string | null;
}
