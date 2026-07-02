import { useState, useEffect, useRef, useCallback } from 'react';
import { setProductId } from '@/stores/product-store/productStore';
import BasicMap from '@/components/Map/BasicMap';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import { cn } from '@/utils/classname-util/cn';
import { ProductID } from '@/types/product';
import { productsData } from './data';

const CAROUSEL_INTERVAL_MS = 2500;

const HomeMapCarousel: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const mapInnerRef = useRef<HTMLDivElement | null>(null);

  const selectedProduct = productsData[selectedProductIndex];

  const stopCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCarousel = useCallback(() => {
    stopCarousel();

    intervalRef.current = setInterval(() => {
      setSelectedProductIndex((prevIndex) => (prevIndex + 1) % productsData.length);
    }, CAROUSEL_INTERVAL_MS);
  }, [stopCarousel]);

  const handleProductSelect = useCallback(
    (id: ProductID) => {
      stopCarousel();
      const selectedIndex = productsData.findIndex((product) => product.id === id);
      setSelectedProductIndex(selectedIndex);
    },
    [stopCarousel],
  );

  useEffect(() => {
    startCarousel();
    return () => {
      stopCarousel();
    };
  }, [startCarousel, stopCarousel]);

  useEffect(() => {
    setProductId(selectedProduct.id);
  }, [selectedProduct.id]);

  return (
    <div className="flex h-full flex-col" onMouseEnter={stopCarousel} onMouseLeave={startCarousel}>
      <div className="relative flex-1" ref={mapWrapperRef}>
        <div className="h-full" ref={mapInnerRef}>
          <ErrorBoundary>
            <BasicMap
              showCursorLocationPanel={false}
              style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
              mapWrapperRef={mapInnerRef}
              onMoveStart={stopCarousel}
              onContainerResize={startCarousel}
              disableRegionAutoFit
            />
          </ErrorBoundary>
        </div>
      </div>

      <div className="border-imos-calypso-blue/60 flex flex-col rounded-b-xl border border-solid px-4 pt-6 pb-3 md:px-6">
        <div className="flex flex-col md:min-h-32">
          <h2
            className="font-poppins text-imos-nav-text text-lg font-semibold"
            data-testid="map-carousel-product-title"
          >
            {selectedProduct.title}
          </h2>
          <p className="font-open-sans text-imos-dark-grey mt-2 text-base">{selectedProduct.description}</p>
        </div>

        <div className="flex justify-center gap-2">
          {productsData.map((product, index) => (
            <button
              key={product.id}
              aria-label={`View ${product.title}`}
              className={cn('z-20 h-2.5 w-2.5 cursor-pointer rounded-full transition-colors', {
                'bg-imos-sea-blue': selectedProductIndex === index,
                'bg-imos-light-grey': selectedProductIndex !== index,
              })}
              onClick={() => handleProductSelect(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMapCarousel;
