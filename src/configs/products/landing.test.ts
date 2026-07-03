import { describe, it, expect } from 'vitest';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { PRODUCT_LANDING, buildLandingUrl } from './landing';

describe('PRODUCT_LANDING', () => {
  it('has exactly one entry per sidebar-navigable product', () => {
    const sidebarIds = sidebarProductsNav.map((element) => element.id).sort();
    const landingIds = Object.keys(PRODUCT_LANDING).sort();
    expect(landingIds).toEqual(sidebarIds);
  });

  it('every entry has an absolute path', () => {
    Object.entries(PRODUCT_LANDING).forEach(([id, { path }]) => {
      expect(path, `${id} path should start with /`).toMatch(/^\//);
    });
  });
});

describe('buildLandingUrl — products that changed behaviour', () => {
  it('Surface Waves → /product figure view with region=Au and no date (resolved on landing)', () => {
    expect(buildLandingUrl('surfaceWaves')).toBe('/product/surface-waves/wave?region=Au');
    expect(PRODUCT_LANDING.surfaceWaves.resetDate).toBe(true);
  });

  it('SWOT & GSLA → /product figure view with region=Au and hardcoded date', () => {
    expect(buildLandingUrl('swotGsla')).toBe('/product/swot-gsla/ssh?region=Au&date=20260427190801');
  });

  it('Tidal Currents → /product figure view with region=Aust and hardcoded date', () => {
    expect(buildLandingUrl('tidalCurrents')).toBe('/product/tidal-currents/speed?region=Aust&date=20260603');
  });

  it('Current Meters → /product figure view with full default params', () => {
    const url = buildLandingUrl('currentMeters');
    const parsed = new URL(url, 'https://x');
    expect(parsed.pathname).toBe('/product/current-meters/moored-instrument-array');
    expect(parsed.searchParams.get('region')).toBe('01_Aust');
    expect(parsed.searchParams.get('date')).toBe('0000');
    expect(parsed.searchParams.get('depth')).toBe('1');
    expect(parsed.searchParams.get('property')).toBe('vrms');
  });
});

describe('buildLandingUrl — products that should stay unchanged', () => {
  it('4h SST → /map view', () => {
    expect(buildLandingUrl('fourHourSst')).toBe('/map/four-hour-sst/sst');
  });

  it('6d SST → /map view', () => {
    expect(buildLandingUrl('sixDaySst')).toBe('/map/six-day-sst/sst');
  });

  it('Seal CTD → /product with POLAR region and fallback date', () => {
    expect(buildLandingUrl('sealCtd')).toBe('/product/seal-ctd/tracks?region=POLAR&date=20240522');
  });

  it('EAC Mooring Array → /product with Brisbane region', () => {
    expect(buildLandingUrl('EACMooringArray')).toBe('/product/eac-mooring-array?region=Brisbane&date=20220725');
  });
});
