import React from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const DataView: React.FC = () => {
  const [searchParams] = useSearchParams();

  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
  const cycle = searchParams.get('cycle') || '';
  const depth = searchParams.get('depth') === '1' ? '1' : '0';

  const buildArgoUrlImg2 = (): string => {
    const profiles = depth === '0' ? 'profiles' : 'profiles_s';
    return `https://oceancurrent.aodn.org.au/${profiles}/${worldMeteorologicalOrgId}/${date}_${worldMeteorologicalOrgId}_${cycle}.gif`;
  };

  const buildArgoUrlImg = (): string => {
    return 'https://oceancurrent.aodn.org.au/SST_4hr/SST_Filled/Adelaide/2024022118.gif';
  };

  return (
    <div className="flex p-4">
      <div className="w-full">
        <img src={buildArgoUrlImg()} alt="" />
      </div>
    </div>
  );
};

export default DataView;
