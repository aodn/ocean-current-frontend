import React, { useEffect } from 'react';
import { resetArgoStore } from '@/stores/argo-store/argoStore';
import { resetMapStore } from '@/stores/map-store/mapStore';
import HomeProductCarrousel from './home-product-carrousel/HomeProductCarrousel';
import HomeTitle from './home-title/HomeTitle';
import HomeNews from './home-news/HomeNews';
import HomeMap from './home-map/HomeMap';

const Home: React.FC = () => {
  useEffect(() => {
    resetArgoStore();
    resetMapStore();
  }, []);

  return (
    <>
      <section>
        <HomeTitle />
      </section>
      <section className="md:flex md:gap-8">
        <div className="w-full md:w-2/3">
          <HomeProductCarrousel />
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
