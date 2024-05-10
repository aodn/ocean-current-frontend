import React from 'react';
import { useNavigate } from 'react-router-dom';
import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import useArgoStore, { subtractOneDay, addOneDay } from '@/stores/argo-store/argoStore';
import { Button, DateSelector } from '@/components/Shared';
import useProductStore, { setSubProduct } from '@/stores/product-store/productStore';
import { getProductByKey } from '@/utils/product';
import { MainProductWithSubProduct, Product, SubProduct } from '@/types/product';
import { DataSidebarProps } from '../types/mapSidebar';
import Legend from './Legend';

const ProductSideBar: React.FC<DataSidebarProps> = ({ copyButtonText, handleCopyLink }) => {
  const useProductParams = useProductStore((state) => state.productParams);
  const useDate = useArgoStore((state) => state.date);
  const navigate = useNavigate();

  const convertProductFromStore = () => {
    const { mainProduct: mainKey, subProduct: subKey } = useProductParams;

    let product: MainProductWithSubProduct | null = null;
    let mainProduct: Product | null = null;
    let subProduct: SubProduct | null = null;
    let subProducts: SubProduct[] = [];

    if (mainKey && subKey) {
      product = getProductByKey(mainKey, subKey);
      mainProduct = product.mainProduct;
      subProducts = product.mainProduct.children || [];
      subProduct = product.subProduct;
    }

    if (mainKey && !subKey) {
      product = getProductByKey(mainKey);
      mainProduct = product.mainProduct;
    }

    return { mainProduct, subProduct, subProducts };
  };

  const { mainProduct, subProduct, subProducts } = convertProductFromStore();

  const dataSources = ['SST L3S-6d ngt (1992-2017)', 'SST L3SM-6d ngt (2018-now)', 'GSLA', 'SSTAARS'];

  const addDay = () => {
    addOneDay();
    // onDateChange(useDate.add(1, 'day'));
  };

  const subtractDay = () => {
    subtractOneDay();
    // onDateChange(useDate.subtract(1, 'day'));
  };

  const handleSubProductChange = (key: string, mainProductPath: string, subProductPath: string) => {
    navigate(`${mainProductPath}/${subProductPath}`);
    setSubProduct(key);
  };

  // TODO: Add loading UI
  if (!mainProduct) {
    return <>loading</>;
  }

  return (
    <>
      <div className="rounded-md border-2 border-imos-grey">
        <div className="flex items-center justify-between bg-white p-2 pb-4">
          <img className="mx-6 h-16 w-14 object-cover" src={SSTIcon} alt="sst-icon" />
          <div>
            <h2 className="mb-2 text-lg font-semibold text-imos-black">{mainProduct.title}</h2>
            <p className="text-imos-grey">Sea Surface Temperature (°C) 6-day ngt-only comp QL3</p>
          </div>
        </div>

        <div className="p-4">
          <DateSelector date={useDate} subtractDay={subtractDay} addDay={addDay} />
          {mainProduct && subProduct && subProducts && subProducts.length > 0 && (
            <div className="my-6 flex flex-wrap justify-between gap-2">
              {subProducts.map(({ key, title, path }, index) => (
                <div key={key} className={index === subProducts.length - 1 ? 'w-auto' : 'flex-1'}>
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
    </>
  );
};

export default ProductSideBar;
