import { HomeProductData } from '../types/HomeProductCarrousel.types';

export const productsData: HomeProductData[] = [
  {
    title: 'Sea Surface Temperature',
    id: 'fourHourSst-Sst',
    mainProduct: 'fourHourSst',
    subProduct: 'Sst',
    description: 'It provides a nationally consistent set of the available mapping data, was created by UTAS.',
    imageUrl: 'https://oceancurrent.aodn.org.au/SST_entry/latest.gif',
  },
  {
    title: 'Ocean Colour',
    id: 'oceanColor',
    mainProduct: 'oceanColor',
    subProduct: null,
    description: 'It provides a nationally consistent set of the available mapping data, was created by UTAS.',
    imageUrl: 'https://oceancurrent.aodn.org.au/chla_entry/latest.gif',
  },
  {
    title: 'Adjusted Sea Level Anomaly',
    id: 'adjSeaLevelAnom',
    mainProduct: 'adjSeaLevelAnom',
    subProduct: null,
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
