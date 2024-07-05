import React, { useState } from 'react';
import { Button, Loading, Popup } from '@/components/Shared';
import { setProductId } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { getProductInfoByKey } from '@/utils/product-utils/product';
import InfoIcon from '@/assets/icons/info-icon.svg';
import ArrowIcon from '@/assets/icons/arrow.svg';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import Legend from './Legend';
import MiniMap from './MiniMap';
import HeaderSideBar from './HeaderSideBar';

const ProductSideBar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const isProductAvailableInRegion = useProductAvailableInRegion();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubProductsCollapsed, setIsSubProductsCollapsed] = useState(false);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [isDataSourcesCollapsed, setIsDataSourcesCollapsed] = useState(false);

  const dataSources = ['SST L3S-6d ngt (1992-2017)', 'SST L3SM-6d ngt (2018-now)', 'GSLA', 'SSTAARS'];

  const handleSubProductChange = (key: string, mainProductPath: string, subProductPath: string) => {
    if (key === subProduct?.key) {
      return;
    }
    setProductId(key);
    const targetPath = `${mainProductPath}/${subProductPath}`;
    updateQueryParamsAndNavigate(targetPath);
  };

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const shouldRenderSubProducts = () => mainProduct && subProducts.length > 0;
  const shouldRenderMiniMap = () => isProductAvailableInRegion;

  if (!mainProduct) {
    return <Loading />;
  }

  const PopupBody = () => {
    return <div className="p-4">{productInfo?.description()}</div>;
  };

  const productInfo = getProductInfoByKey(mainProduct?.key);

  return (
    <div>
      <div className="mb-1">
        <HeaderSideBar />
      </div>

      {shouldRenderMiniMap() && (
        <div className="h-60 w-full overflow-hidden">
          <MiniMap />
        </div>
      )}

      <div className="flex items-center justify-between border-b-2 border-imos-grey p-4">
        <div aria-hidden onClick={handlePopup} className="mr-6 flex flex-col items-center justify-center">
          <img src={InfoIcon} alt="info icon" className=" h-6 w-6 cursor-pointer object-contain" />
          <p className="mt-2 text-center text-xs text-imos-sea-blue">Click here for more information</p>
        </div>
        <p className="text-imos-grey">{productInfo?.summary}</p>
      </div>

      <Popup title={productInfo?.title} body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />

      {shouldRenderSubProducts() && (
        <div className="border-b-2 border-imos-grey px-4">
          <div
            className="flex cursor-pointer items-center justify-between px-4 py-2"
            onClick={() => setIsSubProductsCollapsed(!isSubProductsCollapsed)}
            aria-hidden
          >
            <h3 className="text-lg font-medium text-imos-black">Sub-products</h3>
            <img
              src={ArrowIcon}
              alt="arrow icon"
              className={`h-4 w-4 transform transition-transform duration-300 ${isSubProductsCollapsed ? 'rotate-180' : ''}`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${isSubProductsCollapsed ? 'max-h-0' : 'max-h-screen'}`}
          >
            <div className="my-6 grid grid-cols-2 gap-2">
              {subProducts.map(({ key, title, path }) => (
                <div key={key}>
                  <Button
                    size="full"
                    borderRadius="small"
                    type={key === subProduct!.key ? 'primary' : 'secondary'}
                    onClick={() => handleSubProductChange(key, mainProduct.path, path)}
                  >
                    {title}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-b-2 border-imos-grey px-4">
        <div
          className="flex cursor-pointer items-center justify-between px-4 py-2"
          onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
          aria-hidden
        >
          <h3 className="text-lg font-medium text-imos-black">Legend</h3>
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

      <div className="border-b-2 border-imos-grey px-4">
        <div
          className="flex cursor-pointer items-center justify-between px-4 py-2"
          onClick={() => setIsDataSourcesCollapsed(!isDataSourcesCollapsed)}
          aria-hidden
        >
          <h3 className="text-lg font-medium text-imos-black">Data sources</h3>
          <img
            src={ArrowIcon}
            alt="arrow icon"
            className={`h-4 w-4 transform transition-transform duration-300 ${isDataSourcesCollapsed ? 'rotate-180' : ''}`}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${isDataSourcesCollapsed ? 'max-h-0' : 'max-h-screen'}`}
        >
          <div className="my-6 flex flex-wrap justify-between gap-2">
            {dataSources.map((product, index) => (
              <div key={product} className={index === subProducts.length - 1 ? 'w-auto' : 'flex-1'}>
                <Button size="full" borderRadius="small" type="secondary">
                  {product}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSideBar;
