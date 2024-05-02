export interface ProductCarrouselCardProps extends HomeProductData {
  selected: boolean;
}

export interface HomeProductData {
  title: string;
  id: string;
  description: string;
  imageUrl: string;
}
