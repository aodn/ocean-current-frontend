import React, { useMemo } from 'react';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { ProductSidebarText } from '@/constants/textConstant';
import useDateStore from '@/stores/date-store/dateStore';
import { useMultipleRegionLatestDates } from '@/services/hooks';
import { setProductId } from '@/stores/product-store/productStore';
import { setCurrentMetersDate, setDepth, setProperty, setRegion } from '@/stores/current-meters-store/currentMeters';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  mooredInstrumentArrayPath,
} from '@/constants/currentMeters';
import { currentMeterSYearOptionsData } from '@/data/current-meter/sidebarOptions';
import { ProductID } from '@/types/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useShowProductOverMap } from '@/stores/product-store/hooks/useShowProductOverMap';
import { useQueryParams } from '@/hooks';
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
  const { updateQueryParamsAndNavigate, getQueryParamsByKey } = useQueryParams();
  const useDate = useDateStore((state) => state.date);
  const { isArgo, isCurrentMeters, isSealCtd } = useProductCheck();
  const shouldRenderMiniMap = useShowProductOverMap();

  const shouldShowLegend = !isCurrentMeters;

  const latestDatesRegionQueries = useMultipleRegionLatestDates(
    subProducts.map((s) => s.key),
    isSealCtd,
  );
  const latestDatesRegionData = latestDatesRegionQueries.map((q) => q.data);
  const isLatestDatesRegionLoading = latestDatesRegionQueries.some((q) => q.isLoading);

  const subProductOptionButtonDisable = useMemo(() => {
    if (isSealCtd) {
      return isLatestDatesRegionLoading;
    }
    return false;
  }, [isLatestDatesRegionLoading, isSealCtd]);

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
      const allTime = currentMeterSYearOptionsData[0].id;
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

    if (isSealCtd) {
      const currentRegion = getQueryParamsByKey('region');
      const targetLatestDate = latestDatesRegionData
        .find((p) => p?.productId === key)
        ?.regionLatestDates.find((r) => r.region === currentRegion)?.latestDate;
      updateParam = targetLatestDate
        ? {
            date: targetLatestDate,
          }
        : {};
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
              disabled={subProductOptionButtonDisable}
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
