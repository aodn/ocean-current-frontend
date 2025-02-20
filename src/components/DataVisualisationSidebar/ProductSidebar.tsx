import React, { useState } from 'react';
import { Button, Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import ArrowIcon from '@/assets/icons/arrow.svg';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import useDateStore from '@/stores/date-store/dateStore';
import { ProductSidebarText } from '@/constants/textConstant';
import Legend from './components/Legend';
import MiniMap from './components/MiniMap';
import ProductDropdown from './components/ProductDropdown';
import CurrentMetersFilters from './components/CurrentMetersFilters';
import { buildDataSourceUrl, getProductInfoByKey } from './utils';
import ArgoFilters from './components/ArgoFilters';
import ProductSummary from './components/ProductSummary';
import SubProductOptions from './components/SubProductOptions';

const ProductSideBar: React.FC = () => {
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const isCurrentMeters = mainProduct?.key === 'currentMeters';
  const isArgo = mainProduct?.key === 'argo';
  const shouldRenderMiniMap = useProductAvailableInRegion() || isArgo;
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [isDataSourcesCollapsed, setIsDataSourcesCollapsed] = useState(false);
  const useDate = useDateStore((state) => state.date);

  if (!mainProduct) {
    return <Loading />;
  }

  const dataSources = [
    {
      title: 'SST L3S-6d ngt (1992-2017)',
      link: buildDataSourceUrl('L3S-6d', useDate),
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'SST L3SM-6d ngt (2018-now)',
      link: buildDataSourceUrl('L3SM-6d', useDate),
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'GSLA',
      link: buildDataSourceUrl('GSLA', useDate),
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'SSTAARS',
      link: 'https://portal.aodn.org.au/search?uuid=79c8eea2-4e86-4553-8237-4728e27abe10',
      product: ['sixDaySst', 'climatology', 'EACMooringArray'],
    },
    {
      title: 'EAC Mooring Data',
      link: 'https://data.csiro.au/collection/csiro%3A52949v18',
      product: ['EACMooringArray'],
    },
  ];

  const filteredDataSources = dataSources.filter((source) => source.product.includes(mainProduct.key));

  const productInfo = getProductInfoByKey(mainProduct.key);

  return (
    <div className="rounded-md bg-white">
      <ProductDropdown />

      {shouldRenderMiniMap && <MiniMap />}

      <div className="hidden md:block [&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-[#e5e7eb]">
        <ProductSummary isArgo={isArgo} productInfo={productInfo} />

        {subProduct && subProducts.length > 0 && (
          <SubProductOptions
            isCurrentMeters={isCurrentMeters}
            subProducts={subProducts}
            subProductKey={subProduct.key}
            mainProductPath={mainProduct.path}
          />
        )}

        {filteredDataSources.length > 0 && (
          <div className="px-4">
            <div
              className="flex cursor-pointer items-center justify-between px-4 py-2"
              onClick={() => setIsDataSourcesCollapsed(!isDataSourcesCollapsed)}
              aria-hidden
            >
              <h3 className="text-lg font-medium text-imos-grey">{ProductSidebarText.DATA_SOURCES}</h3>
              <img
                src={ArrowIcon}
                alt="arrow icon"
                className={`h-4 w-4 transform transition-transform duration-300 ${isDataSourcesCollapsed ? 'rotate-180' : ''}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${isDataSourcesCollapsed ? 'max-h-0' : 'max-h-screen'}`}
            >
              <div className="mb-6 mt-2 flex flex-wrap justify-between gap-2">
                {filteredDataSources.map(({ title, link }, index) => (
                  <div key={title} className={index === filteredDataSources.length - 1 ? 'w-auto' : 'flex-1'}>
                    <a target="_blank" href={link} rel="noreferrer">
                      <Button size="full" borderRadius="small" type="secondary" className="!border">
                        <span className="text-base text-imos-text-grey">{title}</span>
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isArgo && <ArgoFilters />}

        {isCurrentMeters ? (
          <CurrentMetersFilters subProduct={subProduct} />
        ) : (
          <div className="px-4">
            <div
              className="flex cursor-pointer items-center justify-between px-4 py-2"
              onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
              aria-hidden
            >
              <h3 className="text-lg font-medium text-imos-grey">{ProductSidebarText.LEGEND}</h3>
              <img
                src={ArrowIcon}
                alt="arrow icon"
                className={`h-4 w-4 transform transition-transform duration-300 ${isLegendCollapsed ? 'rotate-180' : ''}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${isLegendCollapsed ? 'max-h-0' : 'max-h-screen'}`}
            >
              <Legend />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSideBar;
