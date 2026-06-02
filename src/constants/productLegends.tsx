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
  adcp: {
    icon: 'arrow-up',
    label: 'ADCP velocity',
    shape: (
      <div className="flex h-3 w-3 items-center">
        <div className="bg-imos-dodger-blue relative h-0.5 w-3">
          <div className="border-imos-dodger-blue absolute -top-[3px] right-0 h-2 w-2 rotate-45 border-t-2 border-r-2" />
        </div>
      </div>
    ),
    description:
      'Velocity of the current as measured by moored ADCPs (Acoustic Doppler Current Profilers). The velocity shown is the averaged velocity from the surface to the bottom, and averaged over 25 hours (centred at t0), to remove the effect of tides. Location and velocity are indicated with a blue arrow head.',
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

  // SWOT - description only (popup only, no sidebar shape)
  swotSeaSurfaceHeight: {
    label: 'Sea Surface Height',
    description: 'contours every 5 cm.',
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

// SWOT legend (legacy 97_swot.php getLegend + dr_swot_legend.html legend text).
// Sidebar shows items with a shape; the popup also shows the description-only
// isobaths and Sea Surface Height entries.
const SWOT_LEGENDS: LegendItem[] = [
  COMMON_LEGEND_ITEMS.argo,
  COMMON_LEGEND_ITEMS.glider,
  {
    ...COMMON_LEGEND_ITEMS.radar,
    description:
      'The average velocity using all available hourly radar velocities from the IMOS radar facility within a specified time window around t0. Eg (3-12h avg) indicates a minimum of 3 hourly radar velocity estimates are required within a 12 hour window. Blue (red) vectors are plotted over waters warmer (cooler) than the mean value in the color bar axis.',
  },
  {
    ...COMMON_LEGEND_ITEMS.drifter,
    description:
      '6 hourly Global Drifter Program surface drifter (drogued at 15m on deployment) within a window of -2 to +1 day around t0. Location and velocity are indicated with pink arrow heads.',
  },
  {
    ...COMMON_LEGEND_ITEMS.ship,
    description:
      'Underway water temperature, plotted hourly, from ships with hull-mounted intake. These include the RV Investigator (MNF), RV Solander and RV Cape Ferguson (AIMS), and the Spirit of Tasmania 2, Sea Flyte and Stadacona from (IMOS Ships of Opportunity Facility). Data within t0 +/- 1day is indicated with a small black dot at the ship location and a black circle indicates the measurement occurred within 12 hours of t0.',
  },
  COMMON_LEGEND_ITEMS.adcp,
  COMMON_LEGEND_ITEMS.fishSoop,
  COMMON_LEGEND_ITEMS.eacIsobaths,
  COMMON_LEGEND_ITEMS.swotSeaSurfaceHeight,
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
    id: 'swotGsla',
    items: null,
    childrenLegends: {
      'swotGsla-ssh': [...SWOT_LEGENDS],
      'swotGsla-mdt': [...SWOT_LEGENDS],
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
