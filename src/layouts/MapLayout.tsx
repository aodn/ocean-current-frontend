import React, { useCallback, useEffect } from 'react';
import { Outlet, useMatch, useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { setArgoData, setDate } from '@/stores/argo-store/argoStore';
import { setProductKey } from '@/stores/product-store/productStore';
import MapSidebar from '@/components/MapSidebar/MapSidebar';

interface MapLayoutProps {
  type: 'product' | 'map';
}
const MapLayout: React.FC<MapLayoutProps> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
  const cycle = searchParams.get('cycle') || '';
  const depth = searchParams.get('depth') === '1' ? '1' : '0';
  const productMatch = useMatch(`/${type}/:product`);
  const subProductMatch = useMatch(`/${type}/:product/:subProduct`);

  const getProductKeyFromMatch = () => {
    const subProduct = subProductMatch?.params.subProduct;
    const productWithoutSubProduct = productMatch?.params.product;
    const urlProductWithSubProduct = `${subProductMatch?.params.product}-${subProductMatch?.params.subProduct}`;
    const defaultProductKey = 'fourHourSst-Sst';
    const productKey = subProduct ? urlProductWithSubProduct : productWithoutSubProduct;

    return productKey || defaultProductKey;
  };

  const productKey = getProductKeyFromMatch();

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

  return (
    <div className="my-9">
      <MapNavbar />
      <div className="flex p-4">
        <div className="mx-2 w-1/3">
          <MapSidebar onDepthChange={handleDepthChange} onDateChange={handleDateChange} />
        </div>
        <div className="w-2/3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
