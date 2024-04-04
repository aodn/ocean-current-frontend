import React from 'react';
import ProductsCarrousel from './product-carrousel/ProductCarrousel';
import HomeTitle from './home-title/HomeTitle';

const Home: React.FC = () => {
  return (
    <section>
      <HomeTitle />
      <div className="w-1/3">
        <ProductsCarrousel />
      </div>
    </section>
  );
};

export default Home;
