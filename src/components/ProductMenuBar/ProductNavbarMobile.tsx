import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Shared';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import MapIcon from '@/assets/icons/map-icon.svg';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import useProductStore from '@/stores/product-store/productStore';
import useProductDateFormat from '@/stores/product-store/hooks/useProductDateFormat';
import DatePagination from '../DatePagination';
import { ProductMenuBarProps } from './types/ProductMenuBar.types';

const ProductMenuBarMobile: React.FC<ProductMenuBarProps> = () => {
  const { mainProduct, subProduct } = useProductConvert();
  const { isArgo } = useProductCheck();
  const navigate = useNavigate();

  const productId = useProductStore((state) => state.productParams.productId);
  const dateFormat = useProductDateFormat();

  const handleReset = () => {
    // To be implemented
  };

  const handleRegionClick = () => {
    if (isArgo) {
      navigate('/map/argo');
    }
    if (mainProduct?.path && subProduct?.path) {
      const path = `/map/${mainProduct.path}/${subProduct.path}`;
      navigate(path);
    }
  };

  return (
    <div className="mb-2 rounded-md bg-[#FAFAFA] p-3">
      <div className="mb-2 w-full">
        <Button
          borderRadius="small"
          icon={<img src={MapIcon} alt="Map Icon" />}
          type="secondary"
          size="full"
          onClick={handleRegionClick}
        >
          Select {isArgo ? 'argo' : 'region'}
        </Button>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex h-11 items-center justify-center rounded-md border border-[#3A6F8F] p-2">
          <DatePagination productId={productId} dateFormat={dateFormat} isMobile />
        </div>

        <div
          onClick={handleReset}
          aria-hidden
          className="flex h-11 cursor-pointer items-center justify-center rounded-md border border-[#3A6F8F] p-2"
        >
          <img src={ResetIcon} alt="" />
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="mr-1 w-1/2">
          <Button
            borderRadius="small"
            type="secondary"
            size="full"
            onClick={() => {
              // To be implemented
            }}
          >
            Next image
          </Button>
        </div>

        <div className="ml-1 w-1/2">
          <Button
            borderRadius="small"
            type="secondary"
            size="full"
            onClick={() => {
              // To be implemented
            }}
          >
            Previous image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductMenuBarMobile;
