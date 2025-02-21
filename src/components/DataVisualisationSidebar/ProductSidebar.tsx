import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Loading } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import ArrowIcon from '@/assets/icons/arrow.svg';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { ProductSidebarText } from '@/constants/textConstant';
import useDateStore from '@/stores/date-store/dateStore';
import { useDateRange, useQueryParams } from '@/hooks';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { QueryParams } from '@/hooks/useQueryParams/types/userQueryParams.types';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import {
  initialState as currentMetersInitialState,
  setCurrentMetersDate,
  setDepth,
  setProperty,
  setRegion,
} from '@/stores/current-meters-store/currentMeters';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  mooredInstrumentArrayPath,
} from '@/constants/currentMeters';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { DropdownElement } from '../Shared/Dropdown/types/dropdown.types';
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

  const { updateQueryParamsAndNavigate } = useQueryParams();
  const useProductId = useProductStore((state) => state.productParams.productId);

  const { allDates, selectedDateIndex, formatDate } = useDateRange();
  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);
  const isProductAvailableInRegion = useProductAvailableInRegion();

  if (!mainProduct) {
    return <Loading />;
  }

  const mainProductKey = mainProduct.key;
  const subProductKey = subProduct?.key ?? '';
  const isCurrentMeters = mainProductKey === 'currentMeters';
  const productInfo = getProductInfoByKey(mainProductKey);

  const getDataSources = dataSources(useDate);
  const filteredDataSources = getDataSources.filter((source) => source.product.includes(mainProductKey));

  const handleDropdownChange = ({ id }: DropdownElement) => {
    if (id === useProductId) {
      return;
    }
    setProductId(id);

    let queryToUpdate: QueryParams = { date: selectedDate, property: null, depth: null, cycle: null, wmoid: null };
    // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
    if (id === 'EACMooringArray') {
      queryToUpdate = { date: selectedDate, region: 'Brisbane', property: null, depth: null };
    } else if (id === 'currentMeters') {
      const { region, property, depth, date } = currentMetersInitialState;
      queryToUpdate = { date, region, property, depth };
    } else if (!isProductAvailableInRegion) {
      queryToUpdate = { date: selectedDate, region: null, property: null, depth: null, cycle: null, wmoid: null };
    }

    const targetPath = getProductPathWithSubProduct(id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
  };

  const handleSubProductChange = (key: string, subProductPath: string) => {
    if (key === subProductKey) {
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
      <ProductDropdown mainProductKey={mainProductKey} handleDropdownChange={handleDropdownChange} />

      {shouldRenderMiniMap && <MiniMap />}

      <div className="hidden md:block [&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-imos-light-grey">
        <ProductSummary isArgo={isArgo} productInfo={productInfo} />

        {subProduct && subProducts.length > 0 && (
          <CollapsibleSection title={ProductSidebarText.OPTIONS}>
            <SubProductOptions
              subProducts={subProducts}
              subProductKey={subProduct.key}
              handleSubProductChange={handleSubProductChange}
            />
          </CollapsibleSection>
        )}

        {filteredDataSources.length > 0 && (
          <CollapsibleSection title={ProductSidebarText.DATA_SOURCES}>
            <DataSources filteredDataSources={filteredDataSources} />
          </CollapsibleSection>
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
