import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import SSTWhiteIcon from '@/assets/icons/products/white-icons/SST-white-icon.svg';
import OceanColourIcon from '@/assets/icons/products/ocean-colour-icon.svg';
import OceanColourWhiteIcon from '@/assets/icons/products/white-icons/ocean-colour-white-icon.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg';
import AdjustedSeaLevelAnomalyWhiteIcon from '@/assets/icons/products/white-icons/adjusted-sea-level-anomaly-white-icon.svg';
import MonthlyMeansIcon from '@/assets/icons/products/monthly-means-icon.svg';
import MonthlyMeansWhiteIcon from '@/assets/icons/products/white-icons/monthly-means-white-icon.svg';
import SurfaceWavesIcon from '@/assets/icons/products/surface-waves-icon.svg';
import SurfaceWavesWhiteIcon from '@/assets/icons/products/white-icons/surface-waves-white-icon.svg';
import FourHourSSTIcon from '@/assets/icons/products/4-hour-SST-icon.svg';
import FourHourSSTWhiteIcon from '@/assets/icons/products/white-icons/4-hour-SST-white-icon.svg';
import SixHourSSTIcon from '@/assets/icons/products/6-hour-SST-icon.svg';
import SixHourSSTWhiteIcon from '@/assets/icons/products/white-icons/6-hour-SST-white-icon.svg';
import ArgoIcon from '@/assets/icons/products/argo-icon.svg';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';

export const mapNavbarDataElements: DropdownElement[] = [
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
    label: 'Chlorophyll-a',
    icon: OceanColourIcon,
    selectedIcon: OceanColourWhiteIcon,
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    label: 'Adj. Sea Level Anomaly',
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
];

export const mapSidebarElements = [...mapNavbarDataElements, { id: 'argo', label: 'Argo', icon: ArgoIcon }];
