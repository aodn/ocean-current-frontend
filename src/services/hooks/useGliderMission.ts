import { useLocation, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { sharedQueryConfig } from '@/configs/query';
import { fetchGliderMissionById } from '@/services/gliders';
import { resolveGliderResourceUrl } from '@/utils/gliders-map-utils/catalogue';

export const GLIDER_MISSION_WINDOWS = ['4d', '12d', '30d'];
export const GLIDER_TS_VIEW = 'ts';
export const TEMPERATURE_SALINITY_TITLE = 'Temperature–salinity diagram';

/**
 * The Gliders mission selected in the URL (`missionId`, `window`, and optional `view=ts` or `view=video`). The sidebar and the
 * mission image share the query key, so they read the same cached mission.
 */
const useGliderMission = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const missionId = params.get('missionId') ?? '';
  const window = params.get('window') ?? '4d';
  const isTemperatureSalinity = params.get('view') === GLIDER_TS_VIEW;
  const isVideo = params.get('view') === 'video';
  const validParams = missionId.length > 0 && (isTemperatureSalinity || GLIDER_MISSION_WINDOWS.includes(window));
  const {
    data: mission,
    isPending,
    isError,
    refetch,
  } = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'missionById', missionId],
    queryFn: ({ signal }) => fetchGliderMissionById(missionId, signal),
    enabled: validParams,
    retry: false,
  });

  return {
    missionId,
    validParams,
    mission,
    isPending,
    isError,
    refetch,
    window,
    isTemperatureSalinity,
    isVideo,
    videoUrl: resolveGliderResourceUrl(
      mission?.visualisations.animations?.find(({ label }) => `${Number(label)}d` === window)?.url,
    ),
    /** Windows with a published GIF for the selected mission. */
    windows: GLIDER_MISSION_WINDOWS.filter((key) => mission?.visualisations.latest_images?.[key]),
    setView: (view: 'profile' | 'video' | typeof GLIDER_TS_VIEW) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (view === 'profile') next.delete('view');
          else next.set('view', view);
          return next;
        },
        { replace: true, state: location.state },
      ),
    // Replace rather than push, so Back still returns to the Gliders map.
    setWindow: (window: string) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('window', window);
          return next;
        },
        { replace: true, state: location.state },
      ),
  };
};

export default useGliderMission;
