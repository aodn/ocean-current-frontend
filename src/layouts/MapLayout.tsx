import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { setProductId } from '@/stores/product-store/productStore';
import { setDate } from '@/stores/date-store/dateStore';
import { useSetProductId, useUrlType } from '@/hooks';
import MapSidebar from '@/components/MapSidebar/MapSidebar';
import { Loading } from '@/components/Shared';
import ProductDropdown from '@/components/DataVisualisationSidebar/components/ProductDropdown';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import ArgoMapMenuBar from '@/components/ArgoMapMenuBar/ArgoMapMenuBar';
import { DateFormat } from '@/types/date';

const MapLayout: React.FC = () => {
  const { mainProduct } = useProductConvert();
  const { isArgo } = useProductCheck();
  const [searchParams] = useSearchParams();

  // Keep dateStore in sync with the Argo map view date picker so that
  // navigating away to a product page uses the correct date.
  useEffect(() => {
    if (!isArgo) return;
    const dateParam = searchParams.get('date');
    if (dateParam) setDate(dayjs(dateParam, DateFormat.DAY));
  }, [isArgo, searchParams]);

  const urlType = useUrlType();
  useSetProductId(urlType, setProductId);

  if (!mainProduct) {
    return <Loading />;
  }

  return (
    <div className="mx-auto mb-4 mt-4 w-full max-w-8xl px-4 md:mb-9">
      <div className="w-full md:flex">
        <div className="mb-4 md:hidden">
          <ProductDropdown mainProductKey={mainProduct.key} />
        </div>
        <div className="hidden w-1/3 md:block">
          <MapSidebar />
        </div>
        <div className="w-full md:mx-2">
          {isArgo && <ArgoMapMenuBar />}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
