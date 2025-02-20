import { Dayjs } from 'dayjs';
import { ProductInfo } from './types';
import { productInfoList } from './components/ProductDescriptionModal/ProductSummaryList';

export const buildDataSourceUrl = (type: string, date: Dayjs): string => {
  switch (type) {
    case 'L3S-6d':
      return `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3S-6d/ngt/${date.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3S-6d/ngt/${date.format('YYYY')}/${date.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-AVHRR_D-6d_night.nc`;
    case 'L3SM-6d':
      return `https://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${date.format('YYYY')}/catalog.html?dataset=IMOS/SRS/SST/ghrsst/L3SM-6d/ngt/${date.format('YYYY')}/${date.format('YYYYMMDD')}032000-ABOM-L3S_GHRSST-SSTskin-MultiSensor-6d_night.nc`;
    case 'GSLA':
      return `https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/NRT/${date.format('YYYY')}/catalog.html?dataset=IMOS/OceanCurrent/GSLA/NRT/${date.format('YYYY')}/IMOS_OceanCurrent_HV_${date.format('YYYYMMDD')}T060000Z_GSLA_FV02_NRT.nc`;
    default:
      return 'Unknown status.';
  }
};

export const getProductInfoByKey = (productKey: string): ProductInfo =>
  productInfoList.filter((product) => product.id === productKey)[0];
