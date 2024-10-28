import { HomeProductData } from '../types/homeProductCarousel.types';

export const productsData: HomeProductData[] = [
  {
    title: 'Daily Sea Surface Temperature',
    id: 'sixDaySst-sst',
    mainProduct: 'sixDaySst',
    subProduct: 'sixDaySst-sst',
    description:
      'Provides daily satellite measurements of ocean surface temperature, essential for monitoring thermal conditions and ocean currents',
  },
  {
    title: 'Chlorophyll-a Concentration',
    id: 'oceanColour-chlA',
    mainProduct: 'oceanColour',
    subProduct: 'oceanColour-chlA',
    description:
      'Offers insights into phytoplankton concentration and water quality, crucial for understanding marine ecosystem health',
  },
  {
    title: 'Adjusted Sea Level Anomaly',
    id: 'adjustedSeaLevelAnomaly-sla',
    mainProduct: 'adjustedSeaLevelAnomaly',
    subProduct: 'adjustedSeaLevelAnomaly-sla',
    description:
      'Shows deviations in sea level after accounting for atmospheric pressure and tides, helping track ocean circulation patterns.',
  },
  {
    title: 'Surface Waves',
    id: 'surfaceWaves',
    mainProduct: 'surface-waves',
    subProduct: null,
    description: 'Monitors wave heights and patterns, important for marine navigation and coastal management.',
  },
];
