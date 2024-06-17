import SSTIcon from '@/assets/icons/products/SST-icon.svg';
import OceanColourIcon from '@/assets/icons/products/ocean-colour-icon.svg';
import AdjustedSeaLevelAnomalyIcon from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg';
import MonthlyMeansIcon from '@/assets/icons/products/monthly-means-icon.svg';
import SurfaceWavesIcon from '@/assets/icons/products/surface-waves-icon.svg';
import FourHourSSTIcon from '@/assets/icons/products/4-hour-SST-icon.svg';
import SixHourSSTIcon from '@/assets/icons/products/6-hour-SST-icon.svg';
import ArgoIcon from '@/assets/icons/products/argo-icon.svg';
import australiaIcon from '@/assets/icons/australia-icon.png';
import localRegionIcon from '@/assets/icons/local-region-icon.png';
import stateRegionIcon from '@/assets/icons/state-region-icon.png';
import { RegionScope } from '@/constants/region';
import { MapNavBarElement } from '../types/mapNavbar.types';

interface RegionSelectionElement {
  key: RegionScope;
  label: string;
  icon: string;
}

export const mapNavbarDataElements: MapNavBarElement[] = [
  { id: 'snapshotSst', label: 'Snapshot SST', icon: SSTIcon },
  { id: 'oceanColour-chlA', label: 'Ocean Colour', icon: OceanColourIcon },
  { id: 'adjustedSeaLevelAnomaly-sla', label: 'Adj. Sea Level Anom.', icon: AdjustedSeaLevelAnomalyIcon },
  { id: 'monthlyMeans', label: 'Monthly Means', icon: MonthlyMeansIcon },
  { id: 'surfaceWaves', label: 'Surface Waves', icon: SurfaceWavesIcon },
  { id: 'fourHourSst-sst', label: 'Four Hour SST', icon: FourHourSSTIcon },
  { id: 'sixDaySst-sst', label: '6-Day SST', icon: SixHourSSTIcon },
  { id: 'argo', label: 'Argo', icon: ArgoIcon },
  { id: 'climatology-sst', label: 'Climatology', icon: SSTIcon },
];

export const regionSelectionButtonElements: RegionSelectionElement[] = [
  { key: RegionScope.Local, label: 'Local Region', icon: localRegionIcon },
  { key: RegionScope.State, label: 'State Region', icon: stateRegionIcon },
  { key: RegionScope.Au, label: 'All Australia', icon: australiaIcon },
];
