import { RootProductID } from '@/types/product';
import { EACMooringArrayAboutData } from './EACMooringArrayAboutData';
import { ArgoAboutData } from './ArgoAboutData';
import { TidalCurrentsAboutData } from './TidalCurrentsAboutData';
import { CurrentMetersAboutData } from './CurrentMetersAboutData';
import { FishSoopAboutData } from './FishSoopAboutData';

export type AboutContent = {
  title: string;
  description: () => JSX.Element;
};

// About-page content keyed by main product id. Owned by the About view — the
// sidebar only needs to know the about button text (see ProductInfo.aboutButtonText).
export const aboutContentByProductId: Partial<Record<RootProductID, AboutContent>> = {
  argo: {
    title: "Argo temperature and salinity down to 2000m - what's shown",
    description: ArgoAboutData,
  },
  tidalCurrents: {
    title: 'Tidal current and sea level predictions',
    description: TidalCurrentsAboutData,
  },
  currentMeters: {
    title: 'Definitions and revisions',
    description: CurrentMetersAboutData,
  },
  EACMooringArray: {
    title: 'EAC Mooring Array (2012-2022)',
    description: EACMooringArrayAboutData,
  },
  fishSOOP: {
    title: 'FishSOOP - Newcomer? Read this first',
    description: FishSoopAboutData,
  },
};
