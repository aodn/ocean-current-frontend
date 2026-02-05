import React from 'react';
import { RootProductID } from '@/types/product';
import {
  AltimeterPassLegendIcon,
  BuoyWithNoDataLegendIcon,
  PeakWaveDirBomLegendIcon,
  PeakWaveDirSarLegendIcon,
  WaveFromEastLegendIcon,
  WaveFromEastSarLegendIcon,
  WaveFromNorthLegendIcon,
  WaveFromNorthSarLegendIcon,
  WaveFromSouthLegendIcon,
  WaveFromWestSarLegendIcon,
} from '@/components/Shared/Icons';

export type LegendItem = {
  icon: string;
  label: string;
  shape: React.ReactNode;
  description?: string;
};

export type ProductLegend = {
  id: RootProductID;
  items: LegendItem[] | null;
  childrenLegends?: {
    [childId: string]: LegendItem[] | null;
  };
};

const COMMON_LEGEND_ITEMS = {
  argo: {
    icon: 'circle',
    label: 'Argo',
    shape: <div className="h-3 w-3 rounded-full border-2 border-imos-bright-magenta bg-white" />,
    description:
      'Pink circle at the location of any profile made in the window t0 +/- 12hrs; click on the circle to see the Argo profiles of temperature and salinity.',
  },
  fishSoop: {
    icon: 'square',
    label: 'Fish SOOP',
    shape: <div className="h-3 w-3 border-2 border-imos-bright-magenta bg-white" />,
    description: 'Fishing Vessel as Ships of Opportunity Program (Fish SOOP).',
  },
  mooring: {
    icon: 'circle',
    label: 'Mooring',
    shape: <div className="h-3 w-3 rounded-full bg-black" />,
    description: 'Mooring location with current meter data.',
  },
  ship: {
    icon: 'circle-outline',
    label: 'Ship',
    shape: <div className="h-3 w-3 rounded-full border-2 border-black" />,
    description:
      'Underway water temperature from ships with hull-mounted intake. Small black dot indicates data within t0 +/- 1day, black circle indicates within 12 hours of t0.',
  },
  glider: {
    icon: 'diamond',
    label: 'Glider',
    shape: <div className="h-3 w-3 rotate-45 bg-imos-bright-magenta" />,
    description:
      'Small diamonds indicate 6-hourly glider locations. Pink when the glider is in the 24hr window around t0; click on the diamonds to see the glider profiles.',
  },
  radar: {
    icon: 'arrow-up',
    label: 'Radar',
    shape: (
      <div className="flex flex-col">
        <div className="relative h-0.5 w-3 bg-imos-bright-magenta">
          <div className="absolute -top-1 right-0 h-2 w-2 rotate-45 border-t-2 border-imos-bright-magenta" />
        </div>
        <div className="relative mt-1 h-0.5 w-3 bg-imos-dodger-blue">
          <div className="absolute -top-[2px] right-0 h-2 w-2 rotate-45 border-r-2 border-imos-dodger-blue" />
        </div>
      </div>
    ),
    description:
      'Average velocity using all available hourly radar velocities from the IMOS radar facility within a specified time window around t0.',
  },
  drifter: {
    icon: 'drifter',
    label: 'Drifter',
    shape: (
      <div className="flex h-3 w-3 -scale-x-100 items-center justify-center">
        <div className="h-2.5 w-2.5 rotate-45 -skew-x-12 -skew-y-12 border-r-2 border-t-2 border-imos-bright-magenta" />
      </div>
    ),
    description: 'Drifter buoy locations showing surface current trajectories.',
  },

  // Surface Waves
  altimeterPass: {
    icon: 'altimeter-pass',
    label: 'Altimeter Pass',
    shape: <AltimeterPassLegendIcon />,
  },
  buoyWithNoData: {
    icon: 'buoy-with-no-data',
    label: 'Buoy With No Data',
    shape: <BuoyWithNoDataLegendIcon />,
  },
  peakWaveDirBom: {
    icon: 'peak-wave-dir-bom',
    label: 'Peak wave dir. (BoM)',
    shape: <PeakWaveDirBomLegendIcon />,
  },
  peakWaveDirSar: {
    icon: 'peak-wave-dir-sar',
    label: 'Peak wave dir. (SAR)',
    shape: <PeakWaveDirSarLegendIcon />,
  },
  waveFromEast: {
    icon: 'wave-from-east',
    label: 'Wave from East',
    shape: <WaveFromEastLegendIcon />,
  },
  waveFromEastSar: {
    icon: 'wave-from-east-sar',
    label: 'Wave from East',
    shape: <WaveFromEastSarLegendIcon />,
  },
  waveFromNorth: {
    icon: 'wave-from-north',
    label: 'Wave from North',
    shape: <WaveFromNorthLegendIcon />,
  },
  waveFromNorthSar: {
    icon: 'wave-from-north-sar',
    label: 'Wave from North',
    shape: <WaveFromNorthSarLegendIcon />,
  },
  waveFromSouth: {
    icon: 'wave-from-south',
    label: 'Wave from South',
    shape: <WaveFromSouthLegendIcon />,
  },
  waveFromWestSar: {
    icon: 'wave-from-west-sar',
    label: 'Wave from West',
    shape: <WaveFromWestSarLegendIcon />,
  },

  // Seal CTD
  ctdProfile: {
    icon: 'dive-point',
    label: 'CTD Profile Location',
    shape: <div className="h-2 w-2 rounded-full bg-blue-500" />,
  },
} as const;

const SST_MAP_LEGENDS: LegendItem[] = [
  COMMON_LEGEND_ITEMS.argo,
  COMMON_LEGEND_ITEMS.glider,
  COMMON_LEGEND_ITEMS.radar,
  COMMON_LEGEND_ITEMS.drifter,
  COMMON_LEGEND_ITEMS.ship,
];

export const productLegends: ProductLegend[] = [
  {
    id: 'fourHourSst',
    items: [...SST_MAP_LEGENDS, COMMON_LEGEND_ITEMS.mooring, COMMON_LEGEND_ITEMS.fishSoop],
  },
  {
    id: 'sixDaySst',
    items: [...SST_MAP_LEGENDS, COMMON_LEGEND_ITEMS.mooring, COMMON_LEGEND_ITEMS.fishSoop],
    childrenLegends: {
      'sixDaySst-timeseries': null,
    },
  },
  {
    id: 'oceanColour',
    items: [...SST_MAP_LEGENDS, COMMON_LEGEND_ITEMS.mooring],
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    items: [COMMON_LEGEND_ITEMS.argo, COMMON_LEGEND_ITEMS.mooring, COMMON_LEGEND_ITEMS.ship],
    childrenLegends: {
      'adjustedSeaLevelAnomaly-sst': null,
      'adjustedSeaLevelAnomaly-nonTidalSla': [
        COMMON_LEGEND_ITEMS.argo,
        COMMON_LEGEND_ITEMS.mooring,
        COMMON_LEGEND_ITEMS.ship,
      ],
    },
  },
  {
    id: 'surfaceWaves',
    items: null,
    childrenLegends: {
      'surfaceWaves-wave': [
        COMMON_LEGEND_ITEMS.waveFromEast,
        COMMON_LEGEND_ITEMS.peakWaveDirSar,
        COMMON_LEGEND_ITEMS.waveFromNorth,
        COMMON_LEGEND_ITEMS.waveFromEastSar,
        COMMON_LEGEND_ITEMS.waveFromSouth,
        COMMON_LEGEND_ITEMS.waveFromWestSar,
        COMMON_LEGEND_ITEMS.buoyWithNoData,
        COMMON_LEGEND_ITEMS.waveFromNorthSar,
        COMMON_LEGEND_ITEMS.peakWaveDirBom,
        COMMON_LEGEND_ITEMS.altimeterPass,
      ],
      'surfaceWaves-buoyTimeseries': null,
    },
  },
  {
    id: 'monthlyMeans',
    items: null,
  },
  {
    id: 'climatology',
    items: null,
  },
  {
    id: 'argo',
    items: null,
  },
  {
    id: 'tidalCurrents',
    items: null,
  },
  {
    id: 'currentMeters',
    items: null,
  },
  {
    id: 'sealCtd',
    items: null,
    childrenLegends: {
      'sealCtd-sealTracks': [COMMON_LEGEND_ITEMS.ctdProfile],
    },
  },
  {
    id: 'EACMooringArray',
    items: [COMMON_LEGEND_ITEMS.argo, COMMON_LEGEND_ITEMS.mooring, COMMON_LEGEND_ITEMS.drifter],
  },
];

/**
 * Get legend items for a specific product and optionally a child product
 * @param productKey - The main product key
 * @param childKey - Optional child product key
 * @returns Array of legend items or null if not found
 */
export const getProductLegend = (productKey: RootProductID, childKey?: string): LegendItem[] | null => {
  const productLegend = productLegends.find((legend) => legend.id === productKey);

  if (!productLegend) {
    return null;
  }

  // If child key is provided and has special legend, return that
  if (childKey && productLegend.childrenLegends && childKey in productLegend.childrenLegends) {
    return productLegend.childrenLegends[childKey];
  }

  // Otherwise return parent product's legend items
  return productLegend.items;
};
