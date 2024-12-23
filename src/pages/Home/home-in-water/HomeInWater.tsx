import React from 'react';
import { Link } from 'react-router-dom';
import { linksData } from '@/data/linksData';

const HomeInWater: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-7">
        {linksData.map((section) => (
          <>
            {section.links ? (
              <>
                {section.links.map((link) => (
                  <div key={link.id} className="flex flex-col flex-wrap">
                    <Link
                      to={link.url}
                      className="flex h-full cursor-pointer flex-col items-center justify-evenly rounded-lg bg-white p-4 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                    >
                      <img src={link.imageUrl} alt={link.description} className="w-2h-24 mb-2 h-24" />
                      <span className="text-base text-imos-grey">{link.title}</span>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default HomeInWater;
