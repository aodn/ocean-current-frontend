import React, { useState } from 'react';
import { Button, Loading, Popup, TruncateText } from '@/components/Shared';
import { setProductId } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import InfoIcon from '@/assets/icons/info-icon.svg';
import ArrowIcon from '@/assets/icons/arrow.svg';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import useDateStore from '@/stores/date-store/dateStore';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { GeneralText, ProductSidebarText } from '@/constants/textConstant';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  mooredInstrumentArrayPath,
} from '@/constants/currentMeters';
import { setCurrentMetersDate, setDepth, setProperty, setRegion } from '@/stores/current-meters-store/currentMeters';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import Legend from './components/Legend';
import MiniMap from './components/MiniMap';
import ProductDropdown from './components/ProductDropdown';
import CurrentMetersFilters from './components/CurrentMetersFilters';
import { buildDataSourceUrl, getProductInfoByKey } from './utils';
import ArgoFilters from './components/ArgoFilters';

const ProductSideBar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const isCurrentMeters = mainProduct?.key === 'currentMeters';
  const isArgo = mainProduct?.key === 'argo';
  const shouldRenderMiniMap = useProductAvailableInRegion() || isArgo;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubProductsCollapsed, setIsSubProductsCollapsed] = useState(false);
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

  const handleSubProductChange = (key: string, mainProductPath: string, subProductPath: string) => {
    if (key === subProduct?.key) {
      return;
    }
    setProductId(key);
    const targetPath = `${mainProductPath}/${subProductPath}`;

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

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const productInfo = getProductInfoByKey(mainProduct.key);

  const PopupBody = () => {
    return <div className="p-4">{productInfo?.description()}</div>;
  };

  return (
    <div className="rounded-md bg-white">
      <div className="mb-1">
        <ProductDropdown />
      </div>

      {shouldRenderMiniMap && <MiniMap />}

      <div className="hidden md:block [&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-[#e5e7eb]">
        <div className="p-4">
          <div className="flex justify-between">
            <img src={InfoIcon} alt="info icon" className="mr-6 mt-1 h-6 w-6 cursor-pointer object-contain" />
            <TruncateText lines={4} text={productInfo?.summary} />
          </div>
          {!isArgo && (
            <div aria-hidden onClick={handlePopup} className="mt-3 flex justify-end">
              <p className="mr-2 cursor-pointer font-semibold text-imos-grey">{GeneralText.READ_MORE}</p>
              <ArrowWithTail stroke="#787878" className="mt-2 cursor-pointer" />
            </div>
          )}
        </div>

        <Popup title={productInfo?.title} body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />

        {subProducts.length > 0 && (
          <div className="px-4">
            <div
              className="flex cursor-pointer items-center justify-between px-4 py-2"
              onClick={() => setIsSubProductsCollapsed(!isSubProductsCollapsed)}
              aria-hidden
            >
              <h3 className="text-lg font-medium text-imos-grey">{ProductSidebarText.OPTIONS}</h3>
              <img
                src={ArrowIcon}
                alt="arrow icon"
                className={`h-4 w-4 transform transition-transform duration-300 ${isSubProductsCollapsed ? 'rotate-180' : ''}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${isSubProductsCollapsed ? 'max-h-0' : 'max-h-screen'}`}
            >
              <div className="mb-6 mt-2 grid grid-cols-2 gap-2">
                {subProducts.map(({ key, title, path }, index) => (
                  <div key={key}>
                    <Button
                      size={index === subProducts.length - 1 && subProducts.length % 2 !== 0 ? 'auto' : 'full'}
                      borderRadius="small"
                      type={key === subProduct!.key ? 'primary' : 'secondary'}
                      onClick={() => handleSubProductChange(key, mainProduct.path, path)}
                    >
                      <span className={`text-base ${key === subProduct!.key ? 'text-white' : 'text-imos-text-grey'}`}>
                        {title}
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
