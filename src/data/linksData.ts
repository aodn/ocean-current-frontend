import ArgoGreyIcon from '@/assets/icons/products/grey-icons/argo-icon-grey.svg';
import SSTGreyIcon from '@/assets/icons/products/grey-icons/sst-icon-grey.svg';
import OceanColourGreyIcon from '@/assets/icons/products/grey-icons/ocean-colour-icon-grey.svg';
import AdjustedSeaLevelAnomalyGreyIcon from '@/assets/icons/products/grey-icons/adjusted-sea-level-anomaly-icon-grey.svg';
import MonthlyMeansGreyIcon from '@/assets/icons/products/grey-icons/monthly-means-icon-grey.svg';
import SurfaceWavesGreyIcon from '@/assets/icons/products/grey-icons/surface-waves-icon-grey.svg';
import FourHourSSTGreyIcon from '@/assets/icons/products/grey-icons/4-hour-sst-icon-grey.svg';
import SixHourSSTGreyIcon from '@/assets/icons/products/grey-icons/6-day-sst-icon-grey.svg';
import CurrentMetersGreyIcon from '@/assets/icons/products/grey-icons/current-meters-icon-grey.svg';
import GliderGreyIcon from '@/assets/icons/products/grey-icons/glider-icon-grey.svg';
import SealCTDGreyIcon from '@/assets/icons/products/grey-icons/seal-ctd-icon-grey.svg';
import TidalCurrentsGreyIcon from '@/assets/icons/products/grey-icons/tidal-currents-icon-grey.svg';
import ClimatologyGreyIcon from '@/assets/icons/products/grey-icons/climatology-icon-grey.svg';
import EACMooringArrayGreyIcon from '@/assets/icons/products/grey-icons/eac-mooring-array-icon-grey.svg';
import ArgoBlueIcon from '@/assets/icons/products/blue-icons/argo-icon-blue.svg';
import SSTBlueIcon from '@/assets/icons/products/blue-icons/sst-icon-blue.svg';
import OceanColourBlueIcon from '@/assets/icons/products/blue-icons/ocean-colour-icon-blue.svg';
import AdjustedSeaLevelAnomalyBlueIcon from '@/assets/icons/products/blue-icons/adjusted-sea-level-anomaly-icon-blue.svg';
import MonthlyMeansBlueIcon from '@/assets/icons/products/blue-icons/monthly-means-icon-blue.svg';
import SurfaceWavesBlueIcon from '@/assets/icons/products/blue-icons/surface-waves-icon-blue.svg';
import FourHourSSTBlueIcon from '@/assets/icons/products/blue-icons/4-hour-sst-icon-blue.svg';
import SixHourSSTBlueIcon from '@/assets/icons/products/blue-icons/6-day-sst-icon-blue.svg';
import CurrentMetersBlueIcon from '@/assets/icons/products/blue-icons/current-meters-icon-blue.svg';
import GliderBlueIcon from '@/assets/icons/products/blue-icons/glider-icon-blue.svg';
import SealCTDBlueIcon from '@/assets/icons/products/blue-icons/seal-ctd-icon-blue.svg';
import TidalCurrentsBlueIcon from '@/assets/icons/products/blue-icons/tidal-currents-icon-blue.svg';
import ClimatologyBlueIcon from '@/assets/icons/products/blue-icons/climatology-icon-blue.svg';
import EACMooringArrayBlueIcon from '@/assets/icons/products/blue-icons/eac-mooring-array-icon-blue.svg';
import { LinkItem } from '@/types/navbar';

export const linksData: LinkItem[] = [
  {
    title: 'Maps',
    links: [
      {
        id: 'snapshotSst',
        greyIcon: SSTGreyIcon,
        blueIcon: SSTBlueIcon,
        title: 'Snapshot SST',
        description: 'Sea Surface Temperature',
        url: '/map/snapshot-sst',
      },
      {
        id: 'four-hour-sst',
        greyIcon: FourHourSSTGreyIcon,
        blueIcon: FourHourSSTBlueIcon,
        title: 'Four-hour SST',
        description: 'Ocean current observations',
        url: '/map/four-hour-sst/sst',
      },
      {
        id: 'sixDaySst-sst',
        greyIcon: SixHourSSTGreyIcon,
        blueIcon: SixHourSSTBlueIcon,
        title: 'Daily SST (6-day composite)',
        description: 'Daily sea surface temperature',
        url: '/map/6-day-sst/sst',
      },
      {
        id: 'oceanColour',
        greyIcon: OceanColourGreyIcon,
        blueIcon: OceanColourBlueIcon,
        title: 'Chlorophyll-a Concentration',
        description: 'Satellite ocean color',
        url: '/map/ocean-colour/chl-a',
      },
      {
        id: 'adjustedSeaLevelAnomaly',
        greyIcon: AdjustedSeaLevelAnomalyGreyIcon,
        blueIcon: AdjustedSeaLevelAnomalyBlueIcon,
        title: 'Adjusted Sea Level Anomaly',
        description: 'Adjusted Sea Level Anomaly',
        url: '/map/adjusted-sea-level-anomaly/sla',
      },
      {
        id: 'surfaceWaves',
        greyIcon: SurfaceWavesGreyIcon,
        blueIcon: SurfaceWavesBlueIcon,
        title: 'Surface Waves',
        description: 'Ocean surface wave observations',
        url: '/map/surface-waves',
      },
      {
        id: 'monthlyMeans',
        greyIcon: MonthlyMeansGreyIcon,
        blueIcon: MonthlyMeansBlueIcon,
        title: 'Monthly Means',
        description: 'Monthly temperature averages',
        url: '/map/monthly-means/anomalies',
      },
      {
        id: 'climatology-sst',
        greyIcon: ClimatologyGreyIcon,
        blueIcon: ClimatologyBlueIcon,
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
        greyIcon: ArgoGreyIcon,
        blueIcon: ArgoBlueIcon,
        title: 'Argo',
        description: 'Ocean observation network',
        url: '/map/argo',
      },
      {
        id: 'gliders',
        greyIcon: GliderGreyIcon,
        blueIcon: GliderBlueIcon,
        title: 'Gliders',
        description: 'Autonomous underwater vehicles',
        url: 'https://oceancurrent.aodn.org.au/index.php',
      },
      {
        id: 'tidal-currents',
        greyIcon: TidalCurrentsGreyIcon,
        blueIcon: TidalCurrentsBlueIcon,
        title: 'Tidal Currents',
        description: 'Oceanic flow patterns',
        url: 'map/tidal-currents/speed',
      },
      {
        id: 'current-meters',
        greyIcon: CurrentMetersGreyIcon,
        blueIcon: CurrentMetersBlueIcon,
        title: 'Current Meters',
        description: 'Flow measurement devices',
        url: 'map/current-meters/moored-instrument-array',
      },
      {
        id: 'seal-ctd',
        greyIcon: SealCTDGreyIcon,
        blueIcon: SealCTDBlueIcon,
        title: 'SealCTD',
        description: 'Animal-mounted sensors',
        url: 'map/seal-ctd/tracks',
      },
      /*
        EAC Mooring Array has data from only one region
        We're setting the region automatically so user shouldn't need to manually select the region
      */
      {
        id: 'eac-mooring-array',
        greyIcon: EACMooringArrayGreyIcon,
        blueIcon: EACMooringArrayBlueIcon,
        title: 'EAC Mooring Array',
        description: 'Monitoring station network',
        url: 'map/eac-mooring-array?region=Brisbane',
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
