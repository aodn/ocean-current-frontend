import React from 'react';
import { ProductData } from '../types/ProductCarrousel.types';

const ProductCarrouselCard: React.FC<ProductData> = ({ title, description, selected, imageUrl, id }) => {
  const selectedBorderStyle = 'border-4 border-blue-500';
  const nonSelectedBorderStyle = 'border-4 border';

  return (
    <div
      data-testid={`product-card-${id}`}
      className={`flex h-auto cursor-pointer items-stretch justify-between rounded-xl bg-white font-noto shadow md:h-40 [&:not(:last-child)]:mb-5 ${selected ? selectedBorderStyle : nonSelectedBorderStyle}`}
    >
      <div className="flex flex-col justify-between p-4">
        <div className="text-lg font-semibold text-imos-black">{title}</div>
        <div className="text-base text-imos-grey">{description}</div>
      </div>
      <img alt={`${id} map`} src={imageUrl} className="w-1/3 rounded-br-xl rounded-tr-xl object-cover" />
    </div>
  );
};

export default ProductCarrouselCard;
