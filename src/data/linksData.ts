import { LinkItem } from '@/types/navbar';
import {
  OceanColourIcon,
  AdjustedSeaLevelAnomalyIcon,
  MonthlyMeansIcon,
  SurfaceWavesIcon,
  FourHourSSTIcon,
  SixHourSSTIcon,
  ArgoIcon,
  TidalCurrentsIcon,
  CurrentMetersIcon,
  SealCTDIcon,
  ClimatologyIcon,
  EACMooringArrayIcon,
  GlidersIcon,
  MyOceanCurrentIcon,
  SwotIcon,
  FishSOOPIcon,
} from '@/components/Shared/Icons';
import { APP_ROUTES } from '@/routers/appRoutes';
import { buildLandingUrl } from '@/configs/products/landing';

export const linksData: LinkItem[] = [
  {
    title: 'Maps',
    links: [
      {
        id: 'fourHourSst-sst',
        Icon: FourHourSSTIcon,
        title: 'Four-hour SST',
        description: 'SST at 4-hour intervals with location of in situ instruments overlaid',
        url: buildLandingUrl('fourHourSst'),
      },
      {
        id: 'sixDaySst-sst',
        Icon: SixHourSSTIcon,
        title: 'Daily SST (6-day composite)',
        description: 'SST, anomalies, and percentiles at 1-day intervals with location of in situ instruments overlaid',
        url: buildLandingUrl('sixDaySst'),
      },
      {
        id: 'oceanColour',
        Icon: OceanColourIcon,
        title: 'Chlorophyll-a Concentration',
        description: 'Chl-a estimated from satellite observations of the colour of the ocean',
        url: buildLandingUrl('oceanColour'),
      },
      {
        id: 'adjustedSeaLevelAnomaly',
        Icon: AdjustedSeaLevelAnomalyIcon,
        title: 'Adjusted Sea Level Anomaly',
        description:
          'Adj SLA, percentiles, and non-tidal SLA, with atmospheric pressure and in situ instruments overlaid',
        url: buildLandingUrl('adjustedSeaLevelAnomaly'),
      },
      {
        id: 'surfaceWaves',
        Icon: SurfaceWavesIcon,
        title: 'Surface Waves',
        description: 'Height, direction, and period from modelled and observed surface waves',
        url: buildLandingUrl('surfaceWaves'),
      },
      {
        id: 'monthlyMeans',
        Icon: MonthlyMeansIcon,
        title: 'Monthly Means',
        description: 'Maps of SST and Adj SLA monthly means',
        url: buildLandingUrl('monthlyMeans'),
      },
      {
        id: 'sixDaySst-climatology',
        Icon: ClimatologyIcon,
        title: 'Climatology',
        description: 'Maps of SST and Adj SLA climatological values',
        // Climatology is a child product entry — no matching root product in PRODUCT_LANDING
        url: '/product/six-day-sst/climatology',
      },
      {
        id: 'myOceanCurrent',
        Icon: MyOceanCurrentIcon,
        title: 'My Ocean Current',
        description: 'Interactive near-real time single satellite SST maps',
        url: 'https://mrs-data.csiro.au/myoceancurrent/sst/',
      },
      {
        id: 'swotGsla',
        Icon: SwotIcon,
        title: 'SWOT and GSLA',
        description:
          'Wide-swath altimetry data over gridded Adj SLA intervals with location of in situ instruments overlaid',
        url: buildLandingUrl('swotGsla'),
      },
    ],
  },
  {
    title: 'In-Water',
    links: [
      {
        id: 'argo',
        Icon: ArgoIcon,
        title: 'Argo',
        description: 'Temperature and salinity down to 2000 m',
        url: buildLandingUrl('argo'),
      },
      {
        id: 'gliders',
        Icon: GlidersIcon,
        title: 'Gliders',
        description: 'Near-coast ocean properties at sub-surface',
        // TODO(#522): gliders landing TBD — will likely point to a yearmaps.php-style page
        url: 'https://oceancurrent.aodn.org.au/gliders',
      },
      {
        id: 'tidalCurrents',
        Icon: TidalCurrentsIcon,
        title: 'Tidal Currents',
        description: 'Predictions of tidal currents and tidal sea level',
        url: buildLandingUrl('tidalCurrents'),
      },
      {
        id: 'currentMeters',
        Icon: CurrentMetersIcon,
        title: 'Current Meters',
        description: 'Current properties measured by moored instruments around Australia',
        url: buildLandingUrl('currentMeters'),
      },
      {
        id: 'sealCtd',
        Icon: SealCTDIcon,
        title: 'SealCTD',
        description: 'Temperature and salinity down to ~800 m',
        url: buildLandingUrl('sealCtd'),
      },
      /*
        EAC Mooring Array has data from only one region
        We're setting the region automatically so user shouldn't need to manually select the region
      */
      {
        id: 'EACMooringArray',
        Icon: EACMooringArrayIcon,
        title: 'EAC Mooring Array',
        description: 'Temperature, salinity, velocities, and their anomalies of the East Australian Current at 27.5°S',
        url: buildLandingUrl('EACMooringArray'),
      },
      {
        id: 'fishSOOP',
        Icon: FishSOOPIcon,
        title: 'FishSOOP',
        description: 'Near-coast temperature profiles',
        url: buildLandingUrl('fishSOOP'),
      },
    ],
  },
  {
    title: 'News',
    url: APP_ROUTES.NEWS,
  },
  {
    title: 'Guided Tour',
    url: 'https://oceancurrent.aodn.org.au/whatsshown.php',
  },
];
