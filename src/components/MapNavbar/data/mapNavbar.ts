import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import OceanColourIcon from '@/assets/icons/products/ocean-colour-icon.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg';
import MonthlyMeansIcon from '@/assets/icons/products/monthly-means-icon.png';
import SurfaceWavesIcon from '@/assets/icons/products/surface-waves-icon.png';
import FourHourSSTIcon from '@/assets/icons/products/4-hour-SST-icon.png';
import SixHourSSTIcon from '@/assets/icons/products/6-hour-SST-icon.png';
import { mapNavBarElement } from '../types/mapNavbar.types';

export const mapNavbarDataElements: mapNavBarElement[] = [
  { id: 'snapshot-sea', label: 'Snapshot Sea', icon: SSTIcon },
  { id: 'ocean-colour', label: 'Ocean Colour', icon: OceanColourIcon },
  { id: 'adjusted-sea-level-anomaly', label: 'Adjusted Sea Level Anomaly', icon: AdjustedSeaLevelAnomalyIcon },
  { id: 'monthly-means', label: 'Monthly Means', icon: MonthlyMeansIcon },
  { id: 'surface-waves', label: 'Surface Waves', icon: SurfaceWavesIcon },
  { id: 'four-hour-sst', label: 'Four Hour SST', icon: FourHourSSTIcon },
  { id: 'six-hour-sst', label: 'Six Hour SST', icon: SixHourSSTIcon },
];
