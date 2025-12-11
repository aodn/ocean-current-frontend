import OceanColour from '@/assets/icons/products/ocean-colour.svg?react';
import AdjustedSeaLevelAnomaly from '@/assets/icons/products/adjusted-sea-level-anomaly.svg?react';
import MonthlyMeans from '@/assets/icons/products/monthly-means.svg?react';
import SurfaceWaves from '@/assets/icons/products/surface-waves.svg?react';
import FourHourSST from '@/assets/icons/products/4-hour-sst.svg?react';
import SixHourSST from '@/assets/icons/products/6-day-sst.svg?react';
import Argo from '@/assets/icons/products/argo.svg?react';
import TidalCurrents from '@/assets/icons/products/tidal-currents.svg?react';
import CurrentMeters from '@/assets/icons/products/current-meters.svg?react';
import SealCTD from '@/assets/icons/products/seal-ctd.svg?react';
import Climatology from '@/assets/icons/products/climatology.svg?react';
import EACMooringArray from '@/assets/icons/products/eac-mooring-array.svg?react';
import Arrow from '@/assets/icons/arrow.svg?react';
import Gliders from '@/assets/icons/products/gliders.svg?react';
import MyOceanCurrent from '@/assets/icons/products/my-ocean-current.svg?react';
import Swot from '@/assets/icons/products/swot.svg?react';
import InfoSvg from '@/assets/icons/info-icon.svg?react';
import ArrowWithTail from '@/assets/icons/arrow-with-tail.svg?react';
import EmailSvg from '@/assets/icons/email-icon.svg?react';
import burgerMenu from '@/assets/icons/burger-menu-icon.svg?react';
import Cross from '@/assets/icons/cross-icon.svg?react';
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
export const GlidersIcon = withIcon(Gliders);
export const MyOceanCurrentIcon = withIcon(MyOceanCurrent);
export const SwotIcon = withIcon(Swot);
export const ArrowIcon = withIcon(Arrow);
export const InfoIcon = withIcon(InfoSvg);
export const ArrowWithTailIcon = withIcon(ArrowWithTail);
export const EmailIcon = withIcon(EmailSvg);
export const BurgerMenuIcon = withIcon(burgerMenu);
export const CrossIcon = withIcon(Cross);

export * from './withIcon';

/**
 * The PowerShell command to change all svg's fill to 'currentColor'
 * Get-ChildItem -Recurse -Filter *.svg | ForEach-Object {
    (Get-Content $_.FullName) -replace 'fill="[^"]*"', 'fill="currentColor"' | Set-Content $_.FullName
}

Mac/Linux command:
find ./src/assets/icons/products -type f -name "*.svg" -exec sed -i '' 's/fill="[^"]*"/fill="currentColor"/g' {} +
*/
