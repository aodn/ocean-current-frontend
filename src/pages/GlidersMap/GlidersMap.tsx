import { useEffect, useLayoutEffect, useId, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, ToggleButton } from '@/components/Shared';
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
import GliderDataModeSelect from '@/components/GliderDataModeSelect/GliderDataModeSelect';
import GliderTypeSelect from '@/components/GliderTypeSelect/GliderTypeSelect';
import { getGliderMissionDataMode, getGliderMissionFilters } from '@/utils/gliders-map-utils/catalogue';
import { GLIDER_MISSION_WINDOWS, GLIDER_TS_VIEW } from '@/services/hooks/useGliderMission';
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
  const mode = params.get('mode') === 'delayed' ? 'delayed' : 'nrt';
  const selectedYear = Number(params.get('year')) || undefined;
  const selectedPlatform = params.get('platform');
  const platform = selectedPlatform === 'sl' || selectedPlatform === 'sg' ? selectedPlatform : undefined;
  const setSelection = ({ year, platform }: { year: number; platform?: GliderYearmap['platform'] }) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('year', String(year));
        if (platform) next.set('platform', platform);
        return next;
      },
      { replace: true },
    );
  };
  const descriptionId = useId();

  useLayoutEffect(() => {
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
  const availableMaps = useMemo(() => (yearmaps ?? []).filter(({ deployments }) => deployments.length > 0), [yearmaps]);
  const needsCatalogue =
    !isMiniMap &&
    (view === 'table' ||
      (selectedYear !== undefined &&
        !isPending &&
        !(yearmaps ?? []).some(
          (map) => map.year === selectedYear && map.deployments.length > 0 && (!platform || map.platform === platform),
        )));
  const catalogue = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'missions'],
    queryFn: ({ signal }) => fetchGliderMissions(signal),
    enabled: needsCatalogue,
    retry: false,
  });
  const catalogueMissions = useMemo(
    () =>
      (catalogue.data ?? []).map((mission) => ({
        mission,
        ...getGliderMissionFilters(mission, yearmaps ?? []),
        mode: getGliderMissionDataMode(mission, yearmaps ?? []),
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
  const defaultYear = view === 'map' ? (selectGliderYearmap(drawableMaps)?.year ?? years[0]) : years[0];
  const resolvingSelection = needsCatalogue && catalogue.isPending;
  const year =
    selectedYear !== undefined && years.includes(selectedYear)
      ? selectedYear
      : resolvingSelection
        ? undefined
        : defaultYear;
  const platforms = [
    ...new Set(filterOptions.filter((option) => option.year === year).map(({ platform }) => platform)),
  ];
  const activePlatform =
    platform && platforms.includes(platform)
      ? platform
      : (selectGliderYearmap(view === 'map' ? drawableMaps : availableMaps, year)?.platform ??
        selectGliderYearmap(availableMaps, year)?.platform ??
        platforms[0]);
  const missionMaps = useMemo(
    () =>
      drawableMaps.filter(
        (map) =>
          (!window || map.window.replace(/^0+/, '') === window) &&
          map.deployments.some((deployment) => deployment.mission_name === missionName),
      ),
    [drawableMaps, missionName, window],
  );
  const yearmap = useMemo(
    () =>
      selectGliderYearmap(
        isMiniMap
          ? missionMaps.length
            ? missionMaps
            : drawableMaps
          : drawableMaps.filter(({ is_nrt }) => is_nrt === (mode === 'nrt')),
        isMiniMap ? undefined : year,
        isMiniMap ? undefined : activePlatform,
      ),
    [drawableMaps, missionMaps, year, activePlatform, isMiniMap, mode],
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
  useEffect(() => {
    resetMission();
  }, [yearmap?.id, year, activePlatform, mode, view, resetMission]);
  const deployments = useMemo(() => buildGliderDeployments(yearmap?.deployments ?? []), [yearmap]);

  const selectYear = (year: number) => setSelection({ year });
  const yearIndex = years.indexOf(year ?? 0);

  const selectMission = (missionName: string, catalogueMission?: GliderMission, selectedWindow?: string) => {
    const returnParams = new URLSearchParams(params);
    returnParams.set('view', view);
    if (year !== undefined) returnParams.set('year', String(year));
    returnParams.set('mode', mode);
    const preferredWindow = yearmap?.window.replace(/^0+/, '') ?? '4d';
    const availableWindow =
      catalogueMission &&
      [preferredWindow, ...GLIDER_MISSION_WINDOWS].find(
        (key) => catalogueMission.visualisations.latest_images?.[key] || catalogueMission.image_history?.[key]?.length,
      );
    mission.mutate(
      { missionName, window: selectedWindow ?? availableWindow ?? preferredWindow, catalogueMission },
      {
        onSuccess: (data, { window }) => {
          const params = new URLSearchParams(
            window === GLIDER_TS_VIEW ? { missionId: data.id, view: GLIDER_TS_VIEW } : { missionId: data.id, window },
          );
          void navigate(`/product/gliders?${params}`, {
            state: isMiniMap ? location.state : { glidersReturnTo: `/map/gliders?${returnParams}` },
          });
        },
      },
    );
  };
  const tableMissions = catalogueMissions
    .filter(
      (mission) =>
        year !== undefined &&
        mission.years.includes(year) &&
        mission.platform === activePlatform &&
        mission.mode === mode,
    )
    .map(({ mission }) => mission);
  const unclassified = catalogueMissions.some(({ years, platform, mode }) => !years.length || !platform || !mode);

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
          <div
            role="group"
            aria-label="Deployment view"
            className="flex h-11 items-center gap-3 rounded-md bg-white px-3"
          >
            <span className={view === 'map' ? 'text-imos-calypso-blue' : 'text-imos-text-grey'}>Map view</span>
            <ToggleButton
              isOn={view === 'table'}
              disabled={false}
              aria-label="Table view"
              onToggle={(isTable) => {
                setParams(
                  (prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('view', isTable ? 'table' : 'map');
                    if (year !== undefined) next.set('year', String(year));
                    next.set('mode', mode);
                    return next;
                  },
                  { replace: true },
                );
              }}
            />
            <span className={view === 'table' ? 'text-imos-calypso-blue' : 'text-imos-text-grey'}>Table view</span>
          </div>
        </div>
      )}
      {!isMiniMap && platform && activePlatform && platform !== activePlatform && year !== undefined && (
        <p role="status">
          {platform === 'sl' ? 'Slocum' : 'Seaglider'} is unavailable for {year}; showing{' '}
          {activePlatform === 'sl' ? 'Slocum' : 'Seaglider'}.
        </p>
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
              <p role="status">
                Some catalogue missions have no year, glider type or data mode metadata and cannot be filtered.
              </p>
            )}
            <GlidersTable
              missions={tableMissions}
              onSelect={(mission, window) => selectMission(mission.mission_name, mission, window)}
            />
          </>
        )
      ) : isPending ? (
        <Loading className={isMiniMap ? 'h-full' : 'min-h-125'} />
      ) : isError ? (
        <div role="alert">
          <p>Unable to load Gliders deployments.</p>
          <button type="button" className="mt-4 rounded border px-3 py-2" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      ) : resolvingSelection ? (
        <p role="status">Loading missions…</p>
      ) : !yearmap || deployments.features.length === 0 ? (
        <p role="status">No deployment areas are available for this map.</p>
      ) : (
        <>
          <p id={descriptionId} className="sr-only">
            {deployments.features.length} highlighted deployment areas on map {yearmap.id}.
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
