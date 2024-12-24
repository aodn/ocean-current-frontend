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

        <section className="flex h-[650px] w-full flex-col self-center rounded-xl">
          <HomeMapCarousel />
        </section>
      </section>

      <section className="relative flex w-full max-w-8xl flex-row self-center overflow-hidden py-10">
        <HomeProductCarousel />
      </section>

      <section className="w-full bg-imos-light-blue">
        <div className="flex flex-col items-center justify-between py-14">
          <h1 className="px-2 pb-8 text-center font-open-sans text-3xl font-medium text-imos-dark-grey md:text-4xl">
            {`${BrandingText.OC_PASCAL_CASE} ${News.NEWS}`}
          </h1>
          <Button
            type="tertiary"
            onClick={() => window.open('https://imos.org.au/news/category/imos-oceancurrent', '_blank')}
            className="h-12 min-w-40 self-center text-2xl"
          >
            {News.ALL_NEWS}
          </Button>
        </div>
      </section>
    </section>
  );
};

export default Home;
