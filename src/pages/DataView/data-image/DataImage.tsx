import React from 'react';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { Loading } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';

interface DataImageProps {
  src: string;
  onError: () => void;
}

const DataImage: React.FC<DataImageProps> = ({ src, onError }) => {
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);
  return (
    <div className="relative h-full bg-white">
      {isProductImageLoading && <Loading className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <img
        className={cn('max-h-[80vh] w-full select-none object-contain', {
          'invisible opacity-0': isProductImageLoading,
        })}
        src={src}
        alt="product"
        onLoad={() => setIsProductImageLoading(false)}
        onError={() => {
          setIsProductImageLoading(false);
          onError();
        }}
      />
    </div>
  );
};

export default DataImage;
