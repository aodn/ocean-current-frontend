import { useState, useEffect } from 'react';
import { productsData } from './data/ProductsData';
import ProductCarrouselCard from './ProductCarrouselCard';

const ProductCarrousel: React.FC = () => {
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    const switchSelectedProduct = () => {
      setProducts((currentProducts) => {
        return currentProducts.map((product, index, array) => {
          return {
            ...product,
            selected: index === (array.findIndex((p) => p.selected) + 1) % array.length,
          };
        });
      });
    };

    const intervalId = setInterval(switchSelectedProduct, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCarrouselCard
          key={product.id}
          title={product.title}
          description={product.description}
          selected={product.selected}
          imageUrl={product.imageUrl}
          id={product.id}
        />
      ))}
    </div>
  );
};

export default ProductCarrousel;
