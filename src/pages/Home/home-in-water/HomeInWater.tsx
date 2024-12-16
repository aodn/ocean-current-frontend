import React from 'react';
import { Link } from 'react-router-dom';
import { homeInWaterData } from './data/homeInWaterData';

const HomeInWater: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="mb-10 text-center text-2xl text-imos-black">Explore More Ocean Data</h2>
      <div className="md:grid-cols-7 grid grid-cols-2 gap-6">
        {homeInWaterData.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className="flex h-full cursor-pointer flex-col items-center justify-evenly rounded-lg bg-white p-4 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
          >
            <img src={item.icon} alt={item.name} className="w-2h-24 mb-2 h-24" />
            <span className="text-base text-imos-grey">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeInWater;
