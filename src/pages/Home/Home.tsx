import React from 'react';
import ProductsCarrousel from './product-carrousel/ProductCarrousel';
import HomeTitle from './home-title/HomeTitle';
import HomeNews from './home-news/HomeNews';

const Home: React.FC = () => {
  return (
    <>
      <section>
        <HomeTitle />
        <div className="w-full md:w-1/3">
          <ProductsCarrousel />
        </div>
      </section>
      <section className="py-10 md:py-28">
        <HomeNews />
      </section>
    </>
  );
};

export default Home;
