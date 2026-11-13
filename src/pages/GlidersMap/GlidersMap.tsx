import { useLayoutEffect, useId, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import GliderDataModeSelect from '@/components/GliderDataModeSelect/GliderDataModeSelect';
import BasicMap from '@/components/Map/BasicMap';
import GlidersDeploymentLayer from '@/components/Map/layers/GlidersDeploymentLayer';
import Loading from '@/components/Shared/Loading/Loading';
import { sharedQueryConfig } from '@/configs/query';
import { resetMapStore } from '@/stores/map-store/mapStore';
import { fetchGliderYearmaps } from '@/services/gliders';
import { buildGliderDeployments, selectGliderYearmap } from '@/utils/gliders-map-utils/deployments';

const GlidersMap = () => {
  const descriptionId = useId();
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode') === 'delayed' ? 'delayed' : 'nrt';
  useLayoutEffect(() => {
    resetMapStore();
  }, []);
  const {
    data: yearmaps,
    isPending,
    isError,
    refetch,
  } = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'yearmaps'],
    queryFn: ({ signal }) => fetchGliderYearmaps(signal),
    retry: false,
  });
  const yearmap = useMemo(
    () => selectGliderYearmap((yearmaps ?? []).filter(({ is_nrt }) => is_nrt === (mode === 'nrt'))),
    [yearmaps, mode],
  );
  const deployments = useMemo(() => buildGliderDeployments(yearmap?.deployments ?? []), [yearmap]);

  if (isPending) return <Loading className="min-h-125" />;
  if (isError)
    return (
      <div role="alert">
        <p>Unable to load Gliders deployments.</p>
        <button type="button" className="mt-4 rounded border px-3 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    );

  return (
    <section aria-label="Gliders deployment map" className="min-w-0">
      <GliderDataModeSelect
        value={mode}
        onChange={(mode) =>
          setParams(
            (prev) => {
              const next = new URLSearchParams(prev);
              next.set('mode', mode);
              return next;
            },
            { replace: true },
          )
        }
      />
      {deployments.features.length === 0 ? (
        <p role="status">No deployment areas are available for this map.</p>
      ) : (
        <>
          <p id={descriptionId} className="sr-only">
            {deployments.features.length} highlighted deployment areas on map {yearmap?.id}.
          </p>
          <ul className="sr-only" aria-label="Deployment bounds">
            {yearmap?.deployments.map(({ mission_name, bbox }) =>
              bbox ? (
                <li key={mission_name}>
                  {mission_name}: west {bbox[0]}, south {bbox[1]}, east {bbox[2]}, north {bbox[3]} degrees.
                </li>
              ) : null,
            )}
          </ul>
          <div
            className="h-125 w-full overflow-hidden rounded-md md:h-165"
            role="region"
            aria-label="Interactive Australia deployment map"
            aria-describedby={descriptionId}
          >
            <BasicMap showProductLayers={false}>
              <GlidersDeploymentLayer data={deployments} />
            </BasicMap>
          </div>
        </>
      )}
    </section>
  );
};
export default GlidersMap;
