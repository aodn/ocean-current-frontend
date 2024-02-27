import React from 'react';

const MapArea: React.FC = () => {
  return (
    <div className="w-full h-full border-2 border-black">
      <img
        src="https://oceancurrent.aodn.org.au/SST_entry/latest.gif"
        style={{
          height: '100%',
          width: '100%',
        }}
        alt=""
      />
    </div>
  );
};

export default MapArea;
