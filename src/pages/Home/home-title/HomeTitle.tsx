import React from 'react';
import BgImage from '@/assets/images/background-home-image.jpg';

const HomeTitle: React.FC = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="md:-mb-10 md:text-right mb-12 flex h-96 flex-col items-center justify-center text-left font-lexend text-white"
    >
      <div className="p-8 text-center">
        <h1 className="md:text-8xl text-5xl font-semibold">
          <span className="block">OceanCurrent</span>
        </h1>
        <p className="md:text-2xl mt-4 text-xl font-light text-white">Up-to-date ocean information around Australia</p>
      </div>
    </section>
  );
};

export default HomeTitle;
