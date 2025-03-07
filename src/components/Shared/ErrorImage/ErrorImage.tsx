import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundIcon from '@/assets/icons/not-found-icon.svg';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import Button from '../Button/Button';
import { ErrorImageProps } from './types/ErrorImageProps';

const ErrorImage: React.FC<ErrorImageProps> = ({ date, productId }) => {
  return (
    <div className="flex h-[80%] flex-col items-center justify-center rounded bg-white px-4 py-12">
      <img src={NotFoundIcon} alt="not found icon" />
      <p className="my-4 flex items-center text-xl font-bold text-gray-600">
        {date.format('DD MMM YYYY')} is not available for this product and/or region
      </p>
      <p className="mb-8 max-w-lg text-center text-gray-600">Try another date or region, or check back later.</p>
      <Button type="primary">
        <Link className="mr-auto" to={`/map/${getProductPathWithSubProduct(productId)}`}>
          Back to map
        </Link>
      </Button>
    </div>
  );
};

export default ErrorImage;
