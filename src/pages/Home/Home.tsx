import React, { useEffect } from 'react';
import { resetArgoStore } from '@/stores/argo-store/argoStore';
import { resetMapStore } from '@/stores/map-store/mapStore';
import { BrandingText } from '@/constants/textConstant';
import HomeMapCarousel from './home-map-carousel/HomeMapCarousel';
import HomeProductCarousel from './home-product-carousel/HomeProductCarousel';
import { HomeNews } from './home-news/HomeNews';

const Home: React.FC = () => {
  useEffect(() => {
    resetArgoStore();
    resetMapStore();
  }, []);

  return (
    <div className="flex w-full flex-col bg-white">
      <section className="max-w-8xl flex w-full flex-col justify-center self-center px-4 md:mt-10 md:flex-row md:px-8">
        <div className="my-4 flex flex-col items-center justify-center md:my-0 md:p-12">
          <h1 className="font-poppins text-imos-dark-grey text-4xl leading-none font-medium md:text-4xl md:leading-tight lg:text-5xl xl:text-7xl">
            {BrandingText.OC_PASCAL_CASE}
          </h1>
          <h2 className="font-open-sans text-imos-text-grey mt-2 px-4 text-center text-xs font-normal sm:text-sm md:mt-4 lg:text-lg xl:px-0 xl:text-xl">
            {BrandingText.OC_SUBHEADING}
          </h2>
        </div>

        <div className="flex h-[650px] w-full flex-col self-center rounded-xl">
          <HomeMapCarousel />
        </div>
      </section>

      <section className="max-w-8xl relative flex w-full flex-row self-center overflow-hidden py-4 md:py-10">
        <HomeProductCarousel />
      </section>

      <section className="bg-imos-light-blue w-full py-4 md:py-10">
        <HomeNews />
      </section>
    </div>
  );
};

export default Home;
