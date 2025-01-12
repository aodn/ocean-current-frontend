import ArgoIcon from '@/assets/icons/products/grey-icons/argo-icon-grey.svg';
import SSTIcon from '@/assets/icons/products/grey-icons/sst-icon-grey.svg';
import OceanColourIcon from '@/assets/icons/products/grey-icons/ocean-colour-icon-grey.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/grey-icons/adjusted-sea-level-anomaly-icon-grey.svg';
import MonthlyMeansIcon from '@/assets/icons/products/grey-icons/monthly-means-icon-grey.svg';
import SurfaceWavesIcon from '@/assets/icons/products/grey-icons/surface-waves-icon-grey.svg';
import FourHourSSTIcon from '@/assets/icons/products/grey-icons/4-hour-sst-icon-grey.svg';
import SixHourSSTIcon from '@/assets/icons/products/grey-icons/6-day-sst-icon-grey.svg';
import CurrentMetersIcon from '@/assets/icons/products/grey-icons/current-meters-icon-grey.svg';
import GliderIcon from '@/assets/icons/products/grey-icons/glider-icon-grey.svg';
import SealCTDIcon from '@/assets/icons/products/grey-icons/seal-ctd-icon-grey.svg';
import TidalCurrentsIcon from '@/assets/icons/products/grey-icons/tidal-currents-icon-grey.svg';
import ClimatologyIcon from '@/assets/icons/products/grey-icons/climatology-icon-grey.svg';
import EACMooringArrayIcon from '@/assets/icons/products/grey-icons/eac-mooring-array-icon-grey.svg';
import { LinkItem } from '@/types/navbar';

export const linksData: LinkItem[] = [
  {
    title: 'Maps',
    links: [
      {
        id: 'snapshotSst',
        imageUrl: SSTIcon,
        title: 'Snapshot SST',
        description: 'Sea Surface Temperature',
        url: '/map/snapshot-sst',
      },
      {
        id: 'four-hour-sst',
        imageUrl: FourHourSSTIcon,
        title: 'Four-hour SST',
        description: 'Ocean current observations',
        url: '/map/four-hour-sst/sst',
      },
      {
        id: 'sixDaySst-sst',
        imageUrl: SixHourSSTIcon,
        title: 'Daily SST (6-day composite)',
        description: 'Daily sea surface temperature',
        url: '/map/6-day-sst/sst',
      },
      {
        id: 'oceanColour',
        imageUrl: OceanColourIcon,
        title: 'Chlorophyll-a Concentration',
        description: 'Satellite ocean color',
        url: '/map/ocean-colour/chl-a',
      },
      {
        id: 'adjustedSeaLevelAnomaly',
        imageUrl: AdjustedSeaLevelAnomalyIcon,
        title: 'Adj. Sea Level Anomaly',
        description: 'Adjusted Sea Level Anomaly',
        url: '/map/adj-sea-level-anom/sla',
      },
      {
        id: 'surfaceWaves',
        imageUrl: SurfaceWavesIcon,
        title: 'Surface Waves',
        description: 'Ocean surface wave observations',
        url: '/map/surface-waves',
      },
      {
        id: 'monthlyMeans',
        imageUrl: MonthlyMeansIcon,
        title: 'Monthly Means',
        description: 'Monthly temperature averages',
        url: '/map/monthly-means/anomalies',
      },
      {
        id: 'climatology-sst',
        imageUrl: ClimatologyIcon,
        title: 'Climatology SST',
        description: 'SSTAARS Climatology',
        url: '/map/climatology/sst',
      },
    ],
  },
  {
    title: 'In-Water',
    links: [
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
      {
        id: 'current-meters',
        imageUrl: CurrentMetersIcon,
        title: 'Current Meters',
        description: 'Flow measurement devices',
        url: 'product/current-meters',
      },
      {
        id: 'seal-ctd',
        imageUrl: SealCTDIcon,
        title: 'SealCTD',
        description: 'Animal-mounted sensors',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },

      /*
        EAC Mooring Array has data from only one region
        We're setting the region automatically so user shouldn't need to manually select the region
      */
      {
        id: 'eac-mooring-array',
        imageUrl: EACMooringArrayIcon,
        title: 'EAC Mooring Array',
        description: 'Monitoring station network',
        url: 'product/eac-mooring-array?region=Brisbane',
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
