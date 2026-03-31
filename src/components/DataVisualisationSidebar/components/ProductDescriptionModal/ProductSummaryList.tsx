import {
  AdjustedSeaLevelAnomalyModalData,
  ClimatologyModalData,
  FourHourSstModalData,
  OceanColourModalData,
  SixDaySstModalData,
  SixDaySstTimeseriesModalData,
  SurfaceWaveModalData,
  EACMooringArrayModalData,
  CurrentMetersModalData,
  ArgoModalData,
  TidalCurrentsModalData,
  SealCtdModalData,
} from '@/components/DataVisualisationSidebar/components/ProductDescriptionModal/ProductDescriptionData';
import { ProductInfo } from '../../types';

export const productInfoList: ProductInfo[] = [
  {
    id: 'fourHourSst',
    title: 'Four hour SST',
    summary:
      'Four-hour SST is a 4-hourly 2km resolution composite of sea surface temperatures from various satellites, including Himawari-8, Himawari-9, N15, N18, N19, MetopA, MetopB, and VIIRS Suomi-NPP.',
    description: FourHourSstModalData,
  },
  {
    id: 'sixDaySst',
    title: 'Six Day Sst',
    summary: 'Sea Surface Temperature (°C) 6-day composite of night-only SST',
    description: SixDaySstModalData,
    childrenInfo: {
      'sixDaySst-timeseries': {
        title: 'Monthly Mean SST Anomalies (SST Anom vs Time)',
        summary: 'Time series analysis of SST anomalies over time, showing trends and patterns.',
        description: SixDaySstTimeseriesModalData,
      },
      'sixDaySst-climatologySst': {
        title: 'SST Climatology',
        summary:
          'SSTAARS is a climatology of Australian regional seas, using 25 years of daily night-only SST data. It provides seasonal SST patterns, cloud-free data counts, sea level height, geostrophic velocity, and bathymetry contours, available from AODN.',
        description: ClimatologyModalData,
      },
      'sixDaySst-climatologyDataCount': {
        title: 'Data Count',
        summary:
          'Number of cloud-free observations used to construct the SSTAARS climatology across Australian regional seas.',
        description: ClimatologyModalData,
      },
    },
  },
  {
    id: 'oceanColour',
    title: 'Chlorophyll-a Concentration',
    summary:
      "Daily images of chlorophyll-a estimates from the MODIS sensor on NASA's Aqua satellite indicating the amount of phytoplankton in the water.",
    description: OceanColourModalData,
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    title: 'Adjusted Sea Level Anomaly',
    summary:
      'Adjusted Sea Level (ASL) accounts for slow ocean modes by removing rapid variations due to tides and atmospheric pressure, enabling near-surface velocity and ocean heat content estimates. ASL anomalies, measured as deviations from a long-term mean, help visualise significant sea level changes. Centile rankings of daily ASL anomalies show the extremity of anomalies compared to historical data, adjusted for regional trends.',
    description: AdjustedSeaLevelAnomalyModalData,
  },
  {
    id: 'surfaceWaves',
    title: 'Surface Waves',
    summary:
      "The map shows surface wave conditions around Australia from BoM's AUSWAVE-R model and observations. It includes significant wave height and peak wave direction, updated every 2 hours. Data sources are coastal buoys, radar altimeters, and satellite SAR within a 3-hour window.",
    description: SurfaceWaveModalData,
    childrenInfo: {
      'surfaceWaves-buoyTimeseries': {
        title: 'Buoy Timeseries',
        summary: null,
        description: () => null,
      },
    },
  },
  {
    id: 'monthlyMeans',
    title: 'Monthly Means',
    summary: null,
    description: () => null,
  },
  {
    id: 'argo',
    title: 'Argo Profiles',
    summary:
      'Temperature and salinity data from the selected float compared with satellite-adjusted climatology, down to 2000m in the Australian region.',
    description: ArgoModalData,
  },
  {
    id: 'tidalCurrents',
    title: 'Tidal current and sea level predictions',
    summary:
      'Predictions of tidal sea level and depth-average tidal current from tide gauge and current meter observations as well as from the CSIRO tidal model.',
    description: TidalCurrentsModalData,
  },
  {
    id: 'currentMeters',
    title: 'IMOS current meters on coastal and deep water moorings around Australia',
    summary:
      "The overview map is your entry point to a series of maps showing a few properties of Australia's ocean currents: mean (all-time, annual and seasonal), standard deviation for various layers and time-windows, and tidal harmonics for the depth-average flow.",
    description: CurrentMetersModalData,
  },
  {
    id: 'sealCtd',
    title: 'Temperature and Salinity profiles measured by animal-borne CTDs',
    summary:
      'The SealCTD product shows near real time location of seals equipped with CTD instruments, overlaid on SST maps and ice coverage.',
    description: SealCtdModalData,
  },
  {
    id: 'sealCtdTags',
    title: 'Temperature and Salinity profiles measured by animal-borne CTDs',
    summary:
      'The SealCTD product shows near real time location of seals equipped with CTD instruments, overlaid on SST maps and ice coverage.',
    description: SealCtdModalData,
  },
  {
    id: 'EACMooringArray',
    title: 'EAC Mooring Array',
    summary:
      'Daily estimates of East Australian Current (EAC) properties calculated from the CSIRO EAC gridded mooring product.',
    description: EACMooringArrayModalData,
  },
];
