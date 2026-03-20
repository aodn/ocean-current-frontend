import React, { useEffect } from 'react';
import { resetArgoStore } from '@/stores/argo-store/argoStore';
import { resetMapStore } from '@/stores/map-store/mapStore';
import { BrandingText, News } from '@/constants/textConstant';
import { Button } from '@/components/Shared';
import HomeMapCarousel from './home-map-carousel/HomeMapCarousel';
import HomeProductCarousel from './home-product-carousel/HomeProductCarousel';

const Home: React.FC = () => {
  useEffect(() => {
    resetArgoStore();
    resetMapStore();
  }, []);

  return (
    <div className="flex w-full flex-col bg-white">
      <section className="flex w-full max-w-8xl flex-col justify-center self-center px-4 md:mt-10 md:flex-row md:px-8">
        <div className="my-4 flex flex-col items-center justify-center md:my-0 md:p-12">
          <h1 className="font-poppins text-4xl font-medium leading-none text-imos-dark-grey md:text-4xl md:leading-tight lg:text-5xl xl:text-7xl">
            {BrandingText.OC_PASCAL_CASE}
          </h1>
          <h2 className="mt-2 px-4 text-center font-open-sans text-xs font-normal text-imos-text-grey sm:text-sm md:mt-4 lg:text-lg xl:px-0 xl:text-xl">
            {BrandingText.OC_SUBHEADING}
          </h2>
        </div>

        <div className="flex h-[650px] w-full flex-col self-center rounded-xl">
          <HomeMapCarousel />
        </div>
      </section>

      <section className="relative flex w-full max-w-8xl flex-row self-center overflow-hidden py-4 md:py-10">
        <HomeProductCarousel />
      </section>

      <section className="w-full bg-imos-light-blue">
        <div className="flex flex-col items-center justify-between py-4 md:py-10">
          <h2 className="mb-4 px-2 text-center font-open-sans text-3xl font-medium text-imos-dark-grey md:mb-8 md:text-4xl">
            {`${BrandingText.OC_PASCAL_CASE} ${News.NEWS}`}
          </h2>
          <Button
            type="tertiary"
            onClick={() => window.open('https://imos.org.au/news/category/imos-oceancurrent', '_blank')}
            className="h-12 min-w-40 self-center text-2xl"
          >
            {News.ALL_NEWS}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
