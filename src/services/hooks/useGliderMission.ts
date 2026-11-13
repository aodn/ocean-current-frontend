import { useLocation, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { sharedQueryConfig } from '@/configs/query';
import { fetchGliderMissionById } from '@/services/gliders';

export const GLIDER_MISSION_WINDOWS = ['4d', '12d', '30d'];

/**
 * The Gliders mission selected in the URL (`missionId`, `window`). The sidebar and the
 * mission image share the query key, so they read the same cached mission.
 */
const useGliderMission = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const missionId = params.get('missionId') ?? '';
  const window = params.get('window') ?? '4d';
  const validParams = missionId.length > 0 && GLIDER_MISSION_WINDOWS.includes(window);
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
    /** Windows with a published GIF for the selected mission. */
    windows: GLIDER_MISSION_WINDOWS.filter((key) => mission?.visualisations.latest_images?.[key]),
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
