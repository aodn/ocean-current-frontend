import React from 'react';
import { BrandingText } from '@/constants/textConstant';

const HomeTitle: React.FC = () => {
  return (
    <section className="my-8 flex h-full flex-col items-center justify-center xl:my-0 xl:p-14">
      <h1 className="lg:text-7xl font-lexend text-5xl font-medium text-imos-dark-grey md:text-6xl">
        {BrandingText.OC_PASCAL_CASE}
      </h1>
      <h2 className="lg:text-xl mt-4 font-open-sans text-sm font-normal text-imos-text-grey md:text-lg">
        {BrandingText.OC_SUBHEADING}
      </h2>
    </section>
  );
};

export default HomeTitle;
