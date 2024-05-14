import React, { useEffect } from 'react';
import { Outlet, useLocation, useMatch, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MapNavbar from '@/components/MapNavbar/MapNavbar';
import { setArgoData, setDate } from '@/stores/argo-store/argoStore';
import { setMainProduct, setSubProduct } from '@/stores/product-store/productStore';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { getProductByPath } from '@/utils/product';

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

  const mainProductOnlyMatch = useMatch(`/${type}/:product`);
  const mainProductWithSubProductMatch = useMatch(`/${type}/:product/:subProduct`);

  useEffect(() => {
    const getProductFromUrlMatch = () => {
      const mainProductWithSubProductExist =
        mainProductWithSubProductMatch?.params?.product && mainProductWithSubProductMatch?.params?.subProduct;

      const mainProductOnlyExist = mainProductOnlyMatch?.params?.product;

      if (mainProductWithSubProductExist) {
        return {
          mainProduct: mainProductWithSubProductMatch.params.product!,
          subProduct: mainProductWithSubProductMatch.params.subProduct!,
        };
      } else if (mainProductOnlyExist) {
        return {
          mainProduct: mainProductOnlyMatch.params.product!,
          subProduct: null,
        };
      }
      // TODO: give default product
    };

    const product = getProductFromUrlMatch();
    if (product) {
      const mainProductKey = getProductByPath(product.mainProduct)!.key;
      const subProductKey = product.subProduct ? getProductByPath(product.mainProduct, product.subProduct)!.key : null;
      setMainProduct(mainProductKey);
      setSubProduct(subProductKey);
    }
  }, [
    mainProductOnlyMatch?.params.product,
    mainProductWithSubProductMatch?.params.product,
    mainProductWithSubProductMatch?.params.subProduct,
  ]);

  useEffect(() => {
    setArgoData({ worldMeteorologicalOrgId, cycle, depth });
    setDate(dayjs(date));
  }, [date, depth, worldMeteorologicalOrgId, cycle]);

  return (
    <div className="my-9 shadow-[4px_4px_10px_0_rgba(0,0,0,0.20)] backdrop-blur-[2px]">
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
