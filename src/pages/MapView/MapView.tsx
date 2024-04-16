import React from 'react';
import MapNavbar from '@/components/MapNavbar/MapNavbar';

const MapView: React.FC = () => {
  return (
    <div className="my-9">
      <MapNavbar />
      <div className="flex p-4">
        <div className="w-1/3 bg-white">Sidebar</div>
        <div className="w-2/3">Map</div>
      </div>
      <div className="bg-white p-4">Time</div>
    </div>
  );
};

export default MapView;
