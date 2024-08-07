import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import OceanColourIcon from '@/assets/icons/products/ocean-colour-icon.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg';
import MonthlyMeansIcon from '@/assets/icons/products/monthly-means-icon.svg';
import SurfaceWavesIcon from '@/assets/icons/products/surface-waves-icon.svg';
import FourHourSSTIcon from '@/assets/icons/products/4-hour-SST-icon.svg';
import SixHourSSTIcon from '@/assets/icons/products/6-hour-SST-icon.svg';
import ArgoIcon from '@/assets/icons/products/argo-icon.svg';

export const mapNavbarDataElements = [
  { id: 'oceanColour', label: 'Ocean Colour', icon: OceanColourIcon },
  { id: 'adjustedSeaLevelAnomaly', label: 'Adj. Sea Level Anom.', icon: AdjustedSeaLevelAnomalyIcon },
  { id: 'monthlyMeans', label: 'Monthly Means', icon: MonthlyMeansIcon },
  { id: 'surfaceWaves', label: 'Surface Waves', icon: SurfaceWavesIcon },
  { id: 'fourHourSst', label: 'Four Hour SST', icon: FourHourSSTIcon },
  { id: 'sixDaySst', label: '6-Day SST', icon: SixHourSSTIcon },
  { id: 'climatology', label: 'Climatology', icon: SSTIcon },
];

export const mapSidebarElements = [...mapNavbarDataElements, { id: 'argo', label: 'Argo', icon: ArgoIcon }];
