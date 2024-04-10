import React from 'react';
import ProductsCarrousel from './product-carrousel/ProductCarrousel';
import HomeTitle from './home-title/HomeTitle';
import HomeNews from './home-news/HomeNews';
import HomeMap from './home-map/HomeMap';

const Home: React.FC = () => {
  return (
    <>
      <section>
        <HomeTitle />
      </section>
      <section className="flex">
        <div className="w-1/3">
          <ProductsCarrousel />
        </div>
        <div className="flex-1">
          <HomeMap />
        </div>
      </section>
      <section className="py-28">
        <HomeNews />
      </section>
    </>
  );
};

export default Home;
