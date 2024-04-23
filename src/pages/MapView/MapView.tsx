import React from 'react';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import MapSidebar from '@/components/MapSidebar/MapSidebar';

const MapView: React.FC = () => {
  return (
    <div className="my-9">
      <MapNavbar />
      <div className="flex p-4">
        <div className="mx-2 w-1/3">
          <MapSidebar />
        </div>
        <div className="w-2/3">
          <img src="https://oceancurrent.aodn.org.au/profiles/5904654/20240420_5904654_311.gif" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MapView;
