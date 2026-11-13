import { useState } from 'react';
import Loading from '@/components/Shared/Loading/Loading';
import { apiConfig } from '@/configs/api';
import { useGliderMission } from '@/services/hooks';

const GliderMission = () => {
  const { missionId, validParams, mission, isPending, isError, refetch, window } = useGliderMission();
  const imagePath = mission?.visualisations.latest_images?.[window];

  return (
    <section aria-label="Glider mission image" className="rounded-md bg-white p-4">
      <h1 className="mb-3 text-xl font-semibold break-all">{mission?.mission_name ?? 'Glider mission'}</h1>
      <div aria-live="polite">
        {!validParams ? (
          <p>Select a mission and a valid window from the Gliders map.</p>
        ) : isPending ? (
          <p role="status">Loading mission…</p>
        ) : isError ? (
          <div role="alert">
            <p>Unable to load this Gliders mission.</p>
            <button type="button" className="mt-2 rounded border px-3 py-2" onClick={() => void refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <GliderMissionImage
            key={`${missionId}:${window}:${imagePath}`}
            path={imagePath}
            missionName={mission?.mission_name ?? missionId}
            window={window}
          />
        )}
      </div>
    </section>
  );
};
interface Props {
  path?: string | null;
  missionName: string;
  window: string;
}

const GliderMissionImage = ({ path, missionName, window }: Props) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!path || failed) return <p>Image unavailable</p>;
  return (
    <>
      {!loaded && <Loading className="min-h-20" />}
      <img
        src={`${apiConfig.ec2ProxyURL}${path}`}
        alt={`${missionName} ${window} mission profile`}
        className="mx-auto h-auto max-w-full"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
};

export default GliderMission;
