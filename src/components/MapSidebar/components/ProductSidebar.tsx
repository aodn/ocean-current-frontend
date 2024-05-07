import React from 'react';
import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import useArgoStore, { subtractOneDay, addOneDay } from '@/stores/argo-store/argoStore';
import { Button, DateSelector } from '@/components/Shared';
import useProductStore from '@/stores/product-store/productStore';
import { DataSidebarProps } from '../types/mapSidebar';
import Legend from './Legend';

const ProductSideBar: React.FC<DataSidebarProps> = ({ copyButtonText, handleCopyLink }) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // const
  const useProduct = useProductStore((state) => state.productParams);
  console.log('first', useProduct);

  const useDate = useArgoStore((state) => state.date);
  const subProducts = ['SST', 'SST Anomaly', 'Centiles'];
  const dataSources = ['SST L3S-6d ngt (1992-2017)', 'SST L3SM-6d ngt (2018-now)', 'GSLA', 'SSTAARS'];

  const addDay = () => {
    addOneDay();
    onDateChange(useDate.add(1, 'day'));
  };

  const subtractDay = () => {
    subtractOneDay();
    onDateChange(useDate.subtract(1, 'day'));
  };

  return (
    <>
      <div className="rounded-md border-2 border-imos-grey">
        <div className="flex items-center justify-between bg-white p-2 pb-4">
          <img className="mx-6 h-16 w-14 object-cover" src={SSTIcon} alt="sst-icon" />
          <div>
            <h2 className="mb-2 text-lg font-semibold text-imos-black">Sea Surface Temperature</h2>
            <p className="text-imos-grey">Sea Surface Temperature (°C) 6-day ngt-only comp QL3</p>
          </div>
        </div>

        <div className="p-4">
          <DateSelector date={useDate} subtractDay={subtractDay} addDay={addDay} />
          <div className="my-6 flex flex-wrap justify-between gap-2">
            {subProducts.map((product, index) => (
              <div key={product} className={index === subProducts.length - 1 ? 'w-auto' : 'flex-1'}>
                <Button size="full" borderRadius="small" type="secondary">
                  {product}
                </Button>
              </div>
            ))}
          </div>

          <Legend />

          <p className="text-lg font-semibold text-imos-black">Data sources</p>
          <div className="my-6 flex flex-wrap justify-between gap-2">
            {dataSources.map((product, index) => (
              <div key={product} className={index === subProducts.length - 1 ? 'w-auto' : 'flex-1'}>
                <Button size="full" borderRadius="small" type="secondary">
                  {product}
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={() => handleCopyLink()} size="full" borderRadius="small" type="secondary">
            {copyButtonText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductSideBar;
