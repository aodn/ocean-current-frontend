import { useState, useEffect, useRef } from 'react';
import useMapStore from '@/stores/map-store/mapStore';
import { setProductId } from '@/stores/product-store/productStore';
import { productsData } from './data/homeProductsData';
import HomeProductCarouselCard from './components//HomeProductCarouselCard';

const HomeProductCarousel: React.FC = () => {
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

  useEffect(() => {
    if (isMounted.current) {
      stopInterval();
    } else {
      isMounted.current = true;
    }
  }, [useMapZoom, useMapLatitude, useMapLongitude]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const switchSelectedProduct = () => {
        setSelectedProductIndex((preSelectedIndex) => (preSelectedIndex + 1) % productsData.length);
      };
      intervalRef.current = setInterval(switchSelectedProduct, 2500);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      stopInterval();
    };
  }, []);

  useEffect(() => {
    setProductId(selectedProduct.id);
  }, [selectedProduct.id]);

  return (
    <ul>
      {productsData.map((product) => (
        <li className="[&:not(:last-child)]:mb-2" key={product.id} onClick={() => handleClick(product.id)} aria-hidden>
          <HomeProductCarouselCard
            title={product.title}
            description={product.description}
            selected={selectedProduct.id === product.id}
            id={product.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default HomeProductCarousel;
