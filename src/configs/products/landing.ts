import { RootProductID } from '@/types/product';
import { CurrentMetersRegion, CurrentMetersProperty, CurrentMetersDepth } from '@/constants/currentMeters';

// Products that don't appear in the sidebar nav and have no internal landing page.
// Excluded from PRODUCT_LANDING to keep the config exhaustive for the sidebar products.
type NonSidebarProductID = 'gliders' | 'myOceanCurrent' | 'sealCtdTags';

/** A root product that appears in the sidebar and has an internal landing page. */
export type SidebarProductID = Exclude<RootProductID, NonSidebarProductID>;

export interface ProductLanding {
  /** Absolute path including /map or /product prefix */
  path: string;
  /** Default query params injected on landing. Absent key = carry through from previous URL. */
  query?: Record<string, string>;
  /**
   * When true, don't carry/convert the previous product's date across navigation. Instead,
   * the navigating component resolves this product's own latest date for the `query.region`
   * up front (via useRegionLatestDates) and writes it into the URL directly.
   *
   * We can't just omit `date` and let the destination page resolve it lazily: the date store
   * that drives the rendered image only updates once the resolved date round-trips back into
   * the URL, which races with the (initially stale) store on a client-side navigation and can
   * surface a false "date not available" error (see #522). Use for products whose date
   * range/format has no meaningful correspondence to other products, e.g. Surface Waves.
   */
  resetDate?: boolean;
}

/**
 * Per-product landing destination, consumed differently depending on entry point:
 *
 * - Navbar dropdown (`linksData.ts`, via `buildLandingUrl`): uses `path` as-is (may cross
 *   from /map into /product for products with a dedicated figure landing below) and `query`
 *   for the default params.
 * - LHS product switcher inside a /product page (`ProductDropdown.tsx`): always stays under
 *   /product (computes its own relative path) but still sources `query`/`resetDate` from here
 *   for the default region/date.
 * - LHS map sidebar (`MapSidebar.tsx`): does NOT use this config at all — switching products
 *   there always stays under /map with its own minimal region-only defaults, regardless of
 *   whether a product has a dedicated /product figure landing below (see #522).
 *
 * Rationale for the /product figure landings: take the user directly to figures we already
 * have so they get an immediate dose of ocean-data satisfaction with the least amount of
 * clicking. They can then refine region/options via the mini-map.
 *
 * Products marked "// TODO" are pending content from the OceanCurrent team.
 * https://github.com/aodn/ocean-current-frontend/issues/522
 */
export const PRODUCT_LANDING: Record<SidebarProductID, ProductLanding> = {
  // ── Maps ─────────────────────────────────────────────────────────────────
  fourHourSst: {
    path: '/map/four-hour-sst/sst',
  },
  sixDaySst: {
    path: '/map/six-day-sst/sst',
  },
  oceanColour: {
    path: '/map/ocean-colour/chl-a',
  },
  adjustedSeaLevelAnomaly: {
    path: '/map/adjusted-sea-level-anomaly/sla',
  },
  surfaceWaves: {
    path: '/product/surface-waves/wave',
    query: { region: 'Au' },
    resetDate: true,
  },
  monthlyMeans: {
    // TODO: no figure yet — leaving bathymetry background for now (see #343 for boundaries)
    path: '/map/monthly-means/30-day',
  },
  swotGsla: {
    // TODO: date should be updated to latest available once the API supports it
    path: '/product/swot-gsla/ssh',
    query: { region: 'Au', date: '20260427190801' },
  },

  // ── In-Water ─────────────────────────────────────────────────────────────
  argo: {
    // TODO: OceanCurrent team will provide a figure; bathymetry only for now
    path: '/map/argo',
  },
  tidalCurrents: {
    // TODO: date should be updated to latest available once the API supports it
    path: '/product/tidal-currents/speed',
    query: { region: 'Aust', date: '20260603' },
  },
  currentMeters: {
    // Values mirror currentMetersInitialState in src/stores/current-meters-store/currentMeters.ts
    path: '/product/current-meters/moored-instrument-array',
    query: {
      region: CurrentMetersRegion.Aust,
      date: '0000', // "All time" option
      depth: CurrentMetersDepth.ONE,
      property: CurrentMetersProperty.vrms,
    },
  },
  sealCtd: {
    path: '/product/seal-ctd/tracks',
    query: { region: 'POLAR', date: '20240522' },
  },
  EACMooringArray: {
    path: '/product/eac-mooring-array',
    query: { region: 'Brisbane', date: '20220725' },
  },
  fishSOOP: {
    path: '/map/fish-soop/regional-profiles',
  },
};

/**
 * Serialise a product's landing config into a URL string suitable for use in
 * `<Link to={...}>` or `<a href={...}>`.
 */
export const buildLandingUrl = (id: SidebarProductID): string => {
  const { path, query } = PRODUCT_LANDING[id];
  if (!query) return path;
  return `${path}?${new URLSearchParams(query).toString()}`;
};
