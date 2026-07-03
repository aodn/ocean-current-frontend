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
  EACMooringArrayIcon,
  SwotIcon,
  FishSOOPIcon,
} from '@/components/Shared/Icons';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import { SidebarProductID } from '@/configs/products/landing';

export const sidebarProductsNav: DropdownElement<SidebarProductID>[] = [
  {
    id: 'fourHourSst',
    label: 'Four-hour SST',
    Icon: FourHourSSTIcon,
  },
  {
    id: 'sixDaySst',
    label: 'Daily SST (6-day composite)',
    Icon: SixHourSSTIcon,
  },
  {
    id: 'oceanColour',
    label: 'Chlorophyll-a Concentration',
    Icon: OceanColourIcon,
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    label: 'Adjusted Sea Level Anomaly',
    Icon: AdjustedSeaLevelAnomalyIcon,
  },
  {
    id: 'surfaceWaves',
    label: 'Surface Waves',
    Icon: SurfaceWavesIcon,
  },
  {
    id: 'monthlyMeans',
    label: 'Monthly Means',
    Icon: MonthlyMeansIcon,
  },
  {
    id: 'swotGsla',
    label: 'SWOT and GSLA',
    Icon: SwotIcon,
  },
  {
    id: 'argo',
    label: 'Argo',
    Icon: ArgoIcon,
  },
  {
    id: 'tidalCurrents',
    label: 'Tidal Currents',
    Icon: TidalCurrentsIcon,
  },
  {
    id: 'currentMeters',
    label: 'Current Meters',
    Icon: CurrentMetersIcon,
  },
  {
    id: 'sealCtd',
    label: 'SealCTD',
    Icon: SealCTDIcon,
  },

  {
    id: 'EACMooringArray',
    label: 'EAC Mooring Array',
    Icon: EACMooringArrayIcon,
  },
  {
    id: 'fishSOOP',
    label: 'FishSOOP',
    Icon: FishSOOPIcon,
  },
];
