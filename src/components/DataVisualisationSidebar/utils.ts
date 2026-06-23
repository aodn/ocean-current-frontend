import { Dayjs } from 'dayjs';
import { DataSource, ProductInfo } from './types';
import { productInfoList } from './components/ProductDescriptionModal/ProductSummaryList';

export const dataSources: (date: Dayjs) => DataSource[] = (date) => {
  return [
    {
      title: 'SST L3SM-6d ngt (2018-now)',
      link: `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${date.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${date.format('YYYY')}/${date.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-MultiSensor-6d_night.nc`,
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'GSLA',
      link: 'https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/catalog.html',
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'SSTAARS',
      link: 'https://thredds.aodn.org.au/thredds/catalog/CSIRO/Climatology/SSTAARS/catalog.html',
      product: ['sixDaySst', 'climatology', 'EACMooringArray'],
    },
    {
      title: 'EAC Mooring Data',
      link: 'https://data.csiro.au/collection/csiro%3A52949v18',
      product: ['EACMooringArray'],
    },
  ];
};

export const getProductInfoByKey = (productKey: string, childKey?: string): ProductInfo | null => {
  const parentProduct = productInfoList.find((product) => product.id === productKey);

  if (!parentProduct) {
    return null;
  }

  if (childKey && parentProduct.childrenInfo?.[childKey]) {
    const childInfo = parentProduct.childrenInfo[childKey];
    return {
      id: childKey,
      title: childInfo.title || parentProduct.title,
      summary: childInfo.summary,
      description: childInfo.description,
      childrenInfo: parentProduct.childrenInfo,
      aboutButtonText: parentProduct.aboutButtonText,
    };
  }

  return parentProduct;
};
