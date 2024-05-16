import React from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';

const DataView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isArgo } = useProductCheck();

  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
  const cycle = searchParams.get('cycle') || '';
  const depth = searchParams.get('depth') === '1' ? '1' : '0';

  const buildImg = (): string => {
    const profiles = depth === '0' ? 'profiles' : 'profiles_s';
    const mockUrl = isArgo
      ? `https://oceancurrent.aodn.org.au/${profiles}/${worldMeteorologicalOrgId}/${date}_${worldMeteorologicalOrgId}_${cycle}.gif`
      : 'https://oceancurrent.aodn.org.au/SST_4hr/SST_Filled/Adelaide/2024022118.gif';
    return mockUrl;
  };

  return <img className="h-full w-full " src={buildImg()} alt="product" />;
};

export default DataView;
