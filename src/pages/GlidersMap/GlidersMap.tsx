import { useEffect, useId, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/Shared';
import type { GliderYearmap } from '@/types/gliders';
import { ArrowIcon, CalendarIcon, ResetIcon } from '@/components/Shared/Icons';
import BasicMap from '@/components/Map/BasicMap';
import GlidersDeploymentLayer from '@/components/Map/layers/GlidersDeploymentLayer';
import Loading from '@/components/Shared/Loading/Loading';
import { sharedQueryConfig } from '@/configs/query';
import { initialMiniMapViewState } from '@/configs/map';
import { resetMapStore, setMapViewState } from '@/stores/map-store/mapStore';
import { fetchGliderMission, fetchGliderYearmaps } from '@/services/gliders';
import { buildGliderDeployments, selectGliderYearmap } from '@/utils/gliders-map-utils/deployments';
import GliderTypeSelect from '@/components/GliderTypeSelect/GliderTypeSelect';

interface Props {
  isMiniMap?: boolean;
  missionName?: string;
  window?: string;
}

const GlidersMap = ({ isMiniMap = false, missionName, window }: Props) => {
  const navigate = useNavigate();
  const descriptionId = useId();
  const [selection, setSelection] = useState<{ year: number; platform: GliderYearmap['platform'] }>();
  useEffect(() => {
    if (isMiniMap) setMapViewState(initialMiniMapViewState.mapViewState);
    else resetMapStore();
  }, [isMiniMap]);
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
  const drawableMaps = useMemo(
    () => (yearmaps ?? []).filter((map) => map.deployments.some(({ bbox }) => bbox !== null)),
    [yearmaps],
  );
  const years = [...new Set(drawableMaps.map(({ year }) => year))].sort((a, b) => b - a);
  const yearmap = useMemo(
    () =>
      selectGliderYearmap(
        isMiniMap && missionName
          ? drawableMaps.filter(
              (map) =>
                (!window || map.window.replace(/^0+/, '') === window) &&
                map.deployments.some((deployment) => deployment.mission_name === missionName),
            )
          : drawableMaps,
        selection?.year,
        selection?.platform,
      ),
    [drawableMaps, selection, isMiniMap, missionName, window],
  );
  const mission = useMutation({
    mutationFn: ({ missionName }: { missionName: string; window: string }) => fetchGliderMission(missionName),
  });
  const { reset: resetMission } = mission;
  // Ignore a pending selection when the displayed yearmap changes.
  useEffect(() => resetMission(), [yearmap?.id, resetMission]);
  const platforms = [
    ...new Set(drawableMaps.filter(({ year }) => year === yearmap?.year).map(({ platform }) => platform)),
  ];
  const deployments = useMemo(() => buildGliderDeployments(yearmap?.deployments ?? []), [yearmap]);

  const selectYear = (year: number) => {
    const next = selectGliderYearmap(drawableMaps, year, yearmap?.platform) ?? selectGliderYearmap(drawableMaps, year);
    if (next) setSelection({ year, platform: next.platform });
  };
  const yearIndex = years.indexOf(yearmap?.year ?? 0);

  if (isPending) return <Loading className={isMiniMap ? 'h-full' : 'min-h-125'} />;
  if (isError)
    return (
      <div role="alert">
        <p>Unable to load Gliders deployments.</p>
        <button type="button" className="mt-4 rounded border px-3 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    );
  if (!yearmap || deployments.features.length === 0)
    return <p role="status">No deployment areas are available for this map.</p>;

  return (
    <section aria-label="Gliders deployment map" className="min-w-0">
      {!isMiniMap && (
        <div className="font-open-sans text-imos-dark-grey mb-2 flex w-full flex-wrap items-center gap-2 font-medium md:gap-3">
          <div className="border-imos-calypso-blue/50 flex h-11 min-w-0 grow basis-[calc(100%-4rem)] items-center rounded-md border bg-white md:grow-0 md:basis-80 md:border-none">
            <button
              type="button"
              aria-label="Previous year"
              disabled={yearIndex >= years.length - 1}
              onClick={() => selectYear(years[yearIndex + 1])}
              className="border-imos-calypso-blue/20 flex h-full w-11 shrink-0 cursor-pointer items-center justify-center border-r disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon size="sm" color="imos-deep-blue" className="rotate-90" aria-hidden="true" />
            </button>
            <label className="focus-within:ring-imos-calypso-blue/50 flex h-full min-w-0 flex-1 items-center justify-center gap-3 px-3 focus-within:ring-2 focus-within:ring-inset">
              <span className="sr-only">Year</span>
              <CalendarIcon
                size="lg"
                color="imos-deep-blue"
                aria-hidden="true"
                className="pointer-events-none shrink-0"
              />
              <select
                className="h-full w-16 cursor-pointer appearance-none bg-transparent text-center text-base outline-none"
                value={yearmap.year}
                onChange={(event) => selectYear(Number(event.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              aria-label="Next year"
              disabled={yearIndex <= 0}
              onClick={() => selectYear(years[yearIndex - 1])}
              className="border-imos-calypso-blue/20 flex h-full w-11 shrink-0 cursor-pointer items-center justify-center border-l disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon size="sm" color="imos-deep-blue" className="-rotate-90" aria-hidden="true" />
            </button>
          </div>
          <Button
            onClick={() => selectYear(years.includes(dayjs().year()) ? dayjs().year() : years[0])}
            className="flex-center border-imos-calypso-blue/50 h-11 w-12 shrink-0 rounded-md bg-white p-3! md:border-none md:p-4!"
            aria-label="Reset to current year"
            borderRadius="extraSmall"
          >
            <ResetIcon color="imos-deep-blue" size="lg" aria-hidden="true" />
          </Button>
          <GliderTypeSelect
            key={yearmap.year}
            platforms={platforms}
            value={yearmap.platform}
            onChange={(platform) => setSelection({ year: yearmap.year, platform })}
          />
        </div>
      )}
      <p id={descriptionId} className="sr-only">
        {deployments.features.length} highlighted deployment areas on map {yearmap.id}.
      </p>
      <div
        className={
          isMiniMap ? 'h-60 w-full overflow-hidden rounded-md' : 'h-125 w-full overflow-hidden rounded-md md:h-165'
        }
        role="region"
        aria-label="Interactive Australia deployment map"
        aria-describedby={descriptionId}
      >
        <BasicMap
          showProductLayers={false}
          isMiniMap={isMiniMap}
          navigationControl={!isMiniMap}
          showCursorLocationPanel={!isMiniMap}
        >
          <GlidersDeploymentLayer
            data={deployments}
            onSelect={(missionName) =>
              mission.mutate(
                { missionName, window: yearmap.window.replace(/^0+/, '') },
                {
                  onSuccess: (data, { window }) => {
                    const params = new URLSearchParams({ missionId: data.id, window });
                    void navigate(`/product/gliders?${params}`);
                  },
                },
              )
            }
          />
        </BasicMap>
      </div>
      {mission.isPending && <p role="status">Loading mission…</p>}
      {mission.isError && <p role="alert">Unable to open this mission. Please select a deployment to try again.</p>}
    </section>
  );
};
export default GlidersMap;
