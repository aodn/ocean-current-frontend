import { useEffect, useId, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/Shared';
import type { GliderMission, GliderYearmap } from '@/types/gliders';
import { ArrowIcon, CalendarIcon, ResetIcon } from '@/components/Shared/Icons';
import BasicMap from '@/components/Map/BasicMap';
import GlidersDeploymentLayer from '@/components/Map/layers/GlidersDeploymentLayer';
import Loading from '@/components/Shared/Loading/Loading';
import { sharedQueryConfig } from '@/configs/query';
import { initialMiniMapViewState } from '@/configs/map';
import { resetMapStore, setMapViewState } from '@/stores/map-store/mapStore';
import { fetchGliderMission, fetchGliderMissions, fetchGliderYearmaps } from '@/services/gliders';
import { buildGliderDeployments, selectGliderYearmap } from '@/utils/gliders-map-utils/deployments';
import GliderTypeSelect from '@/components/GliderTypeSelect/GliderTypeSelect';
import { getGliderMissionFilters } from '@/utils/gliders-map-utils/catalogue';
import GlidersTable from './GlidersTable';

interface Props {
  isMiniMap?: boolean;
  missionName?: string;
  window?: string;
}

const GlidersMap = ({ isMiniMap = false, missionName, window }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const view = !isMiniMap && params.get('view') === 'table' ? 'table' : 'map';
  const selectedYear = Number(params.get('year')) || undefined;
  const selectedPlatform = params.get('platform');
  const platform = selectedPlatform === 'sl' || selectedPlatform === 'sg' ? selectedPlatform : undefined;
  const setSelection = ({ year, platform }: { year: number; platform: GliderYearmap['platform'] }) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('year', String(year));
        next.set('platform', platform);
        return next;
      },
      { replace: true },
    );
  };
  const descriptionId = useId();
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
  const catalogue = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'missions'],
    queryFn: ({ signal }) => fetchGliderMissions(signal),
    enabled: !isMiniMap && view === 'table',
    retry: false,
  });
  const catalogueMissions = useMemo(
    () =>
      (catalogue.data ?? []).map((mission) => ({
        mission,
        ...getGliderMissionFilters(mission, yearmaps ?? []),
      })),
    [catalogue.data, yearmaps],
  );
  const filterOptions = [
    ...(yearmaps ?? [])
      .filter(({ deployments }) => deployments.length > 0)
      .map(({ year, platform }) => ({ year, platform })),
    ...catalogueMissions.flatMap(({ years, platform }) => (platform ? years.map((year) => ({ year, platform })) : [])),
  ];
  const years = [...new Set(filterOptions.map(({ year }) => year))].sort((a, b) => b - a);
  const year = selectedYear ?? years[0];
  const platforms = [
    ...new Set(filterOptions.filter((option) => option.year === year).map(({ platform }) => platform)),
  ];
  const activePlatform =
    platform && platforms.includes(platform)
      ? platform
      : (selectGliderYearmap(yearmaps ?? [], year)?.platform ?? platforms[0]);
  const drawableMaps = useMemo(
    () => (yearmaps ?? []).filter((map) => map.deployments.some(({ bbox }) => bbox !== null)),
    [yearmaps],
  );
  const availableMaps = useMemo(() => (yearmaps ?? []).filter(({ deployments }) => deployments.length > 0), [yearmaps]);
  const yearmap = useMemo(
    () =>
      selectGliderYearmap(
        isMiniMap && missionName
          ? drawableMaps.filter(
              (map) =>
                (!window || map.window.replace(/^0+/, '') === window) &&
                map.deployments.some((deployment) => deployment.mission_name === missionName),
            )
          : availableMaps,
        isMiniMap ? undefined : year,
        isMiniMap ? undefined : activePlatform,
      ),
    [drawableMaps, availableMaps, year, activePlatform, isMiniMap, missionName, window],
  );
  const mission = useMutation({
    mutationFn: async ({
      missionName,
      catalogueMission,
    }: {
      missionName: string;
      window: string;
      catalogueMission?: GliderMission;
    }) => catalogueMission ?? fetchGliderMission(missionName),
  });
  const { reset: resetMission } = mission;
  // Ignore a pending selection when the displayed yearmap changes.
  useEffect(() => resetMission(), [yearmap?.id, year, activePlatform, resetMission]);
  const deployments = useMemo(() => buildGliderDeployments(yearmap?.deployments ?? []), [yearmap]);

  const selectYear = (year: number) => {
    const options = filterOptions.filter((option) => option.year === year);
    const nextPlatform = options.some((option) => option.platform === activePlatform)
      ? activePlatform
      : (selectGliderYearmap(availableMaps, year)?.platform ?? options[0]?.platform);
    if (nextPlatform) setSelection({ year, platform: nextPlatform });
  };
  const yearIndex = years.indexOf(year ?? 0);

  const selectMission = (missionName: string, catalogueMission?: GliderMission, selectedWindow?: string) => {
    const returnParams = new URLSearchParams(params);
    returnParams.set('view', view);
    returnParams.set('year', String(year));
    if (activePlatform) returnParams.set('platform', activePlatform);
    mission.mutate(
      { missionName, window: selectedWindow ?? yearmap?.window.replace(/^0+/, '') ?? '4d', catalogueMission },
      {
        onSuccess: (data, { window }) => {
          const params = new URLSearchParams({ missionId: data.id, window });
          void navigate(`/product/gliders?${params}`, {
            state: isMiniMap ? location.state : { glidersReturnTo: `/map/gliders?${returnParams}` },
          });
        },
      },
    );
  };
  const tableMissions = catalogueMissions
    .filter((mission) => mission.years.includes(year) && mission.platform === activePlatform)
    .map(({ mission }) => mission);
  const unclassified = catalogueMissions.some(({ years, platform }) => !years.length || !platform);

  if (isPending) return <Loading className={isMiniMap ? 'h-full' : 'min-h-125'} />;
  if (isError && view !== 'table')
    return (
      <div role="alert">
        <p>Unable to load Gliders deployments.</p>
        <button type="button" className="mt-4 rounded border px-3 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    );

  return (
    <section aria-label="Gliders deployments" className="min-w-0">
      {!isMiniMap && (
        <div className="font-open-sans text-imos-dark-grey mb-2 flex w-full flex-wrap items-center gap-2 font-medium md:gap-3">
          {year !== undefined && activePlatform && (
            <>
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
                    value={year}
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
                key={year}
                platforms={platforms}
                value={activePlatform}
                onChange={(platform) => setSelection({ year, platform })}
              />
            </>
          )}
          <div role="group" aria-label="Deployment view" className="flex h-11 gap-2">
            {(['map', 'table'] as const).map((option) => (
              <Button
                key={option}
                type={view === option ? 'primary' : 'secondary'}
                borderRadius="extraSmall"
                aria-pressed={view === option}
                className="px-3! text-base"
                onClick={() => {
                  setParams(
                    (prev) => {
                      const next = new URLSearchParams(prev);
                      next.set('view', option);
                      if (year !== undefined) next.set('year', String(year));
                      if (activePlatform) next.set('platform', activePlatform);
                      return next;
                    },
                    { replace: true },
                  );
                }}
              >
                {option === 'map' ? 'Map view' : 'Table view'}
              </Button>
            ))}
          </div>
        </div>
      )}
      {view === 'table' ? (
        catalogue.isPending ? (
          <p role="status">Loading missions…</p>
        ) : catalogue.isError ? (
          <div role="alert">
            <p>Unable to load Gliders missions.</p>
            <button type="button" className="mt-2 rounded border px-3 py-2" onClick={() => void catalogue.refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <>
            {unclassified && (
              <p role="status">Some catalogue missions have no year or glider type metadata and cannot be filtered.</p>
            )}
            <GlidersTable
              missions={tableMissions}
              onSelect={(mission, window) => selectMission(mission.mission_name, mission, window)}
            />
          </>
        )
      ) : !yearmap || deployments.features.length === 0 ? (
        <p role="status">No deployment areas are available for this map.</p>
      ) : (
        <>
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
                selectedId={isMiniMap ? missionName : undefined}
                onSelect={selectMission}
              />
            </BasicMap>
          </div>
        </>
      )}
      {mission.isPending && <p role="status">Loading mission…</p>}
      {mission.isError && <p role="alert">Unable to open this mission. Please select a deployment to try again.</p>}
    </section>
  );
};
export default GlidersMap;
