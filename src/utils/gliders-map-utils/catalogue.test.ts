import type { GliderMission, GliderYearmap } from '@/types/gliders';
import fixture from '@/pages/GlidersMap/fixtures/yearmaps.json';
import { getGliderMissionFilters, resolveGliderResourceUrl } from './catalogue';

const mission: GliderMission = { id: 'catalogue-only', mission_name: 'catalogue-only', visualisations: {} };

it('uses the published date range and vehicle prefix, including cross-year missions without yearmaps', () => {
  expect(
    getGliderMissionFilters({ ...mission, start_date: '2010-08-13', end_date: '2011-01-02', glider_id: 'SG519' }, []),
  ).toEqual({ years: [2010, 2011], platform: 'sg' });
  expect(getGliderMissionFilters({ ...mission, start_date: '2026-10-28', glider_id: 'SL210' }, [])).toEqual({
    years: [2026],
    platform: 'sl',
  });
});

it('falls back to published yearmap membership for missing metadata without guessing from mission names', () => {
  expect(
    getGliderMissionFilters({ ...mission, mission_name: 'Bicheno20100813' }, fixture.maps as GliderYearmap[]),
  ).toEqual({ years: [2011], platform: 'sg' });
  expect(getGliderMissionFilters(mission, [])).toEqual({ years: [], platform: undefined });
});

it.each([
  ['https://oceancurrent.aodn.org.au/gliders/test_12d/latest.html', '/resource/gliders/test_12d/latest.html'],
  ['http://oceancurrent.aodn.org.au/gliders/missionTS/sg_test.html', '/resource/gliders/missionTS/sg_test.html'],
  ['/gliders/test_4d/movie.mp4?download=1#video', '/resource/gliders/test_4d/movie.mp4?download=1#video'],
  ['/resource/gliders/test.html', '/resource/gliders/test.html'],
  ['https://thredds.aodn.org.au/catalog/test.html', 'https://thredds.aodn.org.au/catalog/test.html'],
  [null, undefined],
])('resolves the published product destination %s', (url, expected) => {
  expect(resolveGliderResourceUrl(url)).toBe(expected);
});
