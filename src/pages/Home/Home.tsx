import React, { useEffect } from 'react';
import { resetArgoStore } from '@/stores/argo-store/argoStore';
import { resetMapStore } from '@/stores/map-store/mapStore';
import { BrandingText } from '@/constants/textConstant';
import HomeProductCarousel from './home-map-carousel/HomeMapCarousel';
import HomeNews from './home-news/HomeNews';
import HomeInWater from './home-in-water/HomeInWater';

const Home: React.FC = () => {
  useEffect(() => {
    resetArgoStore();
    resetMapStore();
  }, []);

  return (
    <section className="flex w-full flex-col bg-white">
      <section className="flex w-full max-w-8xl flex-col justify-center self-center sm:px-2 md:px-4 xl:mt-10 xl:flex-row xl:pr-8">
        <section className="my-8 flex flex-col items-center justify-center xl:my-0 xl:p-12">
          <h1 className="lg:text-7xl font-lexend text-[42px] font-medium text-imos-dark-grey md:text-6xl">
            {BrandingText.OC_PASCAL_CASE}
          </h1>
          <h2 className="lg:text-xl mt-2 px-4 text-center font-open-sans text-xs font-normal text-imos-text-grey sm:text-sm md:mt-4 md:text-lg xl:px-0">
            {BrandingText.OC_SUBHEADING}
          </h2>
        </section>

        <HomeProductCarousel />
      </section>
      <section className="w-full max-w-8xl self-center py-10">
        <HomeInWater />
      </section>
      <section className="bg-[#E5E8ED]">
        <HomeNews />
      </section>
    </section>
  );
};

export default Home;
