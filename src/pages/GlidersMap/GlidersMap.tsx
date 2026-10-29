import { useEffect, useId, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import BasicMap from '@/components/Map/BasicMap';
import GlidersDeploymentLayer from '@/components/Map/layers/GlidersDeploymentLayer';
import Loading from '@/components/Shared/Loading/Loading';
import { GLIDERS_MVP_FILTERS } from '@/configs/products/gliders-map-mvp';
import { resetMapStore } from '@/stores/map-store/mapStore';
import { fetchGliderMissions } from '@/services/gliders';
import { buildMvpDeployments } from '@/utils/gliders-map-utils/mvp-deployments';

const GlidersMap = () => {
  const descriptionId = useId();
  useEffect(() => {
    resetMapStore();
  }, []);
  const {
    data: missions,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['gliders', 'mvp-missions', GLIDERS_MVP_FILTERS.year, GLIDERS_MVP_FILTERS.mode],
    queryFn: ({ signal }) => fetchGliderMissions(GLIDERS_MVP_FILTERS, signal),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const deployments = useMemo(() => buildMvpDeployments(missions ?? []), [missions]);

  if (isPending) return <Loading className="min-h-125" />;
  if (isError)
    return (
      <div role="alert">
        <p>Unable to load Gliders mission positions.</p>
        <button type="button" className="mt-4 rounded border px-3 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    );
  if (deployments.features.length === 0)
    return <p role="status">No mission positions are available for this MVP map.</p>;

  return (
    <section aria-label="Gliders deployment map" className="min-w-0">
      <p id={descriptionId} className="sr-only">
        {deployments.features.length} highlighted deployment areas. MVP: 2026 Slocum near-real-time missions with fixed
        display rectangle sizes.
      </p>
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
    </section>
  );
};
export default GlidersMap;
