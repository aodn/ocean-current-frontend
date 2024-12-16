import React from 'react';
import { ProductCarouselCardProps } from '../types/homeProductCarousel.types';

const ProductCarouselCard: React.FC<ProductCarouselCardProps> = ({ title, description, selected, id }) => {
  const selectedBorderStyle = 'border-l-8 border-imos-sea-blue border-2';
  const nonSelectedBorderStyle = 'border-l-8 border border-2 border-transparent';

  return (
    <div
      data-testid={`product-card-${id}`}
      className={`flex h-auto cursor-pointer items-stretch justify-between rounded-xl bg-white font-noto shadow md:h-36 ${selected ? selectedBorderStyle : nonSelectedBorderStyle}`}
    >
      <div className="flex flex-col justify-between p-4">
        <div className="text-lg font-semibold text-imos-black">{title}</div>
        <div className="text-base text-imos-grey">{description}</div>
      </div>
    </div>
  );
};

export default ProductCarouselCard;
