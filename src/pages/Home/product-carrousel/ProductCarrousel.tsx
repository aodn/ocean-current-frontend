import { useState, useEffect } from 'react';
import { setProductKey } from '@/stores/product-store/productStore';
import { productsData } from './data/ProductsData';
import ProductCarrouselCard from './components/ProductCarrouselCard';

const ProductCarrousel: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  const selectedProduct = productsData[selectedProductIndex];

  useEffect(() => {
    const switchSelectedProduct = () => {
      setSelectedProductIndex((preSelectedIndex) => (preSelectedIndex + 1) % productsData.length);
    };

    const intervalIndex = setInterval(switchSelectedProduct, 5000);

    return () => clearInterval(intervalIndex);
  }, []);

  useEffect(() => {
    setProductKey(selectedProduct.id);
  }, [selectedProduct.id]);

  return (
    <div>
      {productsData.map((product) => (
        <ProductCarrouselCard
          key={product.id}
          title={product.title}
          description={product.description}
          selected={selectedProduct.id === product.id}
          imageUrl={product.imageUrl}
          id={product.id}
        />
      ))}
    </div>
  );
};

export default ProductCarrousel;
