import React, { useCallback, useEffect } from 'react';
import { useSearchParams, useMatch } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { setArgoData, setDate } from '@/stores/argo-store/argoStore';
import { setProductKey } from '@/stores/product-store/productStore';

const MapView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
  const cycle = searchParams.get('cycle') || '';
  const depth = searchParams.get('depth') === '1' ? '1' : '0';
  const productMatch = useMatch('/product/:product');
  const subProductMatch = useMatch('/product/:product/:subProduct');
  const productKey = subProductMatch?.params.subProduct ?? productMatch?.params.product ?? '';

  console.log('render MapView');

  useEffect(() => {
    setProductKey(productKey);
  }, [productKey]);

  useEffect(() => {
    setArgoData({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [date, depth, worldMeteorologicalOrgId, cycle]);

  const handleDateChange = useCallback(
    (newDate: Dayjs) => {
      setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth, date: newDate.format('YYYYMMDD') });
    },
    [worldMeteorologicalOrgId, cycle, depth, setSearchParams],
  );

  const handleDepthChange = useCallback(
    (newDepth: '0' | '1') => {
      setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth: newDepth, date });
    },
    [worldMeteorologicalOrgId, cycle, date, setSearchParams],
  );

  const buildArgoUrlImg = (): string => {
    const profiles = depth === '0' ? 'profiles' : 'profiles_s';
    return `https://oceancurrent.aodn.org.au/${profiles}/${worldMeteorologicalOrgId}/${date}_${worldMeteorologicalOrgId}_${cycle}.gif`;
  };

  return (
    <div className="my-9">
      <MapNavbar />
      <div className="flex p-4">
        <div className="mx-2 w-1/3">
          <MapSidebar onDepthChange={handleDepthChange} onDateChange={handleDateChange} />
        </div>
        <div className="w-2/3">
          <img src={buildArgoUrlImg()} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MapView;
