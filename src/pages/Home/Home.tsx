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
      <section className="md:flex md:gap-8">
        <div className="w-full md:w-2/3">
          <ProductsCarrousel />
        </div>
        <div className="mt-4 h-80 w-full md:mt-0 md:h-auto">
          <HomeMap />
        </div>
      </section>
      <section className="py-10 md:py-28">
        <HomeNews />
      </section>
    </>
  );
};

export default Home;
