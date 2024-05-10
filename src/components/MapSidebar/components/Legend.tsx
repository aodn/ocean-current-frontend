import React from 'react';

const ProductSideBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-4 p-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-[#FA10E2]"></div>
          <span className="text-imos-grey">Argo</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-[#838383]"></div>
          <span className="text-imos-grey">Mooring</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full border-2 border-[#838383]"></div>
          <span className="text-imos-grey">Ship</span>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rotate-45 bg-[#FA10E2]"></div>
          <span className="text-imos-grey">Glider</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3 flex flex-col">
            <div className="relative h-0.5 w-3 bg-[#FA10E2]">
              <div className="absolute -top-1 right-0 h-2 w-2 rotate-45 border-t-2 border-[#FA10E2]"></div>
            </div>
            <div className="relative mt-1 h-0.5 w-3 bg-[#2972FF]">
              <div className="absolute -top-[2px] right-0 h-2 w-2 rotate-45 border-r-2 border-[#2972FF]"></div>
            </div>
          </div>
          <span className="text-imos-grey">Radar</span>
        </div>

        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rotate-45 -skew-x-12 -skew-y-12 border-r-2 border-t-2 border-[#FA10E2]"></div>
          <span className="text-imos-grey">Drifter</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSideBar;
