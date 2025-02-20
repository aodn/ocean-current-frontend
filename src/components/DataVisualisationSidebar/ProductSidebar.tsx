import React, { useState } from 'react';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import ArrowIcon from '@/assets/icons/arrow.svg';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { ProductSidebarText } from '@/constants/textConstant';
import useDateStore from '@/stores/date-store/dateStore';
import Legend from './components/Legend';
import MiniMap from './components/MiniMap';
import ProductDropdown from './components/ProductDropdown';
import CurrentMetersFilters from './components/CurrentMetersFilters';
import { dataSources, getProductInfoByKey } from './utils';
import ArgoFilters from './components/ArgoFilters';
import ProductSummary from './components/ProductSummary';
import SubProductOptions from './components/SubProductOptions';
import DataSources from './components/DataSources';
import CollapsibleSection from './components/CollapsibleSection';

const ProductSideBar: React.FC = () => {
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const useDate = useDateStore((state) => state.date);
  const isArgo = mainProduct?.key === 'argo';
  const shouldRenderMiniMap = useProductAvailableInRegion() || isArgo;

  if (!mainProduct) {
    return <Loading />;
  }

  const mainProductKey = mainProduct.key;
  const isCurrentMeters = mainProductKey === 'currentMeters';
  const productInfo = getProductInfoByKey(mainProductKey);

  const getDataSources = dataSources(useDate);
  const filteredDataSources = getDataSources.filter((source) => source.product.includes(mainProductKey));

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

        <CollapsibleSection title={ProductSidebarText.DATA_SOURCES}>
          <DataSources filteredDataSources={filteredDataSources} />
        </CollapsibleSection>

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
