import React, { useEffect } from 'react';
import { resetArgoStore } from '@/stores/argo-store/argoStore';
import { resetMapStore } from '@/stores/map-store/mapStore';
import HomeProductCarrousel from './home-product-carrousel/HomeProductCarrousel';
import HomeTitle from './home-title/HomeTitle';
import HomeNews from './home-news/HomeNews';
import HomeMap from './home-map/HomeMap';
import HomeInWater from './home-in-water/HomeInWater';

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
      <section className="mx-auto mb-10 w-full max-w-8xl md:flex md:gap-4">
        <div className="w-full md:w-2/5">
          <HomeProductCarrousel />
        </div>
        <div className="mt-4 h-80 w-full md:mt-0 md:h-auto">
          <HomeMap />
        </div>
      </section>
      <section className="mx-auto w-full max-w-8xl py-10">
        <HomeInWater />
      </section>
      <section className="bg-[#E5E8ED]">
        <HomeNews />
      </section>
    </>
  );
};

export default Home;
