import React from 'react';
import { ProductCarrouselCardProps } from '../types/homeProductCarrousel.types';

const ProductCarrouselCard: React.FC<ProductCarrouselCardProps> = ({ title, description, selected, id }) => {
  const selectedBorderStyle = 'border-4 border-blue-500';
  const nonSelectedBorderStyle = 'border-4 border';

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

export default ProductCarrouselCard;
