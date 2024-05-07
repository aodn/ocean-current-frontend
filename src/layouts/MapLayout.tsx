import React, { useEffect } from 'react';
import { Outlet, useLocation, useMatch, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { setArgoData, setDate } from '@/stores/argo-store/argoStore';
import { setProductKey } from '@/stores/product-store/productStore';
import MapSidebar from '@/components/MapSidebar/MapSidebar';

interface MapLayoutProps {
  type: 'product' | 'map';
}

const MapLayout: React.FC<MapLayoutProps> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const renderMiniMap = pathname.includes('/product');

  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const worldMeteorologicalOrgId = searchParams.get('wmoid') || '';
  const cycle = searchParams.get('cycle') || '';
  const depth = searchParams.get('depth') === '1' ? '1' : '0';
  const productMatch = useMatch(`/${type}/:product`);
  const subProductMatch = useMatch(`/${type}/:product/:subProduct`);

  // const getProductKeyFromMatch = () => {
  //   const subProduct = subProductMatch?.params.subProduct;
  //   const productWithoutSubProduct = productMatch?.params.product;
  //   const urlProductWithSubProduct = `${subProductMatch?.params.product}-${subProductMatch?.params.subProduct}`;
  //   const defaultProductKey = 'fourHourSst-Sst';
  //   const productKey = subProduct ? urlProductWithSubProduct : productWithoutSubProduct;

  //   return productKey || defaultProductKey;
  // };

  const getProductFromUrl = () => {
    const subProduct = subProductMatch?.params.subProduct;
    const mainProduct = productMatch?.params.product;

    if (subProduct) {
      return subProduct;
    } else {
      return mainProduct;
    }
  };


  useEffect(() => {
    setProductData(productKey);
  }, [productKey]);

  useEffect(() => {
    setArgoData({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [date, depth, worldMeteorologicalOrgId, cycle]);

  return (
    <div className="my-9">
      <MapNavbar />
      <div className="flex p-4">
        <div className="mx-2 w-1/3">
          <MapSidebar renderMiniMap={renderMiniMap} />
        </div>
        <div className="w-2/3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
