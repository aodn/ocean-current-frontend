import React from 'react';
import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import { Button, Loading } from '@/components/Shared';
import { setProductId, setSubProduct } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { getProductInfoByKey } from '@/utils/product';
import { DataSidebarProps } from '../types/mapSidebar';
import Legend from './Legend';

const ProductSideBar: React.FC<DataSidebarProps> = ({ copyButtonText, handleCopyLink }) => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const { mainProduct, subProduct, subProducts } = useProductConvert();

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

  const productInfo = getProductInfoByKey(mainProduct?.key);

  return (
    <div className="relative rounded-md border-2 border-imos-grey">
      <div className="flex items-center justify-between bg-white p-2 pb-4">
        <img className="mx-6 h-16 w-14 object-cover" src={SSTIcon} alt="sst-icon" />
        <div>
          <h2 className="mb-2 text-lg font-semibold text-imos-black">{mainProduct.title}</h2>
          <p className="text-imos-grey">{productInfo?.summary}</p>
        </div>
      </div>

      <div className="p-4">
        {renderSubProducts() && subProduct && (
          <div className="my-6 grid grid-cols-2 gap-2">
            {subProducts.map(({ key, title, path }) => (
              <div key={key}>
                <Button
                  size="full"
                  borderRadius="small"
                  type="secondary"
                  selected={key === subProduct.key}
                  onClick={() => handleSubProductChange(key, mainProduct.path, path)}
                >
                  {title}
                </Button>
              </div>
            ))}
          </div>
        )}

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
  );
};

export default ProductSideBar;
