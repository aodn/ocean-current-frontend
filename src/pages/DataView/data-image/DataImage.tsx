import React, { useEffect, useRef } from 'react';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { LinearProgress } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';

interface DataImageProps {
  src: string;
  onError: () => void;
}

const DataImage: React.FC<DataImageProps> = ({ src, onError }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);
  // onLoad won't fire if the src doesn't change (e.g. two dates that map to the same image URL).
  // Defer the complete check to a macrotask so React has committed all pending updates
  // (Zustand + React Router) before we evaluate whether the image is already loaded.
  useEffect(() => {
    if (!isProductImageLoading) return;
    const id = setTimeout(() => {
      if (imgRef.current?.complete) {
        setIsProductImageLoading(false);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [isProductImageLoading]);

  return (
    <div className="relative h-full bg-white">
      {isProductImageLoading ? (
        <LinearProgress className="absolute left-0 right-0 top-0" />
      ) : (
        <div className="left-0 right-0 top-0 h-1" />
      )}{' '}
      <img
        ref={imgRef}
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
