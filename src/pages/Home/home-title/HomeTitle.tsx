import React from 'react';

const HomeTitle: React.FC = () => {
  return (
    <section className="mb-28 pt-10 text-right font-lexend text-[#8C8C8C]">
      <h1 className="text-9xl font-thin uppercase">
        <span className="block">Ocean</span>
        <span className="block">Current</span>
      </h1>
      <p className="mt-4 text-3xl font-light">Surface Currents and Temperature</p>
    </section>
  );
};

export default HomeTitle;
