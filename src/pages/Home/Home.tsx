import React from 'react';
import ProductsCarrousel from './product-carrousel/ProductCarrousel';

const Home: React.FC = () => {
  return (
    <section>
      <div className="w-1/3">
        <ProductsCarrousel />
      </div>
    </section>
  );
};

export default Home;
