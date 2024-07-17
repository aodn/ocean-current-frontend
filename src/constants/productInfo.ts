import {
  AdjustedSeaLevelAnomalyModalData,
  ClimatologyModalData,
  FourHourSstModalData,
  OceanColourModalData,
  SixDaySstModalData,
  SnapshotModalData,
  SurfaceWaveModalData,
} from '@/components/DataVisualizationSidebar/components/modals/productsModalData';
import { ProductInfo } from '@/types/product';

const list: ProductInfo[] = [
  {
    id: 'snapshotSst',
    title: 'Snapshot Sst',
    summary:
      'Our legacy system displays SST images from NOAA, MODIS, and VIIRS. Snapshot SST shows detailed individual images without time-averaging, but they often have gaps due to clouds. We fill these gaps with the latest available ocean view to improve animation clarity.',
    description: SnapshotModalData,
  },
  {
    id: 'oceanColour',
    title: 'Ocean Colour',
    summary:
      'Daily images of chlorophyll-a estimates from the MODIS sensor on NASA’s Aqua satellite indicating the amount of phytoplankton in the water.',
    description: OceanColourModalData,
  },
  {
    id: 'sixDaySst',
    title: 'Six Day Sst',
    summary: 'Sea Surface Temperature (°C) 6-day ngt-only comp QL3',
    description: SixDaySstModalData,
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    title: 'Adjusted Sea Level Anomaly',
    summary:
      'Adjusted Sea Level (ASL) accounts for slow ocean modes by removing rapid variations due to tides and atmospheric pressure, enabling near-surface velocity and ocean heat content estimates. ASL anomalies, measured as deviations from a long-term mean, help visualize significant sea level changes. Centile rankings of daily ASL anomalies show the extremity of anomalies compared to historical data, adjusted for regional trends.',
    description: AdjustedSeaLevelAnomalyModalData,
  },
  {
    id: 'surfaceWaves',
    title: 'Surface Waves',
    summary:
      "The map shows surface wave conditions around Australia from BoM's AUSWAVE-R model and observations. It includes significant wave height and peak wave direction, updated every 2 hours. Data sources are coastal buoys, radar altimeters, and satellite SAR within a 3-hour window.",
    description: SurfaceWaveModalData,
  },
  {
    id: 'fourHourSst',
    title: 'Four hour SST',
    summary:
      'Four-hour SST is a 4-hourly 2km resolution composite of sea surface temperatures from various satellites, including Himawari-8, Himawari-9, N15, N18, N19, MetopA, MetopB, and VIIRS Suomi-NPP.',
    description: FourHourSstModalData,
  },
  {
    id: 'climatology',
    title: 'Climatology',
    summary:
      'SSTAARS is a climatology of Australian regional seas, using 25 years of daily night-only SST data. It provides seasonal SST patterns, cloud-free data counts, sea level height, geostrophic velocity, and bathymetry contours, available from AODN.',
    description: ClimatologyModalData,
  },
];

const productDescription = list.map((item) => {
  return item;
});

export { productDescription };
