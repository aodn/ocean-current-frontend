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
} from '@/components/Shared/Icons';

export const linksData: LinkItem[] = [
  {
    title: 'Maps',
    links: [
      {
        id: 'fourHourSst-sst',
        Icon: FourHourSSTIcon,
        title: 'Four-hour SST',
        description: 'Ocean current observations',
        url: '/map/four-hour-sst/sst',
      },
      {
        id: 'sixDaySst-sst',
        Icon: SixHourSSTIcon,
        title: 'Daily SST (6-day composite)',
        description: 'Daily sea surface temperature',
        url: '/map/six-day-sst/sst',
      },
      {
        id: 'oceanColour',
        Icon: OceanColourIcon,
        title: 'Chlorophyll-a Concentration',
        description: 'Satellite ocean color',
        url: '/map/ocean-colour/chl-a',
      },
      {
        id: 'adjustedSeaLevelAnomaly',
        Icon: AdjustedSeaLevelAnomalyIcon,
        title: 'Adjusted Sea Level Anomaly',
        description: 'Adjusted Sea Level Anomaly',
        url: '/map/adjusted-sea-level-anomaly/sla',
      },
      {
        id: 'surfaceWaves',
        Icon: SurfaceWavesIcon,
        title: 'Surface Waves',
        description: 'Ocean surface wave observations',
        url: '/map/surface-waves',
      },
      {
        id: 'monthlyMeans',
        Icon: MonthlyMeansIcon,

        title: 'Monthly Means',
        description: 'Monthly temperature averages',
        url: '/map/monthly-means/anomalies',
      },
      {
        id: 'climatology-sst',
        Icon: ClimatologyIcon,
        title: 'Climatology SST',
        description: 'SSTAARS Climatology',
        url: '/map/climatology/sst',
      },
      {
        id: 'myOceanCurrent',
        Icon: MyOceanCurrentIcon,
        title: 'My Ocean Current',
        description: 'My Ocean Current',
        url: 'https://mrs-data.csiro.au/myoceancurrent/sst/',
      },
      {
        id: 'swotGsla',
        Icon: SwotIcon,
        title: 'SWOT and GSLA',
        description: 'SWOT and GSLA',
        url: 'https://oceancurrent.aodn.org.au/product.php?product=swot&region=Au',
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
        description: 'Ocean observation network',
        url: '/map/argo',
      },
      {
        id: 'gliders',
        Icon: GlidersIcon,
        title: 'Gliders',
        description: 'Autonomous underwater vehicles',
        url: 'https://oceancurrent.aodn.org.au/gliders',
      },
      {
        id: 'tidalCurrents',
        Icon: TidalCurrentsIcon,
        title: 'Tidal Currents',
        description: 'Oceanic flow patterns',
        url: '/map/tidal-currents/speed',
      },
      {
        id: 'currentMeters',
        Icon: CurrentMetersIcon,
        title: 'Current Meters',
        description: 'Flow measurement devices',
        url: '/map/current-meters/moored-instrument-array',
      },
      {
        id: 'sealCtd',
        Icon: SealCTDIcon,
        title: 'SealCTD',
        description: 'Animal-mounted sensors',
        url: '/product/seal-ctd/tracks?region=POLAR&date=20240522', // falls back to this date if API call fails
      },
      /*
        EAC Mooring Array has data from only one region
        We're setting the region automatically so user shouldn't need to manually select the region
      */
      {
        id: 'EACMooringArray',
        Icon: EACMooringArrayIcon,
        title: 'EAC Mooring Array',
        description: 'Monitoring station network',
        url: '/map/eac-mooring-array?region=Brisbane',
      },
    ],
  },
  {
    title: 'News',
    url: 'https://imos.org.au/news/category/imos-oceancurrent',
  },
  {
    title: 'Guided Tour',
    url: 'https://oceancurrent.aodn.org.au/whatsshown.php',
  },
];
