import { Dayjs } from 'dayjs';
import { DataSource, ProductInfo } from './types';
import { productInfoList } from './components/ProductDescriptionModal/ProductSummaryList';

export const dataSources: (date: Dayjs) => DataSource[] = (date) => {
  return [
    {
      title: 'SST L3S-6d ngt (1992-2017)',
      link: `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3S-6d/ngt/${date.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3S-6d/ngt/${date.format('YYYY')}/${date.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-AVHRR_D-6d_night.nc`,
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'SST L3SM-6d ngt (2018-now)',
      link: `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${date.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${date.format('YYYY')}/${date.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-MultiSensor-6d_night.nc`,
      product: ['sixDaySst', 'EACMooringArray'],
    },
    {
      title: 'GSLA',
      link: `https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/NRT/${date.format('YYYY')}/catalog.html?dataset=IMOS/OceanCurrent/GSLA/NRT/${date.format('YYYY')}/IMOS_OceanCurrent_HV_${date.format('YYYYMMDD')}T060000Z_GSLA_FV02_NRT.nc`,
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
};

export const getProductInfoByKey = (productKey: string): ProductInfo =>
  productInfoList.filter((product) => product.id === productKey)[0];
