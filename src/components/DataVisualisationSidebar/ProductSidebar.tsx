import React from 'react';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { ProductSidebarText } from '@/constants/textConstant';
import useDateStore from '@/stores/date-store/dateStore';
import { useQueryParams } from '@/hooks';
import { setProductId } from '@/stores/product-store/productStore';
import { setCurrentMetersDate, setDepth, setProperty, setRegion } from '@/stores/current-meters-store/currentMeters';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  mooredInstrumentArrayPath,
} from '@/constants/currentMeters';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { ProductID } from '@/types/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
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
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const useDate = useDateStore((state) => state.date);
  const { isArgo, isCurrentMeters, isSealCtdTags } = useProductCheck();
  const shouldRenderMiniMap = useProductAvailableInRegion() || isArgo || isCurrentMeters || isSealCtdTags;
  const shouldShowLegend = !isCurrentMeters;

  if (!mainProduct) {
    return <Loading />;
  }

  const productInfo = getProductInfoByKey(mainProduct.key);
  const getDataSources = dataSources(useDate);
  const filteredDataSources = getDataSources.filter((source) => source.product.includes(mainProduct.key));

  const handleSubProductChange = (key: ProductID, subProductPath: string) => {
    if (key === subProduct?.key) {
      return;
    }
    setProductId(key);
    const targetPath = `${mainProduct.path}/${subProductPath}`;

    let updateParam = {};
    if (isCurrentMeters && subProductPath !== mooredInstrumentArrayPath) {
      const allTime = yearOptionsData[0].id;

      setRegion(CurrentMetersRegion.Aust);
      setDepth(CurrentMetersDepth.ONE);
      setProperty(CurrentMetersProperty.vrms);
      setCurrentMetersDate(allTime);
      updateParam = {
        region: CurrentMetersRegion.Aust,
        property: CurrentMetersProperty.vrms,
        date: allTime,
        depth: CurrentMetersDepth.ONE,
      };
    }
    updateQueryParamsAndNavigate(targetPath, updateParam);
  };

  return (
    <div className="rounded-md bg-white">
      <ProductDropdown mainProductKey={mainProduct.key} />

      {shouldRenderMiniMap && <MiniMap />}

      <div className="hidden md:block [&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-imos-light-grey">
        <ProductSummary productInfo={productInfo} />

        {subProduct && subProducts.length > 0 && (
          <CollapsibleSection title={ProductSidebarText.OPTIONS}>
            <SubProductOptions
              subProducts={subProducts}
              subProductKey={subProduct?.key}
              handleSubProductChange={handleSubProductChange}
            />
          </CollapsibleSection>
        )}

        {filteredDataSources.length > 0 && (
          <CollapsibleSection title={ProductSidebarText.DATA_SOURCES}>
            <DataSources filteredDataSources={filteredDataSources} />
          </CollapsibleSection>
        )}

        {isArgo && (
          <CollapsibleSection title={ProductSidebarText.ARGO_PROFILES}>
            <ArgoFilters />
          </CollapsibleSection>
        )}

        {isCurrentMeters && <CurrentMetersFilters subProduct={subProduct} />}

        {shouldShowLegend && (
          <CollapsibleSection title={ProductSidebarText.LEGEND}>
            <Legend />
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
};

export default ProductSideBar;
