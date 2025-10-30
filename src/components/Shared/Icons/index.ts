import OceanColour from '@/assets/icons/products/ocean-colour-icon.svg?react';
import AdjustedSeaLevelAnomaly from '@/assets/icons/products/adjusted-sea-level-anomaly-icon.svg?react';
import MonthlyMeans from '@/assets/icons/products/monthly-means-icon.svg?react';
import SurfaceWaves from '@/assets/icons/products/surface-waves-icon.svg?react';
import FourHourSST from '@/assets/icons/products/4-hour-sst-icon.svg?react';
import SixHourSST from '@/assets/icons/products/6-day-sst-icon.svg?react';
import Argo from '@/assets/icons/products/argo-icon.svg?react';
import TidalCurrents from '@/assets/icons/products/tidal-currents-icon.svg?react';
import CurrentMeters from '@/assets/icons/products/current-meters-icon.svg?react';
import SealCTD from '@/assets/icons/products/seal-ctd-icon.svg?react';
import Climatology from '@/assets/icons/products/climatology-icon.svg?react';
import EACMooringArray from '@/assets/icons/products/eac-mooring-array-icon.svg?react';
import Arrow from '@/assets/icons/arrow.svg?react';
import Glider from '@/assets/icons/products/glider-icon.svg?react';
import SelectedFourHourSST from '@/assets/icons/products/4-hour-sst-icon-selected.svg?react';
import SelectedSixHourSST from '@/assets/icons/products/6-day-sst-icon-selected.svg?react';
import InfoSvg from '@/assets/icons/info-icon.svg?react';
import ArrowWithTail from '@/assets/icons/arrow-with-tail.svg?react';
import EmaiSvg from '@/assets/icons/email-icon.svg?react';
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
export const InfoIcon = withIcon(InfoSvg);
export const ArrowWithTailIcon = withIcon(ArrowWithTail);
export const EmailIcon = withIcon(EmaiSvg);

export * from './withIcon';

/**
 * The PowerShell command to change all svg's fill to 'currentColor'
 * Get-ChildItem -Recurse -Filter *.svg | ForEach-Object {
    (Get-Content $_.FullName) -replace 'fill="[^"]*"', 'fill="currentColor"' | Set-Content $_.FullName
}
 
Mac/Linux command:
find ./src/icons -type f -name "*.svg" -exec sed -i '' 's/fill="[^"]*"/fill="currentColor"/g' {} +
*/
