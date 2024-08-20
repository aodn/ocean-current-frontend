import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import OceanColourIcon from '@/assets/icons/products/ocean-colour-icon.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg';
import MonthlyMeansIcon from '@/assets/icons/products/monthly-means-icon.svg';
import SurfaceWavesIcon from '@/assets/icons/products/surface-waves-icon.svg';
import FourHourSSTIcon from '@/assets/icons/products/4-hour-SST-icon.svg';
import SixHourSSTIcon from '@/assets/icons/products/6-hour-SST-icon.svg';
import CurrentMetersIcon from '@/assets/icons/products/current-meters-icon.svg';
import GliderIcon from '@/assets/icons/products/glider-icon.svg';
import SealCTDIcon from '@/assets/icons/products/seal-ctd-icon.svg';
import ArgoIcon from '@/assets/icons/products/argo-icon.svg';
import TidalCurrentsIcon from '@/assets/icons/products/in-water/tidal-currents-icon.svg';

export const linksData = [
  {
    title: 'Maps',
    leftLinks: [
      {
        id: 'snapshotSst',
        imageUrl: SSTIcon,
        title: 'Snapshot SST',
        description: 'Sea Surface Temperature',
        url: '/map/snapshot-sst',
      },
      {
        id: 'oceanColour',
        imageUrl: OceanColourIcon,
        title: 'Ocean Color',
        description: 'Satellite ocean color',
        url: '/map/ocean-colour/chl-a',
      },
      {
        id: 'climatology-sst',
        imageUrl: SSTIcon,
        title: 'Climatology SST',
        description: 'SSTAARS Climatology',
        url: '/map/climatology/sst',
      },
      {
        id: 'four-hour-sst',
        imageUrl: FourHourSSTIcon,
        title: 'Four Hour SST',
        description: 'Ocean current observations',
        url: '/map/four-hour-sst/sst',
      },
    ],
    rightLinks: [
      {
        id: 'sixDaySst-sst',
        imageUrl: SixHourSSTIcon,
        title: 'Daily SST',
        description: 'Daily sea surface temperature',
        url: '/map/6-day-sst/sst',
      },
      {
        id: 'adjustedSeaLevelAnomaly',
        imageUrl: AdjustedSeaLevelAnomalyIcon,
        title: 'Adj. Sea Level Anom.',
        description: 'Adjusted Sea Level Anomaly',
        url: '/map/adj-sea-level-anom/sla',
      },
      {
        id: 'monthlyMeans',
        imageUrl: MonthlyMeansIcon,
        title: 'Monthly Means',
        description: 'Monthly temperature averages',
        url: '/map/monthly-means/anomalies',
      },
      {
        id: 'surfaceWaves',
        imageUrl: SurfaceWavesIcon,
        title: 'Surface Waves',
        description: 'Ocean surface wave observations',
        url: '/map/surface-waves',
      },
    ],
  },
  {
    title: 'In-Water',
    leftLinks: [
      {
        id: 'argo',
        imageUrl: ArgoIcon,
        title: 'Argo',
        description: 'Ocean observation network',
        url: '/map/argo',
      },
      {
        id: 'gliders',
        imageUrl: GliderIcon,
        title: 'Gliders',
        description: 'Autonomous underwater vehicles',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },
      {
        id: 'tidal-currents',
        imageUrl: TidalCurrentsIcon,
        title: 'Tidal Currents',
        description: 'Oceanic flow patterns',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },
    ],
    rightLinks: [
      {
        id: 'current-meters',
        imageUrl: CurrentMetersIcon,
        title: 'Current Meters',
        description: 'Flow measurement devices',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },
      {
        id: 'sealctd',
        imageUrl: SealCTDIcon,
        title: 'SealCTD',
        description: 'Animal-mounted sensors',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },
      {
        id: 'eac-mooring-array',
        imageUrl: CurrentMetersIcon,
        title: 'EAC Mooring Array',
        description: 'Monitoring station network',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },
    ],
  },
  {
    title: 'News',
    url: 'https://oceancurrent.aodn.org.au/news.php',
  },
  {
    title: 'Guided Tour',
    url: 'https://oceancurrent.aodn.org.au/news.php',
  },
];
