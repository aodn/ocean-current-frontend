import React, { useState, useEffect } from 'react';
import { Button, Popup, TruncateText } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import Legend from '@/components/DataVisualisationSidebar/components/Legend';
import useDateStore from '@/stores/date-store/dateStore';
import { getProductInfoByKey } from '@/utils/product-utils/product';
import InfoIcon from '@/assets/icons/info-icon.svg';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { setProductId } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';

const ProductFooterMobile: React.FC = () => {
  const useDate = useDateStore((state) => state.date);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const { updateQueryParamsAndNavigate } = useQueryParams();

  useEffect(() => {
    if (!mainProduct?.key) {
      return;
    }
  }, [mainProduct]);

  const handleSubProductChange = (key: string, mainProductPath: string, subProductPath: string) => {
    if (subProduct && key === subProduct.key) {
      return;
    }
    setProductId(key);
    const targetPath = `${mainProductPath}/${subProductPath}`;
    updateQueryParamsAndNavigate(targetPath);
  };

  const buildDataSourceUrl = (type: string): string => {
    switch (type) {
      case 'L3S-6d':
        return `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3S-6d/ngt/${useDate.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3S-6d/ngt/${useDate.format('YYYY')}/${useDate.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-AVHRR_D-6d_night.nc`;
      case 'L3SM-6d':
        return `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${useDate.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${useDate.format('YYYY')}/${useDate.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-MultiSensor-6d_night.nc`;
      case 'GSLA':
        return `https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/NRT/${useDate.format('YYYY')}/catalog.html?dataset=IMOS/OceanCurrent/GSLA/NRT/${useDate.format('YYYY')}/IMOS_OceanCurrent_HV_${useDate.format('YYYYMMDD')}T060000Z_GSLA_FV02_NRT.nc`;
      default:
        return 'Unknown status.';
    }
  };

  const dataSources = [
    {
      title: 'SST L3S-6d ngt (1992-2017)',
      link: buildDataSourceUrl('L3S-6d'),
      product: ['sixDaySst'],
    },
    {
      title: 'SST L3SM-6d ngt (2018-now)',
      link: buildDataSourceUrl('L3SM-6d'),
      product: ['sixDaySst'],
    },
    {
      title: 'GSLA',
      link: buildDataSourceUrl('GSLA'),
      product: ['sixDaySst'],
    },
    {
      title: 'SSTAARS',
      link: 'https://portal.aodn.org.au/search?uuid=79c8eea2-4e86-4553-8237-4728e27abe10',
      product: ['sixDaySst', 'climatology'],
    },
  ];

  // Aseguramos que mainProduct no es null o undefined antes de acceder a sus propiedades
  const productInfo = mainProduct ? getProductInfoByKey(mainProduct.key) : null;

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const shouldRenderSubProducts = () => mainProduct && subProducts.length > 0;

  const PopupBody = () => {
    return <div className="p-4">{productInfo?.description()}</div>;
  };

  return (
    <div className="mt-2 rounded bg-white p-2 [&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-[#e5e7eb]">
      <div className="p-2">
        <div className="flex justify-between">
          <img src={InfoIcon} alt="info icon" className="mr-6 mt-1 h-6 w-6 cursor-pointer object-contain" />
          <TruncateText lines={4} text={productInfo?.summary} />
        </div>
        <div aria-hidden onClick={handlePopup} className="mt-3 flex justify-end ">
          <p className="mr-2 cursor-pointer font-semibold text-imos-grey">Read More</p>
          <ArrowWithTail stroke="#787878" className="mt-2 cursor-pointer" />
        </div>
      </div>

      <Popup title={productInfo?.title} body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />

      {shouldRenderSubProducts() && (
        <div className="px-2">
          <div className="flex cursor-pointer items-center justify-between px-4 py-2" aria-hidden>
            <h3 className="text-lg font-medium text-imos-grey">Sub-products</h3>
          </div>
          <div>
            <div className="mb-6 mt-2 grid grid-cols-2 gap-2">
              {subProducts.map(({ key, title, path }, index) => (
                <div key={key}>
                  <Button
                    size={index === subProducts.length - 1 && subProducts.length % 2 !== 0 ? 'auto' : 'full'}
                    borderRadius="small"
                    type={subProduct && key === subProduct.key ? 'primary' : 'secondary'}
                    onClick={() => handleSubProductChange(key, mainProduct!.path, path)}
                  >
                    {title}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-2">
        <div className="flex cursor-pointer items-center justify-between p-2">
          <h3 className="text-lg font-medium text-imos-grey">Legend</h3>
        </div>
        <Legend />
      </div>

      {dataSources.length > 0 && (
        <div className="mt-2">
          <div className="flex cursor-pointer items-center justify-between p-2">
            <h3 className="text-lg font-medium text-imos-grey">Data sources</h3>
          </div>
          <div>
            <div className="mb-6 mt-2 flex flex-wrap justify-between gap-2">
              {dataSources.map(({ title, link }, index) => (
                <div key={title} className={index === dataSources.length - 1 ? 'w-auto' : 'flex-1'}>
                  <a target="_blank" href={link} rel="noreferrer">
                    <Button size="full" borderRadius="small" type="secondary">
                      {title}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFooterMobile;
