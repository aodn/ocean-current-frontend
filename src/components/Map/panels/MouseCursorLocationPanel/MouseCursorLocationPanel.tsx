import React from 'react';

interface MouseCursorLocationPanelProps {
  lat?: number;
  lng?: number;
}

const MouseCursorLocationPanel: React.FC<MouseCursorLocationPanelProps> = ({ lat, lng }) => {
  return (
    <div className="absolute bottom-0 mb-[10px] ml-[10px] w-36 rounded bg-white p-1 text-[14px] shadow-[0_0_0_2px_rgba(0,0,0,0.1)]">
      <div className="flex h-full w-full items-center justify-center bg-transparent">
        {lat?.toFixed(4)} | {lng?.toFixed(4)}
      </div>
    </div>
  );
};

export default MouseCursorLocationPanel;
