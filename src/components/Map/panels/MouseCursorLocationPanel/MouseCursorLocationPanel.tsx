import React from 'react';

interface MouseCursorLocationPanelProps {
  lat: number;
  lng: number;
}

const MouseCursorLocationPanel: React.FC<MouseCursorLocationPanelProps> = ({ lat, lng }) => {
  return (
    <div className="absolute ml-[10px] mt-[10px] w-32 rounded bg-white p-2 shadow-[0_0_0_2px_rgba(0,0,0,0.1)] ">
      <div className="flex h-full w-full items-center justify-center bg-transparent">
        {lng?.toFixed(4)} | {lat?.toFixed(4)}
      </div>
    </div>
  );
};

export default MouseCursorLocationPanel;
