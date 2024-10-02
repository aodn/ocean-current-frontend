import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Popup, TruncateText } from '@/components/Shared';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import Legend from '@/components/DataVisualisationSidebar/components/Legend';
import useDateStore from '@/stores/date-store/dateStore';
import { getProductInfoByKey } from '@/utils/product-utils/product';
import InfoIcon from '@/assets/icons/info-icon.svg';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { setProductId } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';
import ArgoIcon from '@/assets/icons/products/argo-icon.svg';
import ArgoIdIcon from '@/assets/icons/argo-id-icon.svg';
import useArgoStore, { setArgoDepth } from '@/stores/argo-store/argoStore';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';

const ProductFooterMobile: React.FC = () => {
  const { isArgo } = useProductCheck();
  const useDate = useDateStore((state) => state.date);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { mainProduct, subProduct, subProducts } = useProductConvert();
  const { updateQueryParamsAndNavigate } = useQueryParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const useArgo = useArgoStore((state) => state.selectedArgoParams);
  const { worldMeteorologicalOrgId, cycle } = useArgo;
  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');
  const depthPosition = [
    { text: '-0.4', position: 10, color: '#524dab' },
    { text: '-0.2', position: 30, color: '#5ed8e9' },
    { text: '0', position: 50, color: '#7de895' },
    { text: '0.2', position: 70, color: '#fdd768' },
    { text: '0.4', position: 90, color: '#ca705c' },
  ];

  const changeDepth = (newDepth: '0' | '1') => {
    setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth: newDepth, date });
    setArgoDepth(newDepth);
  };

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

  const filteredDataSources = useMemo(() => {
    if (!mainProduct || !mainProduct.key) {
      return [];
    }
    return dataSources.filter((source) => source.product.includes(mainProduct.key));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainProduct]);

  const productInfo = mainProduct ? getProductInfoByKey(mainProduct.key) : null;

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const shouldRenderSubProducts = () => mainProduct && subProducts.length > 0;

  const PopupBody = () => {
    return <div className="p-4">{productInfo?.description()}</div>;
  };

  if (isArgo) {
    return (
      <div className="rounded-md bg-white">
        <div className="relative">
          <div className="flex items-center justify-between bg-white p-2 pb-4">
            <img className="mx-6 h-16 w-14 object-cover" src={ArgoIcon} alt="argo-icon" />
            <div>
              <h2 className="mb-2 text-lg font-semibold text-imos-black">Argo profiles</h2>
              <p className="text-imos-grey">Temperature and salinity down to 2000m in the Australian region</p>
            </div>
          </div>
          <div className="relative mb-10 h-2 w-full bg-background-argo-gradient">
            {depthPosition.map(({ text, position, color }, index) => (
              <div
                style={{ left: `${position}%` }}
                key={index}
                className="absolute top-2 flex flex-col items-center justify-center"
              >
                <div className="h-1 w-0.5 bg-imos-grey"></div>
                <div className="text-imos-grey">{text}</div>
                <div style={{ backgroundColor: color }} className="h-3 w-3 rounded-full"></div>
              </div>
            ))}
          </div>

          <div className="p-2">
            <div className="my-5">
              <div className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border bg-imos-mid-grey px-12 py-1 text-lg  text-white transition duration-300 ease-in-out">
                <img src={ArgoIdIcon} alt="argo id icon" />
                aoml {worldMeteorologicalOrgId}
              </div>
            </div>
            <div className="mb-3 flex gap-3">
              <Button
                onClick={() => changeDepth('1')}
                size="full"
                borderRadius="small"
                type={useArgo.depth === '1' ? 'primary' : 'secondary'}
              >
                0-400m
              </Button>
              <Button
                onClick={() => changeDepth('0')}
                size="full"
                borderRadius="small"
                type={useArgo.depth === '0' ? 'primary' : 'secondary'}
              >
                0-2000m
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      {filteredDataSources.length > 0 && (
        <div className="mt-2">
          <div className="flex cursor-pointer items-center justify-between p-2">
            <h3 className="text-lg font-medium text-imos-grey">Data sources</h3>
          </div>
          <div>
            <div className="mb-6 mt-2 flex flex-wrap justify-between gap-2">
              {filteredDataSources.map(({ title, link }, index) => (
                <div key={title} className={index === filteredDataSources.length - 1 ? 'w-auto' : 'flex-1'}>
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
