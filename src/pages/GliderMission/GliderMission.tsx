import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import Loading from '@/components/Shared/Loading/Loading';
import VideoToggleButton from '@/components/ProductMenuBar/components/VideoToggleButton';
import { apiConfig } from '@/configs/api';
import { useGliderMission } from '@/services/hooks';
import { TEMPERATURE_SALINITY_TITLE } from '@/services/hooks/useGliderMission';
import GliderDatePagination from './GliderDatePagination';

/** Only same-app Gliders map URLs written by the deployments view are followed. */
const getReturnTo = (state: unknown) => {
  const returnTo = (state as { glidersReturnTo?: unknown } | null)?.glidersReturnTo;
  return typeof returnTo === 'string' && returnTo.startsWith('/map/gliders?') ? returnTo : undefined;
};

const GliderMission = () => {
  const {
    missionId,
    validParams,
    mission,
    isPending,
    isError,
    refetch,
    window,
    isTemperatureSalinity,
    isVideo,
    videoUrl,
    setView,
    selectedFrame,
  } = useGliderMission();
  const returnTo = getReturnTo(useLocation().state);
  const imagePath = isTemperatureSalinity
    ? mission?.visualisations.temperature_salinity_image
    : (selectedFrame?.url ?? mission?.visualisations.latest_images?.[window]);
  const missionName = mission?.mission_name ?? missionId;

  return (
    <>
      <div
        className="font-open-sans text-imos-dark-grey mb-2 flex flex-wrap items-center gap-2 font-medium"
        role="toolbar"
        aria-label="Mission tools"
      >
        <GliderDatePagination />
        <div className="h-11 grow md:grow-0">
          <VideoToggleButton
            active={isVideo}
            disabled={!isVideo && (!validParams || isTemperatureSalinity || !videoUrl)}
            onClick={() => setView(isVideo ? 'profile' : 'video')}
          />
        </div>
      </div>
      <section aria-label="Glider mission image" className="rounded-md bg-white p-4">
        {returnTo && (
          <Link
            to={returnTo}
            className="text-imos-calypso-blue! hover:text-imos-deeper-blue! mb-3 inline-block underline underline-offset-2"
          >
            Back to deployments
          </Link>
        )}
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
          ) : isVideo ? (
            <GliderMissionVideo
              key={`${missionId}:${window}:${videoUrl}`}
              url={videoUrl}
              name={`${missionName} ${window} mission video`}
            />
          ) : (
            <GliderMissionImage
              key={`${missionId}:${isTemperatureSalinity ? 'ts' : window}:${imagePath}`}
              path={imagePath}
              alt={
                isTemperatureSalinity
                  ? `${missionName} ${TEMPERATURE_SALINITY_TITLE.toLowerCase()}`
                  : `${missionName} ${window} mission profile`
              }
              unavailableText={
                isTemperatureSalinity ? `${TEMPERATURE_SALINITY_TITLE} unavailable` : 'Image unavailable'
              }
            />
          )}
        </div>
      </section>
    </>
  );
};

const GliderMissionVideo = ({ url, name }: { url?: string; name: string }) => {
  const [failed, setFailed] = useState(false);
  if (!url || failed) return <p role="status">Video unavailable</p>;
  return (
    <video
      aria-label={name}
      className="max-h-[80vh] w-full object-contain select-none"
      controls
      playsInline
      preload="auto"
      onError={() => setFailed(true)}
    >
      <source src={url} type="video/mp4" onError={() => setFailed(true)} />
      <track default kind="captions" srcLang="en" />
      Your browser does not support the video tag.
    </video>
  );
};
interface Props {
  path?: string | null;
  alt: string;
  unavailableText: string;
}

const GliderMissionImage = ({ path, alt, unavailableText }: Props) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!path || failed) return <p role="status">{unavailableText}</p>;
  return (
    <>
      {!loaded && <Loading className="min-h-20" />}
      <img
        src={`${apiConfig.ec2ProxyURL}${path}`}
        alt={alt}
        className="mx-auto h-auto max-w-full"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
};

export default GliderMission;
