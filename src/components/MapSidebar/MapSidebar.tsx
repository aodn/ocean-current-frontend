import React, { useState } from 'react';
import ArgoIcon from '@/assets/icons/argo-icon.svg';
import ArgoIdIcon from '@/assets/icons/argo-id-icon.svg';
import { Button } from '../Shared';
import BasicMap from '../Map/BasicMap';

const MapSidebar: React.FC = () => {
  const miniMapViewState = { zoom: 4, latitude: 26.587363418374622, longitude: 106.75139404079925 };
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 23));
  const depthPosition = [
    { text: '-0.4', position: 10, color: '#524dab' },
    { text: '-0.2', position: 30, color: '#5ed8e9' },
    { text: '0', position: 50, color: '#7de895' },
    { text: '0.2', position: 70, color: '#fdd768' },
    { text: '0.4', position: 90, color: '#ca705c' },
  ];
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const addDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  const subtractDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const handlePermlinkClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 500);
  };

  return (
    <>
      <div className="rounded-md border-2 border-imos-grey">
        <div className="flex justify-between bg-white p-2 pb-4">
          <img className="mx-6 object-cover" src={ArgoIcon} alt="" />
          <div>
            <h2 className="mb-2 text-lg font-semibold text-imos-black">Argo profiles</h2>
            <p className="text-imos-grey">Temperature and salinity down to 2000m in the Australian region</p>
          </div>
        </div>
        <div className="relative mb-10 h-2 w-full bg-background-argo-gradient">
          {depthPosition.map(({ text, position, color }, index) => (
            <div
              style={{ left: `${position}%` }}
              key={index}
              className="absolute top-2 flex flex-col items-center justify-center"
            >
              <div className="h-1 w-0.5 bg-imos-grey"></div>
              <div className="text-imos-grey">{text}</div>
              <div style={{ backgroundColor: color }} className="h-3 w-3 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="p-2">
          <div className="my-5">
            <Button size="full" borderRadius="small" type="primary">
              <img src={ArgoIdIcon} alt="" />
              aoml 59069115
            </Button>
          </div>
          {/* aqui */}
          <div className="my-4 flex items-center justify-between rounded-md border bg-background-gradient px-2 py-1 text-lg text-imos-title-blue shadow">
            <button onClick={subtractDay} className="rounded bg-white p-2 font-semibold ">
              <svg
                className="h-2.5 w-2.5 rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <span className="text-lg ">
              {currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <button onClick={addDay} className="rounded bg-white p-2 font-semibold ">
              <svg
                className="h-2.5 w-2.5 -rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          </div>
          {/* aqui */}
          <div className="mb-3 flex gap-3">
            <Button size="full" borderRadius="small" type="secondary">
              0-400m
            </Button>
            <Button size="full" borderRadius="small" type="secondary">
              0-2000m
            </Button>
          </div>
          <div className="relative">
            <Button size="full" borderRadius="small" type="secondary" onClick={handlePermlinkClick}>
              Permlink
            </Button>
            {showCopiedMessage && (
              <div className="absolute right-1/2 top-10 z-50 translate-x-1/2 rounded-md border-2 border-imos-black bg-white p-2">
                Link copied!
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 h-60 w-full overflow-hidden rounded-md">
        <BasicMap initialViewState={miniMapViewState} navigationControl={false} />
      </div>
    </>
  );
};

export default MapSidebar;
