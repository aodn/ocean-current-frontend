import SSTIcon from '@/assets/icons/products/grey-icons/sst-icon-grey.svg';
import SSTWhiteIcon from '@/assets/icons/products/white-icons/sst-icon-white.svg';
import OceanColourIcon from '@/assets/icons/products/grey-icons/ocean-colour-icon-grey.svg';
import OceanColourWhiteIcon from '@/assets/icons/products/white-icons/ocean-colour-icon-white.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/grey-icons/adjusted-sea-level-anomaly-icon-grey.svg';
import AdjustedSeaLevelAnomalyWhiteIcon from '@/assets/icons/products/white-icons/adjusted-sea-level-anomaly-icon-white.svg';
import MonthlyMeansIcon from '@/assets/icons/products/grey-icons/monthly-means-icon-grey.svg';
import MonthlyMeansWhiteIcon from '@/assets/icons/products/white-icons/monthly-means-icon-white.svg';
import SurfaceWavesIcon from '@/assets/icons/products/grey-icons/surface-waves-icon-grey.svg';
import SurfaceWavesWhiteIcon from '@/assets/icons/products/white-icons/surface-waves-icon-white.svg';
import FourHourSSTIcon from '@/assets/icons/products/grey-icons/4-hour-sst-icon-grey.svg';
import FourHourSSTWhiteIcon from '@/assets/icons/products/white-icons/4-hour-sst-icon-white.svg';
import SixHourSSTIcon from '@/assets/icons/products/grey-icons/6-day-sst-icon-grey.svg';
import SixHourSSTWhiteIcon from '@/assets/icons/products/white-icons/6-day-sst-icon-white.svg';
import ArgoIcon from '@/assets/icons/products/grey-icons/argo-icon-grey.svg';
import ArgoWhiteIcon from '@/assets/icons/products/white-icons/argo-icon-white.svg';
import TidalCurrentsIcon from '@/assets/icons/products/grey-icons/tidal-currents-icon-grey.svg';
import TidalCurrentsWhiteIcon from '@/assets/icons/products/white-icons/tidal-currents-icon-white.svg';
import CurrentMetersIcon from '@/assets/icons/products/grey-icons/current-meters-icon-grey.svg';
import CurrentMetersWhiteIcon from '@/assets/icons/products/white-icons/current-meters-icon-white.svg';
import SealCTDIcon from '@/assets/icons/products/grey-icons/seal-ctd-icon-grey.svg';
import SealCTDWhiteIcon from '@/assets/icons/products/white-icons/seal-ctd-icon-white.svg';
import EACMooringArrayIcon from '@/assets/icons/products/grey-icons/eac-mooring-array-icon-grey.svg';
import EACMooringArrayWhiteIcon from '@/assets/icons/products/white-icons/eac-mooring-array-icon-white.svg';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import { RootProductID } from '@/types/product';

export const sidebarProductsNav: DropdownElement<RootProductID>[] = [
  {
    id: 'fourHourSst',
    label: 'Four-hour SST',
    icon: FourHourSSTIcon,
    selectedIcon: FourHourSSTWhiteIcon,
  },
  {
    id: 'sixDaySst',
    label: 'Daily SST (6-day composite)',
    icon: SixHourSSTIcon,
    selectedIcon: SixHourSSTWhiteIcon,
  },
  {
    id: 'oceanColour',
    label: 'Chlorophyll-a Concentration',
    icon: OceanColourIcon,
    selectedIcon: OceanColourWhiteIcon,
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    label: 'Adjusted Sea Level Anomaly',
    icon: AdjustedSeaLevelAnomalyIcon,
    selectedIcon: AdjustedSeaLevelAnomalyWhiteIcon,
  },
  {
    id: 'surfaceWaves',
    label: 'Surface Waves',
    icon: SurfaceWavesIcon,
    selectedIcon: SurfaceWavesWhiteIcon,
  },
  {
    id: 'monthlyMeans',
    label: 'Monthly Means',
    icon: MonthlyMeansIcon,
    selectedIcon: MonthlyMeansWhiteIcon,
  },
  {
    id: 'climatology',
    label: 'Climatology SST',
    icon: SSTIcon,
    selectedIcon: SSTWhiteIcon,
  },
  {
    id: 'argo',
    label: 'Argo',
    icon: ArgoIcon,
    selectedIcon: ArgoWhiteIcon,
  },
  {
    id: 'tidalCurrents',
    label: 'Tidal Currents',
    icon: TidalCurrentsIcon,
    selectedIcon: TidalCurrentsWhiteIcon,
  },
  {
    id: 'currentMeters',
    label: 'Current Meters',
    icon: CurrentMetersIcon,
    selectedIcon: CurrentMetersWhiteIcon,
  },
  {
    id: 'sealCtd',
    label: 'SealCTD',
    icon: SealCTDIcon,
    selectedIcon: SealCTDWhiteIcon,
  },
  {
    id: 'EACMooringArray',
    label: 'EAC Mooring Array',
    icon: EACMooringArrayIcon,
    selectedIcon: EACMooringArrayWhiteIcon,
  },
];
