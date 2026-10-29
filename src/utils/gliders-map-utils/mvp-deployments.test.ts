import missionFixture from '@/pages/GlidersMap/fixtures/missions-2026-nrt.json';
import { buildMvpDeployments } from './mvp-deployments';

const mission = missionFixture.missions.find(({ mission_name }) => mission_name === 'TwoRocks20261028_nrt')!;

it('builds closed geographic rectangles for the known MVP missions', () => {
  const result = buildMvpDeployments(missionFixture.missions);
  expect(result.type).toBe('FeatureCollection');
  expect(result.features).toHaveLength(12);
  const feature = result.features.find(({ id }) => id === mission.mission_name)!;
  const ring = feature.geometry.coordinates[0];
  expect(feature.properties.label).toBe(mission.mission_name);
  expect(ring).toHaveLength(5);
  expect(ring[0]).toEqual(ring[4]);
  const west = Math.min(...ring.map(([longitude]) => longitude));
  const east = Math.max(...ring.map(([longitude]) => longitude));
  const south = Math.min(...ring.map(([, latitude]) => latitude));
  const north = Math.max(...ring.map(([, latitude]) => latitude));
  expect((west + east) / 2).toBeCloseTo(mission.longitude, 8);
  expect((south + north) / 2).toBeCloseTo(mission.latitude, 8);
  expect(east - west).toBeCloseTo(1.00387503, 8);
  expect(north - south).toBeCloseTo(1.13455552, 8);
});

it('moves rectangle centres with API coordinates while preserving fixed dimensions', () => {
  const before = buildMvpDeployments([mission]).features[0].geometry.coordinates[0];
  const after = buildMvpDeployments([{ ...mission, longitude: mission.longitude + 2, latitude: mission.latitude + 3 }])
    .features[0].geometry.coordinates[0];
  for (let index = 0; index < before.length; index++) {
    expect(after[index][0] - before[index][0]).toBeCloseTo(2, 8);
    expect(after[index][1] - before[index][1]).toBeCloseTo(3, 8);
  }
});

it.each([
  { latitude: null },
  { longitude: null },
  { latitude: NaN },
  { longitude: Infinity },
  { latitude: -91 },
  { longitude: 181 },
])('omits invalid mission coordinates: %o', (coordinates) => {
  expect(buildMvpDeployments([{ ...mission, ...coordinates }]).features).toEqual([]);
});

it('does not invent dimensions for missions outside the fixed MVP selection', () => {
  expect(buildMvpDeployments([{ ...mission, mission_name: 'Unconfigured20261101_nrt' }]).features).toEqual([]);
  expect(buildMvpDeployments([]).features).toEqual([]);
});
