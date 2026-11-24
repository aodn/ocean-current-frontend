import { useState } from 'react';
import { useSearchParams } from 'react-router';
import VideoToggleButton from '@/components/ProductMenuBar/components/VideoToggleButton';
import { useGliderMission } from '@/services/hooks';
import useGliderTs from '@/services/hooks/useGliderTs';
import { GLIDER_PROJECTION_HOURS, TEMPERATURE_SALINITY_TITLE } from '@/services/hooks/useGliderMission';
import Loading from '@/components/Shared/Loading/Loading';
import { apiConfig } from '@/configs/api';
import GliderTsIndex, { GliderTsNavigation } from './GliderTs';
import GliderDatePagination from './GliderDatePagination';

const GliderMission = () => {
  const [params] = useSearchParams();
  return params.get('view') === 'ts-index' ? <GliderTsIndex /> : <GliderMissionViewer />;
};

const GliderMissionViewer = () => {
  const [params] = useSearchParams();
  const selection = useGliderMission();
  const {
    missionId,
    validParams,
    mission,
    window,
    isTemperatureSalinity,
    isVideo,
    isProjectedTracks,
    videoUrl,
    setView,
    selectedFrame,
  } = selection;
  const ts = useGliderTs(isTemperatureSalinity);
  // Historical diagrams have no catalogue mission, so the T-S index is their only source.
  const indexOnly = isTemperatureSalinity && !missionId;
  const { isPending: contentPending, isError, refetch } = indexOnly ? ts : selection;
  const isPending = contentPending || (isTemperatureSalinity && params.has('diagramId') && ts.isPending);
  // A selected diagram stays unavailable when its image is null or its ID is unknown.
  const tsImage =
    ts.diagram || params.has('diagramId') ? ts.diagram?.image_url : mission?.visualisations.temperature_salinity_image;
  const imagePath = isTemperatureSalinity
    ? tsImage
    : (selectedFrame?.url ?? mission?.visualisations.latest_images?.[window]);
  const projectionPath = selectedFrame?.projected_tracks_url;
  const projectionLabel = `${GLIDER_PROJECTION_HOURS[window]}-hour projection`;
  const missionName = mission?.mission_name ?? ts.diagram?.id ?? missionId;

  return (
    <>
      <div
        className="font-open-sans text-imos-dark-grey mb-2 flex flex-wrap items-center gap-2 font-medium"
        role="toolbar"
        aria-label="Mission tools"
      >
        {isTemperatureSalinity && <GliderTsNavigation previous={ts.previous} next={ts.next} />}
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
        <h1 className="mb-3 text-xl font-semibold break-all">{missionName || 'Glider mission'}</h1>
        <div aria-live="polite">
          {isTemperatureSalinity && ts.isError && !indexOnly && (
            <p role="alert">
              Unable to load T-S navigation.{' '}
              <button type="button" onClick={() => void ts.refetch()}>
                Retry navigation
              </button>
            </p>
          )}
          {!validParams && !indexOnly ? (
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
          ) : isProjectedTracks ? (
            projectionPath ? (
              <>
                <h2 className="mb-2 font-semibold">{projectionLabel}</h2>
                <GliderMissionImage
                  key={projectionPath}
                  path={projectionPath}
                  alt={`${missionName} ${projectionLabel}`}
                  unavailableText="Unable to load projected tracks"
                />
              </>
            ) : (
              <p role="status">Projected tracks unavailable for this date and window</p>
            )
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
