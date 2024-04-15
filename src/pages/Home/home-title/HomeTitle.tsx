import React from 'react';

const HomeTitle: React.FC = () => {
  return (
    <section className="my-12 text-left font-lexend text-imos-grey md:my-28 md:text-right">
      <h1 className="text-7xl font-thin uppercase md:text-9xl">
        <span className="block">Ocean</span>
        <span className="block">Current</span>
      </h1>
      <p className="mt-4 text-xl font-light text-imos-grey md:text-2xl">Surface Currents and Temperature</p>
    </section>
  );
};

export default HomeTitle;
