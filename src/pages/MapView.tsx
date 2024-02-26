import MapArea from '@/components/pages/MapViewPage/MapArea';
import SideNavBar from '@/components/pages/MapViewPage/SideNavBar';
import React from 'react';

const MapView: React.FC = () => {
  return (
    <div className="h-full bg-blue-200 border flex flex-col">
      <h2 className="mb-4">MapData Page</h2>
      <div className="flex grow">
        <div className="w-80">
          <SideNavBar />
        </div>
        <div className="grow">
          <MapArea />
        </div>
      </div>
    </div>
  );
};

export default MapView;
