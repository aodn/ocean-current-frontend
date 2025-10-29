import OceanColour from '@/assets/icons/products/grey-icons/ocean-colour-icon-grey.svg?react';
import AdjustedSeaLevelAnomaly from '@/assets/icons/products/grey-icons/adjusted-sea-level-anomaly-icon-grey.svg?react';
import MonthlyMeans from '@/assets/icons/products/grey-icons/monthly-means-icon-grey.svg?react';
import SurfaceWaves from '@/assets/icons/products/grey-icons/surface-waves-icon-grey.svg?react';
import FourHourSST from '@/assets/icons/products/grey-icons/4-hour-sst-icon-grey.svg?react';
import SixHourSST from '@/assets/icons/products/grey-icons/6-day-sst-icon-grey.svg?react';
import Argo from '@/assets/icons/products/grey-icons/argo-icon-grey.svg?react';
import TidalCurrents from '@/assets/icons/products/grey-icons/tidal-currents-icon-grey.svg?react';
import CurrentMeters from '@/assets/icons/products/grey-icons/current-meters-icon-grey.svg?react';
import SealCTD from '@/assets/icons/products/grey-icons/seal-ctd-icon-grey.svg?react';
import Climatology from '@/assets/icons/products/grey-icons/climatology-icon-grey.svg?react';
import EACMooringArray from '@/assets/icons/products/grey-icons/eac-mooring-array-icon-grey.svg?react';
import Arrow from '@/assets/icons/arrow.svg?react';
import Glider from '@/assets/icons/products/grey-icons/glider-icon-grey.svg?react';
import SelectedFourHourSST from '@/assets/icons/products/white-icons/4-hour-sst-icon-white.svg?react';
import SelectedSixHourSST from '@/assets/icons/products/white-icons/6-day-sst-icon-white.svg?react';
import { withIcon } from './withIcon';

export const OceanColourIcon = withIcon(OceanColour);
export const AdjustedSeaLevelAnomalyIcon = withIcon(AdjustedSeaLevelAnomaly);
export const MonthlyMeansIcon = withIcon(MonthlyMeans);
export const SurfaceWavesIcon = withIcon(SurfaceWaves);
export const FourHourSSTIcon = withIcon(FourHourSST);
export const SixHourSSTIcon = withIcon(SixHourSST);
export const ArgoIcon = withIcon(Argo);
export const TidalCurrentsIcon = withIcon(TidalCurrents);
export const CurrentMetersIcon = withIcon(CurrentMeters);
export const SealCTDIcon = withIcon(SealCTD);
export const ClimatologyIcon = withIcon(Climatology);
export const EACMooringArrayIcon = withIcon(EACMooringArray);
export const GliderIcon = withIcon(Glider);
export const ArrowIcon = withIcon(Arrow);
export const SelectedFourHourSSTIcon = withIcon(SelectedFourHourSST);
export const SelectedSixHourSSTIcon = withIcon(SelectedSixHourSST);

export * from './withIcon';

/**
 * The PowerShell command to change all svg's fill to 'currentColor'
 * Get-ChildItem -Recurse -Filter *.svg | ForEach-Object {
    (Get-Content $_.FullName) -replace 'fill="[^"]*"', 'fill="currentColor"' | Set-Content $_.FullName
}
 
Mac/Linux command:
find ./src/icons -type f -name "*.svg" -exec sed -i '' 's/fill="[^"]*"/fill="currentColor"/g' {} +
*/
