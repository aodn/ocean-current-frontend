import { HomeProductData } from '../types/homeProductCarrousel.types';

export const productsData: HomeProductData[] = [
  {
    title: 'Daily Sea Surface Temperature',
    id: 'sixDaySst-sst',
    mainProduct: 'sixDaySst',
    subProduct: 'sixDaySst-sst',
    description: 'It provides a nationally consistent set of the available mapping data, was created by UTAS.',
    imageUrl: 'https://oceancurrent.aodn.org.au/SST_entry/latest.gif',
  },
  {
    title: 'Ocean Colour',
    id: 'oceanColour-chlA',
    mainProduct: 'oceanColour',
    subProduct: 'oceanColour-chlA',
    description: 'It provides a nationally consistent set of the available mapping data, was created by UTAS.',
    imageUrl: 'https://oceancurrent.aodn.org.au/chla_entry/latest.gif',
  },
  {
    title: 'Adjusted Sea Level Anomaly',
    id: 'adjustedSeaLevelAnomaly-sla',
    mainProduct: 'adjustedSeaLevelAnomaly',
    subProduct: 'adjustedSeaLevelAnomaly-sla',
    description: 'It provides a nationally consistent set of the available mapping data, was created by UTAS.',
    imageUrl: 'https://oceancurrent.aodn.org.au/GSLA_entry/latest.gif',
  },
  {
    title: 'Argo',
    id: 'argo',
    mainProduct: 'argo',
    subProduct: null,
    description: 'It provides a nationally consistent set of the available mapping data, was created by UTAS.',
    imageUrl: 'https://oceancurrent.aodn.org.au/profiles/map/20240403.gif',
  },
];
