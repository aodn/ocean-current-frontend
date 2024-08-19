import React from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ArgoIcon from '@/assets/icons/products/argo-icon.svg';
import ArgoIdIcon from '@/assets/icons/argo-id-icon.svg';
import useArgoStore, { setArgoDepth } from '@/stores/argo-store/argoStore';
import { Button } from '@/components/Shared';
import MiniMap from './MiniMap';

const ArgoSideBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const useArgo = useArgoStore((state) => state.selectedArgoParams);
  const { worldMeteorologicalOrgId, cycle } = useArgo;
  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');

  const depthPosition = [
    { text: '-0.4', position: 10, color: '#524dab' },
    { text: '-0.2', position: 30, color: '#5ed8e9' },
    { text: '0', position: 50, color: '#7de895' },
    { text: '0.2', position: 70, color: '#fdd768' },
    { text: '0.4', position: 90, color: '#ca705c' },
  ];

  const changeDepth = (newDepth: '0' | '1') => {
    setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth: newDepth, date });
    setArgoDepth(newDepth);
  };

  return (
    <div className="rounded-md bg-white">
      <div className="h-60 w-full overflow-hidden">
        <MiniMap />
      </div>
      <div className="relative">
        <div className="flex items-center justify-between bg-white p-2 pb-4">
          <img className="mx-6 h-16 w-14 object-cover" src={ArgoIcon} alt="argo-icon" />
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
            <div className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border bg-imos-mid-grey px-12 py-1 text-lg  text-white transition duration-300 ease-in-out">
              <img src={ArgoIdIcon} alt="argo id icon" />
              aoml {worldMeteorologicalOrgId}
            </div>
          </div>
          <div className="mb-3 flex gap-3">
            <Button
              onClick={() => changeDepth('1')}
              size="full"
              borderRadius="small"
              type={useArgo.depth === '1' ? 'primary' : 'secondary'}
            >
              0-400m
            </Button>
            <Button
              onClick={() => changeDepth('0')}
              size="full"
              borderRadius="small"
              type={useArgo.depth === '0' ? 'primary' : 'secondary'}
            >
              0-2000m
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArgoSideBar;
