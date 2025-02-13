import { useState, useEffect, useRef } from 'react';
import useMapStore from '@/stores/map-store/mapStore';
import { setProductId } from '@/stores/product-store/productStore';
import BasicMap from '@/components/Map/BasicMap';
import ErrorBoundary from '@/errors/error-boundary/ErrorBoundary';
import { initialMapViewState } from '@/configs/map';
import { productsData } from './data';

const HomeMapCarousel: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const selectedProduct = productsData[selectedProductIndex];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef<boolean>(false);

  const useMapZoom = useMapStore((state) => state.mapViewState.zoom);
  const useMapLatitude = useMapStore((state) => state.mapViewState.latitude);
  const useMapLongitude = useMapStore((state) => state.mapViewState.longitude);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleClick = (id: string) => {
    stopInterval();
    const foundIndexById = productsData.findIndex((product) => product.id === id);
    setSelectedProductIndex(foundIndexById);
  };

  // stops the cycling if user pans the map
  useEffect(() => {
    if (isMounted.current) {
      stopInterval();
    } else {
      isMounted.current = true;
    }
  }, [useMapZoom, useMapLatitude, useMapLongitude]);

  // cycle through list of products
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSelectedProductIndex((prevIndex) => (prevIndex + 1) % productsData.length);
    }, 2500);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  useEffect(() => {
    setProductId(selectedProduct.id);
  }, [selectedProduct.id]);

  return (
    <>
      <ErrorBoundary>
        <BasicMap
          minZoom={initialMapViewState.mapViewState.zoom}
          showCursorLocationPanel={false}
          style={{ borderRadius: '0.75rem 0.75rem 0 0', height: '100%' }}
        />
      </ErrorBoundary>

      <div className="flex flex-col rounded-b-xl border border-solid border-imos-calypso-blue border-opacity-60">
        <div className="flex min-h-36 flex-col px-10 py-10 md:py-6">
          <h2 className="pb-2 font-poppins text-lg font-semibold text-imos-dark-grey">{selectedProduct.title}</h2>
          <p className="font-open-sans text-base text-imos-grey">{selectedProduct.description}</p>
        </div>

        <div className="mb-10 flex justify-center gap-2">
          {productsData.map((_, index) => (
            <button
              key={index}
              className={`transition:background-color z-20 h-2.5 w-2.5 cursor-pointer rounded-full ${selectedProductIndex === index ? 'bg-imos-sea-blue' : 'bg-imos-light-grey'}`}
              onClick={() => handleClick(productsData[index].id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeMapCarousel;
