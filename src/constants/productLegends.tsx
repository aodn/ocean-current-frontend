import React from 'react';
import { RootProductID } from '@/types/product';

export type LegendItem = {
  icon?: string;
  label?: string;
  shape?: React.ReactNode;
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
    shape: <div className="border-imos-bright-magenta h-3 w-3 rounded-full border-2 bg-white" />,
    description:
      'pink circle at the location of any profile made in the window t0 +/- 12hrs; click on the circle to see the Argo profiles of temperature and salinity.',
  },
  argoSecondary: {
    icon: 'circle',
    label: 'Argo',
    shape: <div className="h-3 w-3 rounded-full border-2 border-[#04FFEA] bg-white" />,
  },
  fishSoop: {
    icon: 'square',
    label: 'Fish SOOP',
    shape: <div className="border-imos-bright-magenta h-3 w-3 border-2 bg-white" />,
    description: 'Fishing Vessel as Ships of Opportunity Program (Fish SOOP).',
  },
  mooring: {
    icon: 'circle',
    label: 'Mooring',
    shape: <div className="h-3 w-3 rounded-full bg-black" />,
    description:
      'location of moorings included in the EAC array, with larger dots indicating the mid-point and end of the array. The cumulative transport values shown on the map (in Sv) are calculated from the westernmost mooring up to these two points. We show both values to show the cumulative transport associated with the core of the EAC (i.e., often located on the western half of the array).',
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
    shape: <div className="bg-imos-bright-magenta h-3 w-3 rotate-45" />,
    description:
      'Small diamonds indicate 6-hourly glider locations. Pink when the glider is in the 24hr window around t0; click on the diamonds to see the glider profiles.',
  },
  radar: {
    icon: 'arrow-up',
    label: 'Radar',
    shape: (
      <div className="flex flex-col">
        <div className="bg-imos-bright-magenta relative h-0.5 w-3">
          <div className="border-imos-bright-magenta absolute -top-1 right-0 h-2 w-2 rotate-45 border-t-2" />
        </div>
        <div className="bg-imos-dodger-blue relative mt-1 h-0.5 w-3">
          <div className="border-imos-dodger-blue absolute top-[-2px] right-0 h-2 w-2 rotate-45 border-r-2" />
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
      <div className="flex h-3 w-3 items-center justify-center">
        <div className="border-imos-bright-magenta h-2.5 w-2.5 translate-x-[-2px] rotate-45 -skew-x-12 -skew-y-12 border-t-2 border-r-2" />
      </div>
    ),
    description: 'Drifter buoy locations showing surface current trajectories.',
  },

  // EAC Mooring Array
  eacCumulativeTransport: {
    icon: 'bar',
    label: 'EAC cumulative transport',
    shape: <div className="h-2 w-6 bg-black" />,
    description:
      'daily cumulative EAC transport from North Stradbroke to the outer EAC mooring, summed from the sea surface to 1500 m depth.',
  },

  // EAC Mooring Array - description only (popup only, no sidebar shape)
  eacIsobaths: {
    label: 'Selected isobaths',
    description: 'grey and cyan contours, in metres.',
  },
  eacAdjustedSeaLevel: {
    label: 'Adjusted Sea Level (ASL=ASLA plus Mean Dynamic Topography)',
    description: 'white contours every 0.1 m.',
  },
  eacGeostrophicVelocity: {
    label: 'Geostrophic velocity',
    description:
      'black arrows, where length indicates both speed and distance something would travel over a 12hr or 24hr period (as indicated) at this velocity. Derived from ASL.',
  },
  eacAslLatency: {
    description: 'The latest ASL (NRT00) map is usually dated 4 days behind real time, as indicated.',
  },

  // Seal CTD
  ctdProfile: {
    icon: 'dive-point',
    label: 'Seal CTD',
    shape: <div className="border-imos-bright-magenta h-3 w-3 rounded-full border-2 bg-white" />,
  },
} as const;

const SST_MAP_LEGENDS: LegendItem[] = [
  COMMON_LEGEND_ITEMS.argo,
  COMMON_LEGEND_ITEMS.glider,
  COMMON_LEGEND_ITEMS.radar,
  COMMON_LEGEND_ITEMS.drifter,
  COMMON_LEGEND_ITEMS.ship,
  COMMON_LEGEND_ITEMS.fishSoop,
  COMMON_LEGEND_ITEMS.mooring,
];

export const productLegends: ProductLegend[] = [
  {
    id: 'fourHourSst',
    items: [...SST_MAP_LEGENDS],
  },
  {
    id: 'sixDaySst',
    items: [...SST_MAP_LEGENDS],
    childrenLegends: {
      'sixDaySst-timeseries': null,
    },
  },
  {
    id: 'oceanColour',
    items: [...SST_MAP_LEGENDS],
  },
  {
    id: 'adjustedSeaLevelAnomaly',
    items: [...SST_MAP_LEGENDS],
    childrenLegends: {
      'adjustedSeaLevelAnomaly-sst': null,
      'adjustedSeaLevelAnomaly-nonTidalSla': [...SST_MAP_LEGENDS],
    },
  },
  {
    id: 'surfaceWaves',
    items: null,
  },
  {
    id: 'monthlyMeans',
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
      'sealCtd-sealTracks': [COMMON_LEGEND_ITEMS.argoSecondary, COMMON_LEGEND_ITEMS.ctdProfile],
    },
  },
  {
    id: 'EACMooringArray',
    items: [
      COMMON_LEGEND_ITEMS.argo,
      COMMON_LEGEND_ITEMS.glider,
      COMMON_LEGEND_ITEMS.radar,
      COMMON_LEGEND_ITEMS.drifter,
      COMMON_LEGEND_ITEMS.ship,
      COMMON_LEGEND_ITEMS.mooring,
      COMMON_LEGEND_ITEMS.eacCumulativeTransport,
      COMMON_LEGEND_ITEMS.eacIsobaths,
      COMMON_LEGEND_ITEMS.eacAdjustedSeaLevel,
      COMMON_LEGEND_ITEMS.eacGeostrophicVelocity,
      COMMON_LEGEND_ITEMS.eacAslLatency,
    ],
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
