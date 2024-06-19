import { useState, useEffect, useRef } from 'react';
import useMapStore from '@/stores/map-store/mapStore';
import { setProductId } from '@/stores/product-store/productStore';
import { productsData } from './data/homeProductsData';
import HomeProductCarrouselCard from './components/HomeProductCarrouselCard';

const HomeProductCarrousel: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const selectedProduct = productsData[selectedProductIndex];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef<boolean>(false);

  const useZoom = useMapStore((state) => state.mapViewState.zoom);

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
  }, [useZoom]);

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
        <li className="[&:not(:last-child)]:mb-5" key={product.id} onClick={() => handleClick(product.id)} aria-hidden>
          <HomeProductCarrouselCard
            title={product.title}
            description={product.description}
            selected={selectedProduct.id === product.id}
            imageUrl={product.imageUrl}
            id={product.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default HomeProductCarrousel;
