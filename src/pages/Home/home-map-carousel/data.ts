import { HomeProductData } from './types';

export const productsData: HomeProductData[] = [
  {
    title: 'Sea Surface Temperature',
    id: 'sixDaySst-sst',
    mainProduct: 'sixDaySst',
    subProduct: 'sixDaySst-sst',
    description:
      'Maps of SST, SST anomaly, and SST centiles combined with geostrophic currents from remote sensing and sub-surface measurements from in-situ instruments.',
  },
  {
    title: 'Chlorophyll-a Concentration',
    id: 'oceanColour-chlA',
    mainProduct: 'oceanColour',
    subProduct: 'oceanColour-chlA',
    description:
      'Maps of chlorophyll-a estimated from satellite observations of the colour of the ocean. This is a proxy for phytoplankton abundance.',
  },
  {
    title: 'Adjusted Sea Level Anomaly',
    id: 'adjustedSeaLevelAnomaly-sla',
    mainProduct: 'adjustedSeaLevelAnomaly',
    subProduct: 'adjustedSeaLevelAnomaly-sla',
    description:
      'Maps of Adjusted SLA and centiles combined with atmospheric mean sea level pressure and sub-surface measurements from in-situ instruments.',
  },
  {
    title: 'Surface Waves',
    id: 'surfaceWaves-wave',
    mainProduct: 'surfaceWaves',
    subProduct: 'surfaceWaves-wave',
    description:
      'Maps of modelled surface wave fields and wave measurements from coastal wave buoys and remote sensing.',
  },
  {
    title: 'SealCTD',
    id: 'sealCtd-sealTracks',
    mainProduct: 'sealCtd',
    subProduct: 'sealCtd-sealTracks',
    description: 'Temperature and Salinity Profiles from Ocean Mammals',
  },
];
