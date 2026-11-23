import { useEffect, useLayoutEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/Shared';
import type { GliderMission, GliderYearmap } from '@/types/gliders';
import { ArrowIcon, CalendarIcon, InfoIcon, ResetIcon } from '@/components/Shared/Icons';
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
import GlidersAnnualPlot from './GlidersAnnualPlot';

const views = [
  ['map', 'Map'],
  ['table', 'Table'],
  ['annual', 'Annual plots'],
] as const;

interface Props {
  isMiniMap?: boolean;
  missionName?: string;
  window?: string;
}

const GlidersMap = ({ isMiniMap = false, missionName, window }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const requestedView = params.get('view');
  const view = !isMiniMap && (requestedView === 'table' || requestedView === 'annual') ? requestedView : 'map';
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
  const areaTitleId = useId();
  const areaDialog = useRef<HTMLDialogElement>(null);
  const [areaMissions, setAreaMissions] = useState<string[]>([]);
  const [focusedDeployment, setFocusedDeployment] = useState<string>();

  useLayoutEffect(() => {
    if (areaMissions.length) areaDialog.current?.showModal();
  }, [areaMissions]);

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
    view !== 'annual' &&
    (view === 'table' ||
      (selectedYear !== undefined &&
        !isPending &&
        !(yearmaps ?? []).some(
          (map) => map.year === selectedYear && map.deployments.length > 0 && (!platform || map.platform === platform),
        )));
  const catalogue = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'missions', 'distance_alongshore_to_darwin'],
    queryFn: ({ signal }) => fetchGliderMissions(signal),
    enabled: needsCatalogue,
    retry: false,
  });
  const eventView = !isMiniMap && view === 'table' && params.get('sort') === 'event-based-sampling';
  const events = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'missions', 'event_based_sampling'],
    queryFn: ({ signal }) => fetchGliderMissions(signal, 'event_based_sampling'),
    enabled: eventView,
    retry: false,
  });
  const activeCatalogue = eventView ? events : catalogue;
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
      .filter(({ deployments }) => deployments.length > 0 || view === 'annual')
      .map(({ year, platform }) => ({ year, platform })),
    ...catalogueMissions.flatMap(({ years, platform }) => (platform ? years.map((year) => ({ year, platform })) : [])),
  ];
  const years = [...new Set(filterOptions.map(({ year }) => year))];
  if (
    view === 'annual' &&
    selectedYear !== undefined &&
    /^\d{4}$/.test(String(selectedYear)) &&
    !years.includes(selectedYear)
  ) {
    years.push(selectedYear);
  }
  years.sort((a, b) => b - a);
  const defaultYear = view === 'map' ? (selectGliderYearmap(drawableMaps)?.year ?? years[0]) : years[0];
  const resolvingSelection = needsCatalogue && catalogue.isPending;
  const year =
    selectedYear !== undefined && years.includes(selectedYear)
      ? selectedYear
      : resolvingSelection
        ? undefined
        : defaultYear;
  const availablePlatforms = [
    ...new Set(filterOptions.filter((option) => option.year === year).map(({ platform }) => platform)),
  ];
  const platforms: GliderYearmap['platform'][] = view === 'annual' ? ['sl', 'sg'] : availablePlatforms;
  const activePlatform =
    platform && platforms.includes(platform)
      ? platform
      : (selectGliderYearmap(view === 'map' ? drawableMaps : availableMaps, year)?.platform ??
        selectGliderYearmap(availableMaps, year)?.platform ??
        availablePlatforms[0] ??
        platforms[0]);
  const missionMaps = useMemo(() => {
    if (!isMiniMap || !missionName) return [];
    const maps = drawableMaps.filter(({ deployments }) =>
      deployments.some(({ mission_name, bbox }) => mission_name === missionName && bbox !== null),
    );
    const windowMaps = maps.filter((map) => map.window.replace(/^0+/, '') === window);
    return windowMaps.length ? windowMaps : maps;
  }, [drawableMaps, isMiniMap, missionName, window]);
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
  const annualMaps =
    view === 'annual'
      ? (yearmaps ?? []).filter((map) => map.year === year && map.platform === activePlatform && map.image_url)
      : [];
  const showAnnualMode = annualMaps.some(({ is_nrt }) => is_nrt) && annualMaps.some(({ is_nrt }) => !is_nrt);
  const annualMap = selectGliderYearmap(
    showAnnualMode ? annualMaps.filter(({ is_nrt }) => is_nrt === (mode === 'nrt')) : annualMaps,
  );
  const displayedYearmap = view === 'annual' ? annualMap : yearmap;
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
    if (areaDialog.current?.open) areaDialog.current.close();
  }, [displayedYearmap?.id, year, activePlatform, mode, view, resetMission]);
  const deployments = useMemo(() => buildGliderDeployments(yearmap?.deployments ?? []), [yearmap]);
  const selectedDeployment = isMiniMap
    ? yearmap?.deployments.find(({ mission_name, bbox }) => mission_name === missionName && bbox !== null)
    : undefined;

  const selectYear = (year: number) => setSelection({ year });
  const yearIndex = years.indexOf(year ?? 0);

  const returnParams = new URLSearchParams(params);
  returnParams.set('view', view);
  if (year !== undefined) returnParams.set('year', String(year));
  returnParams.set('mode', mode);
  const glidersReturnTo = `/map/gliders?${returnParams}`;

  const selectMission = (missionName: string, catalogueMission?: GliderMission, selectedWindow?: string) => {
    const preferredWindow = displayedYearmap?.window.replace(/^0+/, '') ?? '4d';
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
            state: isMiniMap ? location.state : { glidersReturnTo },
          });
        },
      },
    );
  };
  const selectAreas = (names: string[]) => {
    const selected = [...new Set(names)];
    if (selected.length === 1) selectMission(selected[0]);
    if (selected.length > 1) setAreaMissions(selected);
  };
  const tableMissions = (
    eventView
      ? (events.data ?? []).map((mission) => ({
          mission,
          ...getGliderMissionFilters(mission, yearmaps ?? []),
          mode: getGliderMissionDataMode(mission, yearmaps ?? []),
        }))
      : catalogueMissions
  )
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
        <div className="mb-2 flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-2">
          <div
            role="group"
            aria-label="Gliders controls"
            className="font-open-sans text-imos-dark-grey flex w-full min-w-0 items-center gap-2 overflow-x-auto p-1 text-sm font-medium whitespace-nowrap [&>*]:shrink-0"
          >
            {year !== undefined && activePlatform && (
              <>
                <div className="border-imos-calypso-blue/50 flex h-11 items-center rounded-md border bg-white md:border-none">
                  <button
                    type="button"
                    aria-label="Previous year"
                    disabled={yearIndex >= years.length - 1}
                    onClick={() => selectYear(years[yearIndex + 1])}
                    className="border-imos-calypso-blue/20 flex h-full w-9 shrink-0 cursor-pointer items-center justify-center border-r disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowIcon size="sm" color="imos-deep-blue" className="rotate-90" aria-hidden="true" />
                  </button>
                  <label className="focus-within:ring-imos-calypso-blue/50 flex h-full flex-1 items-center justify-center gap-2 px-2 focus-within:ring-2 focus-within:ring-inset">
                    <span className="sr-only">Year</span>
                    <CalendarIcon
                      size="lg"
                      color="imos-deep-blue"
                      aria-hidden="true"
                      className="pointer-events-none hidden shrink-0 md:block"
                    />
                    <select
                      className="h-full w-30 cursor-pointer appearance-none bg-transparent text-center text-xl font-semibold outline-none"
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
                    className="border-imos-calypso-blue/20 flex h-full w-9 shrink-0 cursor-pointer items-center justify-center border-l disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowIcon size="sm" color="imos-deep-blue" className="-rotate-90" aria-hidden="true" />
                  </button>
                </div>
                <Button
                  onClick={() => selectYear(years.includes(dayjs().year()) ? dayjs().year() : years[0])}
                  className="flex-center border-imos-calypso-blue/50 h-11 w-10 shrink-0 rounded-md bg-white p-3! md:border-none md:p-4!"
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
            {(view !== 'annual' || showAnnualMode) && (
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
            )}
            <Link
              className="border-imos-calypso-blue/50 text-imos-deep-blue hover:bg-imos-cloud-tint focus-visible:ring-imos-calypso-blue/50 ml-auto flex h-11 items-center gap-1.5 rounded-md border bg-white px-2 focus-visible:ring-2 focus-visible:outline-none"
              to="/about/gliders"
              state={{ glidersReturnTo }}
            >
              <InfoIcon size="sm" color="imos-deep-blue" aria-hidden="true" />
              Notes &amp; resources
            </Link>
          </div>
          <div
            role="group"
            aria-label="Deployment view"
            className="border-imos-calypso-blue/50 divide-imos-calypso-blue/30 flex h-11 w-fit shrink-0 items-stretch divide-x rounded-md border bg-white text-sm"
          >
            {views.map(([option, label]) => (
              <button
                key={option}
                type="button"
                aria-pressed={view === option}
                className="text-imos-deep-blue hover:bg-imos-cloud-tint focus-visible:outline-imos-deep-blue aria-pressed:bg-imos-deep-blue cursor-pointer px-2 first:rounded-l-md last:rounded-r-md focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 aria-pressed:text-white"
                onClick={() => {
                  if (view === option) return;
                  setParams(
                    (prev) => {
                      const next = new URLSearchParams(prev);
                      next.set('view', option);
                      if (year !== undefined) next.set('year', String(year));
                      next.set('mode', mode);
                      return next;
                    },
                    { replace: true },
                  );
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      {!isMiniMap && platform && activePlatform && platform !== activePlatform && year !== undefined && (
        <div
          role="status"
          className="bg-imos-cloud-tint text-imos-deep-blue mb-2 flex items-start gap-2 rounded-md px-3 py-2 text-sm"
        >
          <InfoIcon size="sm" color="imos-deep-blue" aria-hidden="true" className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">
              Showing {activePlatform === 'sl' ? 'Slocum' : 'Seaglider'} for {year}
            </p>
            <p>{platform === 'sl' ? 'Slocum' : 'Seaglider'} isn’t available for this year.</p>
          </div>
        </div>
      )}
      {view === 'table' ? (
        <>
          {unclassified && (
            <p role="status">
              Some catalogue missions have no year, glider type or data mode metadata and cannot be filtered.
            </p>
          )}
          <GlidersTable
            missions={tableMissions}
            status={
              catalogue.isError || activeCatalogue.isError ? (
                <div role="alert" className="p-4">
                  <p>Unable to load Gliders missions.</p>
                  <button
                    type="button"
                    className="mt-2 rounded border px-3 py-2"
                    onClick={() => void (catalogue.isError ? catalogue : activeCatalogue).refetch()}
                  >
                    Try again
                  </button>
                </div>
              ) : catalogue.isPending || activeCatalogue.isPending ? (
                <p role="status" className="p-4">
                  Loading missions…
                </p>
              ) : undefined
            }
            onSelect={(mission, window) => selectMission(mission.mission_name, mission, window)}
          />
        </>
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
      ) : view === 'annual' ? (
        <GlidersAnnualPlot
          key={`${annualMap?.id}:${annualMap?.image_url}`}
          yearmap={annualMap}
          title={year === undefined ? 'Annual plots' : `${activePlatform === 'sg' ? 'Seaglider' : 'Slocum'} · ${year}`}
          onSelect={selectAreas}
        />
      ) : !yearmap || deployments.features.length === 0 ? (
        <p role="status">No deployment areas are available for this map.</p>
      ) : (
        <>
          <p id={descriptionId} className="sr-only">
            {deployments.features.length} highlighted deployment areas on map {yearmap.id}.
            {selectedDeployment && ` Selected deployment: ${selectedDeployment.mission_name}.`}
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
                selectedId={focusedDeployment ?? selectedDeployment?.mission_name}
                selectedBounds={focusedDeployment ? undefined : selectedDeployment?.bbox}
                onSelect={selectAreas}
              />
            </BasicMap>
          </div>
          <details key={yearmap.id} className="text-imos-deep-blue mt-2 text-sm">
            <summary className="w-fit cursor-pointer py-1">Deployment areas</summary>
            <ul className="flex flex-wrap gap-x-4" aria-label="Deployment bounds">
              {yearmap.deployments.map(({ mission_name, bbox }) =>
                bbox ? (
                  <li key={mission_name}>
                    <button
                      type="button"
                      className="cursor-pointer py-1 underline"
                      onFocus={() => setFocusedDeployment(mission_name)}
                      onBlur={() => setFocusedDeployment(undefined)}
                      onClick={() => selectMission(mission_name)}
                    >
                      {mission_name}
                    </button>
                    <span className="sr-only">
                      west {bbox[0]}, south {bbox[1]}, east {bbox[2]}, north {bbox[3]} degrees.
                    </span>
                  </li>
                ) : null,
              )}
            </ul>
          </details>
        </>
      )}
      {mission.isPending && <p role="status">Loading mission…</p>}
      {mission.isError && <p role="alert">Unable to open this mission. Please select a deployment to try again.</p>}
      <dialog
        ref={areaDialog}
        aria-labelledby={areaTitleId}
        className="text-imos-deep-blue m-auto max-w-[90vw] rounded-md bg-white p-5 shadow-lg backdrop:bg-black/40"
      >
        <h2 id={areaTitleId} className="text-lg font-semibold">
          Deployments in this area
        </h2>
        <ul className="my-2">
          {areaMissions.map((name) => (
            <li key={name}>
              <button
                type="button"
                className="cursor-pointer py-2 underline"
                onClick={() => {
                  areaDialog.current?.close();
                  selectMission(name);
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
        <form method="dialog">
          <button type="submit" className="cursor-pointer rounded-md border px-3 py-2">
            Close
          </button>
        </form>
      </dialog>
    </section>
  );
};
export default GlidersMap;
