import fixture from '@/pages/GlidersMap/fixtures/yearmaps.json';
import type { GliderYearmap } from '@/types/gliders';
import { buildGliderDeployments, selectGliderYearmap } from './deployments';

const maps = fixture.maps as GliderYearmap[];
const byId = (id: string) => maps.find((map) => map.id === id)!;

describe('selectGliderYearmap', () => {
  it('defaults to the latest NRT map with the default variable and window', () => {
    expect(selectGliderYearmap(maps)?.id).toBe('2026_sl_temp_04d_nrt');
  });

  it('falls back to delayed-mode maps and ignores maps without bounds', () => {
    const delayedOnly = maps.filter(({ is_nrt }) => !is_nrt);
    expect(selectGliderYearmap(delayedOnly)?.id).toBe('2026_sl_temp_04d');
    const unverified2030 = { ...byId('2026_sl_temp_04d_nrt'), id: '2030_sl_temp_04d_nrt', year: 2030 };
    unverified2030.deployments = unverified2030.deployments.map((deployment) => ({ ...deployment, bbox: null }));
    expect(selectGliderYearmap([...maps, unverified2030])?.id).toBe('2026_sl_temp_04d_nrt');
  });

  it('returns undefined when no yearmap has bounds', () => {
    expect(selectGliderYearmap([])).toBeUndefined();
  });
});

describe('buildGliderDeployments', () => {
  it('builds each polygon from the published [west, south, east, north] bbox', () => {
    const [deployment] = byId('2008_sl_temp_04d').deployments;
    const [feature] = buildGliderDeployments([deployment]).features;
    expect(deployment.bbox).toEqual([150.781043, -36.431024, 154.333437, -32.20677]);
    expect(feature.geometry.coordinates).toEqual([
      [
        [150.781043, -32.20677],
        [154.333437, -32.20677],
        [154.333437, -36.431024],
        [150.781043, -36.431024],
        [150.781043, -32.20677],
      ],
    ]);
    expect(feature.properties).toEqual({
      id: 'PortStephens20081125',
      label: 'PortStephens20081125',
    });
  });

  it('skips deployments with null bounds', () => {
    const { deployments } = byId('2011_sg_temp_04d');
    expect(deployments.map(({ bbox }) => bbox === null)).toEqual([false, true]);
    expect(buildGliderDeployments(deployments).features.map(({ id }) => id)).toEqual(['Bicheno20100813']);
  });
});
