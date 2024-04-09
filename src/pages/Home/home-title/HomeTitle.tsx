import React from 'react';

const HomeTitle: React.FC = () => {
  return (
    <section className="my-28 text-right font-lexend text-imos-grey">
      <h1 className="text-9xl font-thin uppercase">
        <span className="block">Ocean</span>
        <span className="block">Current</span>
      </h1>
      <p className="mt-4 text-2xl font-light text-imos-grey">Surface Currents and Temperature</p>
    </section>
  );
};

export default HomeTitle;
