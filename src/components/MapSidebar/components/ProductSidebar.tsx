import React, { useState } from 'react';
import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import { Button, Loading } from '@/components/Shared';
import { setProductId, setSubProduct } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { getProductInfoByKey } from '@/utils/product';
import OceanColourIcon from '@/assets/icons/products/ocean-colour-icon.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg';
import MonthlyMeansIcon from '@/assets/icons/products/monthly-means-icon.png';
import SurfaceWavesIcon from '@/assets/icons/products/surface-waves-icon.png';
import FourHourSSTIcon from '@/assets/icons/products/4-hour-SST-icon.png';
import SixHourSSTIcon from '@/assets/icons/products/6-hour-SST-icon.png';
import InfoIcon from '@/assets/icons/info-icon.svg';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { DataSidebarProps } from '../types/mapSidebar';
import Legend from './Legend';
import MiniMap from './MiniMap';

const ProductSideBar: React.FC<DataSidebarProps> = ({ copyButtonText, handleCopyLink }) => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const [isSubProductsCollapsed, setIsSubProductsCollapsed] = useState(false);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [isDataSourcesCollapsed, setIsDataSourcesCollapsed] = useState(false);

  const dataSources = ['SST L3S-6d ngt (1992-2017)', 'SST L3SM-6d ngt (2018-now)', 'GSLA', 'SSTAARS'];

  const handleSubProductChange = (key: string, mainProductPath: string, subProductPath: string) => {
    setProductId(key);
    setSubProduct(key);
    const targetPath = `${mainProductPath}/${subProductPath}`;
    updateQueryParamsAndNavigate(targetPath);
  };

  const renderSubProducts = () => mainProduct && subProducts.length > 0;

  if (!mainProduct) {
    return <Loading />;
  }

  const showIconProduct = (key: string) => {
    const images: { [key: string]: string } = {
      'Ocean Colour': OceanColourIcon,
      'Snapshot SST': SSTIcon,
      'Adj. Sea Level Anom.': AdjustedSeaLevelAnomalyIcon,
      'Monthly Means': MonthlyMeansIcon,
      'Surface Waves': SurfaceWavesIcon,
      'Four hour SST': FourHourSSTIcon,
      '6-Day SST & Centiles': SixHourSSTIcon,
    };

    return images[key];
  };

  const productInfo = getProductInfoByKey(mainProduct?.key);

  return (
    <div>
      <div className="flex justify-between bg-white p-2 pb-4">
        <div className="flex w-full items-center justify-between">
          <img
            className=" h-16 object-contain"
            src={showIconProduct(mainProduct.title)}
            alt={`${showIconProduct(mainProduct.title)} icon`}
          />
          <h2 className="mb-2 text-lg font-semibold text-[#3A6F8F]">{mainProduct.title}</h2>
        </div>
      </div>

      <div className="mt-4 h-60 w-full overflow-hidden">
        <MiniMap />
      </div>

      <div className="flex items-center justify-between border-b-2 border-imos-grey p-4">
        <img src={InfoIcon} alt="info icon" className="mr-6 h-6 w-6 cursor-pointer object-contain" />
        <p className="text-imos-grey">{productInfo?.summary}</p>
      </div>

      {renderSubProducts() && (
        <div className="border-b-2 border-imos-grey px-4">
          <div
            className="flex cursor-pointer justify-between px-4 pt-4"
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
          className="flex cursor-pointer justify-between px-4 pt-4"
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
          className="flex cursor-pointer justify-between px-4 pt-4"
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
      <div className="border-imos-grey p-4">
        <h3 className="mb-4 px-4 text-lg font-medium text-imos-black">Permlink</h3>
        <Button onClick={() => handleCopyLink()} size="full" borderRadius="small" type="secondary">
          {copyButtonText}
        </Button>
      </div>
    </div>
  );
};

export default ProductSideBar;
